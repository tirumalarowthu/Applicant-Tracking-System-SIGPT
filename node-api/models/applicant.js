const mongoose = require("mongoose")
const applicantSchema = mongoose.Schema({
    name: {
        type: String,
        trim:true,
        require: [true, "name is required"]
    },
    email: {
        type: String,
        trim:true,
        require: [true, "email is required"]
    },
    mobile: { 
        type: Number,
        trim:true,
        require: [true, "mobile number is required"]
    },  
    role: {
        type: String,
        trim:true,
        default: "MERN Stack Developer",
        require: [true, "role is required"]
    },
    collegeName: {
        type: String,
        trim:true,
        require: [true, "college name is required"]
    },
    qualification: {
        type: String,
        trim:true,
        require: [true, "qualification is required"]
    },
    branch:{
        type:String,
        trim:true,
        default:"computer science",
        require:[true,"Branch is required"]
    },
    passout: {
        type: Number,
        trim:true,
        require: [true, 'passout is required']
    },
    nextRound: {
        type: String,
        trim:true,
        // default: 'Areesh Kumar'
    },
    status: {
        type: String,
        trim:true,
        default: "HR Round" 
    },
    experience: {
        type: Number,
        trim:true,
        default:0
    },
    previousCompany: {
        type: String,
        default: "Not Applicable"
    },
    resumeLink: {
        type: String,
        trim:true,
        require: [true, "Resume link is required"]
    },
    sourceOfProfile: {
        type:String,
        trim:true,
        default:"Naukri"
    },
    sourceName:{
        type:String,
        trim:true,

    },
    comments: [{
        commentBy: String,
        comment: String,  
        cRound:String,
        Date:{
            type:Date,
            default:Date.now()
        }
    }]
},{ timestamps: true })

const Applicant = mongoose.model("Applicant", applicantSchema)
module.exports = Applicant



























