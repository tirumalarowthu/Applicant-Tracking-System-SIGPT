const express = require("express")
const offerLetter = express.Router()
const fs = require("fs");
const { ExternalHyperlink, Paragraph, PatchType, TextRun, patchDocument } = require("docx");
// const cors = require("cors");

// app.use(cors());
offerLetter.use(express.urlencoded({ extended: true })); // Use URL-encoded format for form data
offerLetter.get("/annexure", async (req, res) => {
    const {
        a_total_B,
        a_cc_pf,
        a_total_A,
        a_basic,
        a_hra,
        a_sa,
        a_con,
        a_fb,
        a_YEB,
        a_PB,
        a_VarP,
        a_total_C,
        a_EmployerPF,
        a_ComPF,
        a_Medical,
        a_PT,
        a_TDS,
        a_total_CTC,
        a_GP,
        name,
        date,
        role,
        location,
        ref,
        salary,
        m_basic,
        m_hra,
        m_sa,
        m_con,
        m_total_A,
        m_fb,
        m_cc_pf,
        m_total_B,
        m_YEB,
        m_PB,
        m_VarP,
        m_total_C,
        m_EmployerPF,
        m_ComPF,
        m_Medical,
        m_PT,
        m_TDS,
        m_GP,
        m_total_CTC
    } = req.query
    const modifiedDoc = await patchDocument(fs.readFileSync("./routes/Annexure.docx"), {
        patches: {
            name: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun(`${name}`, {
                        style: {
                            fontWeight: 'bold',
                        },
                    }),
                ],
            },
            a_basic: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_basic}`)],
            },
            a_hra: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_hra}`)],
            },
            a_sa: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_sa}`)],
            },
            a_con: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_con}`)],
            },
            a_total_A: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_total_A}`)],
            },
            a_fb: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_fb}`)],
            },
            a_cc_pf: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_cc_pf}`)],
            },
            a_total_B: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_total_B}`)],
            },
            a_YEB: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_YEB}`)],
            },
            a_PB: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_PB}`)],
            },
            a_VarP: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_VarP}`)],
            },
            a_total_C: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_total_C}`)],
            },
            a_EmployerPF: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_EmployerPF}`)],
            },
            a_ComPF: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_ComPF}`)],
            },
            a_Medical: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_Medical}`)],
            },
            a_PT: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_PT}`)],
            },
            a_TDS: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_TDS}`)],
            },
            a_GP: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_GP}`)],
            },
            a_total_CTC: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${a_total_CTC}`)],
            },
            date: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(`${date}`)],
            },
            role: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(`${role}`)],
            },
            location: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(`${location}`)],
            },
            ref: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(`${ref}`)],
            },
            salary: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(`${salary}`)],
            },
            m_basic: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_basic}`)],
            },
            m_hra: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_hra}`)],
            },
            m_sa: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_sa}`)],
            },
            m_con: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_con}`)],
            },
            m_total_A: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_total_A}`)],
            },
            m_fb: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_fb}`)],
            },
            m_cc_pf: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_cc_pf}`)],
            },
            m_total_B: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_total_B}`)],
            },
            m_YEB: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_YEB}`)],
            },
            m_PB: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_PB}`)],
            },
            m_VarP: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_VarP}`)],
            },
            m_total_C: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_total_C}`)],
            },
            m_EmployerPF: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_EmployerPF}`)],
            },
            m_ComPF: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_ComPF}`)],
            },
            m_Medical: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_Medical}`)],
            },
            m_PT: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_PT}`)],
            },
            m_TDS: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_TDS}`)],
            },
            m_GP: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_GP}`)],
            },
            m_total_CTC: {
                type: PatchType.NUMBER,
                children: [new TextRun(`${m_total_CTC}`)],
            }
        },
    });

    // Save the modified document to a new file (in this example, named "output.docx")
    const outputPath = "./output.docx";
    fs.writeFileSync(outputPath, modifiedDoc);
    res.download(outputPath, "output.docx"); // Provide the filename as the second argument for the downloaded file
    console.log("File generated and saved:", outputPath);
});


module.exports = offerLetter
