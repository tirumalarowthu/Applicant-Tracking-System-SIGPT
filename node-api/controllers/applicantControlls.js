const asyncHandler = require("express-async-handler")
const Applicant = require("../models/applicant")
const moment = require('moment-timezone');
const Admin = require("../models/admin");
// const findHr = async () => {
//     const data = await Admin.find({ role: "HR" }, { name: 1, _id: 0 })
//     const hrname = data[0].name
//     console.log(hrname)
// }
// findHr()

/*************add applicant  **************/
const addApplicant = asyncHandler(async (req, res) => {
    try {
        const { name, email, mobile, role, area, status, qualification, passout, collegeName, resumeLink } = req.body;

        // Check if all required fields are present
        const requiredFields = ['name', 'email', 'mobile', 'role', 'collegeName', 'qualification', 'passout', 'resumeLink'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            const errorMessage = `Missing fields: ${missingFields.join(', ')}`;
            return res.status(400).json({ error: errorMessage });
        }

        // Check if applicant already exists
        const applicantExists = await Applicant.findOne({ email });
        if (applicantExists) {
            return res.status(400).json({ email: 'Applicant email already exists. Please enter a new email for new applicant.' });
        }
        //find the name of the HR
        const hrName = await Admin.find({ role: "HR" }, { name: 1, _id: 0 })
        // Create new applicant
        const newApplicant = await Applicant.create({...req.body,nextRound:hrName[0].name});
        res.status(201).json(newApplicant);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Unable to create applicant. Please try again later.' });
    }
})

// const addApplicant = asyncHandler(async (req, res) => {
//     const { name, email, mobile, role, status, qualification, passout, collegeName, resumeLink } = req.body

//     if (!name, !email, !mobile, !role, !status, !collegeName, !qualification, !passout, !resumeLink) {
//         throw new Error("All feilds are required")
//     }

//     try {
//         const applicantExits = await Applicant.findOne({ email })
//         if (applicantExits) {
//             throw new Error("Applicant already Exits/please Enter new applicant")
//         }
//         const newApplicant = await Applicant.create(req.body)
//         if (newApplicant) {
//             res.json(newApplicant)
//         } else {
//             throw new Error("Unable to Create applicant! please try after some time")
//         }
//     }
//     catch (err) {
//         console.log(err.message)
//         res.send(err.message)
//     }

// })


//Get the all Applicant details
const ApplicantList = asyncHandler(async (req, res) => {
    try {
        console.log(req.params)
        const allApplicants = req.params.status !=='all' ? await Applicant.find({status:req.params.status}).sort({ updatedAt: -1 }) : await Applicant.find({}).sort({ updatedAt: -1 })
        if (allApplicants.length > 0) {
            res.status(200).json(allApplicants)
        } else {
            res.status(404).send(allApplicants)
        }
    }
    catch (err) {
        console.log(err.message)
    }

})

// get count by status : 
const ApplicantsInfoByStatus = asyncHandler(async (req, res) => {
    try {
        const data = await Applicant.aggregate([
            {
                $facet: {
                    testStatusCounts: [
                        { $group: { _id: "$status", count: { $sum: 1 } } },
                        {
                            $group: {
                                _id: null,
                                data: { $push: { k: "$_id", v: "$count" } },
                            },
                        },
                    ],
                    isApprovedCounts: [
                        { $group: { _id: "$isApproved", count: { $sum: 1 } } },
                        {
                            $group: {
                                _id: null,
                                data: {
                                    $push: {
                                        k: {
                                            $cond: {
                                                if: { $eq: ["$_id", true] },
                                                then: "isApproved",
                                                else: "isNotApproved",
                                            },
                                        },
                                        v: "$count",
                                    },
                                },
                            },
                        },
                    ],
                    totalCount: [{ $count: "total" }],
                },
            },
            {
                $project: {
                    testStatusCounts: {
                        $arrayToObject: {
                            $ifNull: [{ $arrayElemAt: ["$testStatusCounts.data", 0] }, []],
                        },
                    },
                    isApprovedCounts: {
                        $arrayToObject: {
                            $ifNull: [{ $arrayElemAt: ["$isApprovedCounts.data", 0] }, []],
                        },
                    },
                    totalCount: { $arrayElemAt: ["$totalCount.total", 0] },
                },
            },
        ]);
        console.log(data,"data")

        // Extract the counts and format the response
        const formattedData = {
            ...data[0].testStatusCounts,
            ...data[0].isApprovedCounts,
            totalCount: data[0].totalCount,
        };

        // Send the response
        res.json(formattedData);
    }
    catch (err) {
        res.status(500).json({msg:err.message})
        console.log(err.message)
    }
})





//Get the one Applicant details
const SingleApplicant = asyncHandler(async (req, res) => {
    const oneApplicant = await Applicant.findOne({ email: req.params.email })
    if (!oneApplicant) {
        res.status(404).send("Applicant not found.")
    } else {
        res.json(oneApplicant)
    }
}
)

//Get the Single Applicant details through id
const ApplicantById = asyncHandler(async (req, res) => {
    try {
        const applicantExits = await Applicant.findById(req.params._id)
        if (!applicantExits) {
            res.status(404).send("Applicant not found")
        } else {
            res.status(200).send(applicantExits)
            // console.log(applicantExits)
        }
    } catch (err) {
        console.log(err.message)
    }

})
//update the applicant like next round,comments,status
const ApplicantNextProcess = asyncHandler(async (req, res) => {
    const { email, comment, commentBy, cRound, nextRound, status } = req.body
    console.log(req.body,"comments.....")
    if (email !== "" && comment !== "" && commentBy !== "" && cRound !== "" && nextRound !== "" && status !== "") {
        const updatedApplicant = await Applicant.findOneAndUpdate({ email: email }, {
            nextRound: nextRound,
            status: status,
            $push: {
                "comments": {
                    comment: comment,
                    commentBy: commentBy,
                    cRound: cRound,
                    Date: moment().tz('Asia/Kolkata')
                }
            }
        }, { new: true })
        if (updatedApplicant) {
            res.send(updatedApplicant)
        } else {
            res.status(404).send("Unable to update the applicant")
        }
    } else {
        res.status(404).send("All feilds are required")
    }
})


///update only comments 
const updateComment = asyncHandler(async (req, res) => {
    const { id, commentId, comment } = req.body
    const updatedData = await Applicant.updateOne(
        { _id: id, 'comments._id': commentId },
        { $set: { 'comments.$.comment': comment } },
        {
            new: true
        }
    )
    if (updatedData) {
        res.send(updatedData)
    } else {
        res.send("Applicant not found")
        console.log("req not completed")
    }

})
////Email search
const emailSearch = async (req, res) => {
    const data = await Applicant.find({ email: /gmail.com/ })
    const modified = data.map((item) => item.email)
    console.log(req.query.email, "params")

    if (!req.query.email) {
        console.log("first")
        res.send(modified)
    } else {
        const filter = modified.filter((item) => {
            return item.includes(req.query.email)
        })
        res.send(filter)
    }
}

///Delete applicant 
const deteleApplicant = asyncHandler(async (req, res) => {
    const Deleted = await Applicant.findByIdAndDelete(req.params._id)
    if (Deleted) {
        res.send(Deleted)
    }

})





module.exports = { addApplicant, ApplicantsInfoByStatus, ApplicantList, SingleApplicant, ApplicantById, ApplicantNextProcess, updateComment, emailSearch, deteleApplicant }