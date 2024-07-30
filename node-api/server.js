const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDB = require("./config/db")
const adminRoutes = require("./routes/adminRoutes")
const applicantRoutes = require("./routes/applicantRoutes")
const sendMails = require("./controllers/sendMails")
const path = require("path")
const offerLetter = require("./routes/offerLetter")
app.use(express.json())

app.use(cors())   



///for admin 
app.use("/", adminRoutes)
//for applicants
app.use("/", applicantRoutes)
//for emails
app.use("/", sendMails)
app.use("/api/check",(req,res)=>{
    res.send('This is called continuous deployment and continuous integration')
})
//for generate offer letter 
app.use("/",offerLetter)

//Frontend Integration    
const _dirname = path.dirname("")
const builPath = path.join(_dirname, "../client/build");
// app.use(express.static(builPath))
app.use(express.static(path.join(builPath)));
app.get("/*", function (req, res) {
    res.sendFile('index.html',
        { root: path.join(_dirname, "../client/build") },
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
})
// app.get("/", (req, res) => {
//     res.send("Hi,Your Server Running Successfully.")
// })



connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Running at Port ${process.env.PORT}`)
}) 