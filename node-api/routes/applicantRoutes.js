const express = require("express")
const { addApplicant, ApplicantList, SingleApplicant, ApplicantsInfoByStatus, ApplicantNextProcess, updateComment, emailSearch, deteleApplicant, ApplicantById, } = require("../controllers/applicantControlls")
const Applicant = require("../models/applicant")
const applicantRoutes = express.Router()



applicantRoutes.post("/applicant/add", addApplicant)

//Getting all the applicants list 
 
applicantRoutes.put("/appicant/update/comments", ApplicantNextProcess)
applicantRoutes.get("/allApplicants/:status", ApplicantList)
applicantRoutes.get("/singleApplicant/:email", SingleApplicant)
applicantRoutes.get("/applicants/info", ApplicantsInfoByStatus)
applicantRoutes.get("/applicant/id/:_id", ApplicantById)
applicantRoutes.patch("/comment", updateComment)
applicantRoutes.get("/search", emailSearch)
applicantRoutes.delete("/applicant/delete/:_id", deteleApplicant)

//getting all applicants
applicantRoutes.get("/api/applicants", async (req, res) => {
    const results = req.query.results || 10
    const start = req.query.start || 0
    const users = await Applicant.find({})
        .skip(parseInt(start))
        .limit(parseInt(results))
    if (users.length > 0) {
        res.json(users)
    } else {
        res.send("Applicants not found..please refresh page")
    }
})
///Search applicants 
applicantRoutes.get("/api", async (req, res) => {
    const users = await Applicant.find({})
    const searchTerm = req.query.search
    if (!searchTerm) {
        res.send(users)
    } else {
        const searchResults = await users.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        if (searchResults.length > 0) {
            res.send(searchResults)
        } else {
            res.send("Search Results are empty")
        }

    }

})

module.exports = applicantRoutes