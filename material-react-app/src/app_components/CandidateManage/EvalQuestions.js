// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./FilterDashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ChangeResultModel from "./ChangeResultModel";
import CircularProgress from "@mui/material/CircularProgress";
import ScrollToggle from "./ScrollToggle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { store } from "./App";

function EvalQuestions() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [testResults, setTestResults] = useState([]);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [candidate, setCandidate] = useState({});
  const [testSubmitReason,setTestSubmitReason]  = useState("")
  const [loading, setLoading] = useState(true);
  let mcqScore = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  const getCandidateInfo = async() =>{
    await axios.get(`${process.env.REACT_APP_API_URL}/eval/candidate/${email}`)
    .then(response => {
      setCandidate(response.data.name);
      setTestSubmitReason(response.data.reason)
      setTestResults(response.data.result);
      const totalQuestions = Object.keys(response.data.info).length;
      setTotal(totalQuestions);
      const questionsWithImage = response.data.info.map(question => {
        if (question.image && question.image.data) {
           // Convert the array of numbers into a Uint8Array
           const byteArray = new Uint8Array(question.image.data.data);
        
           // Convert the Uint8Array into a binary string
           const binaryString = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
   
           // Encode the binary string to base64
           const base64String = btoa(binaryString);
   
           // Assign the base64 string to the imageURL property
           question.imageURL = `data:${question.image.contentType};base64,${base64String}`;
        }
        question.question = DOMPurify.sanitize(question.question);
        return question;
      });
      setMCQQuestions(questionsWithImage);
      setLoading(false)
      // console.log(candidate)
      setLoading(false)
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(() => {
    setLoading(true)
    getCandidateInfo()

  }, []);

  async function updateCandidateResult(result, email) {
    console.log(result, email);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/updateTestResult/${email.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result,
            mcqScore,
          }),
        }
      );
      console.log(response);
      const data = await response.json();

      if (!response.status === 200) {
        toast.warn(data.message || "Failed to update candidate result.", {
          style: {
            fontSize: "18px",
          },
        });
      } else {
        console.log(data)
        toast.success(`${email.email}'s result has been updated to "${result}" successfully.`, {
          style: {
            fontSize: "16px",
          },
          autoClose:5000,
          onClose: () => {
            window.location.reload();
          },
        });
      }

      // return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  ///// Update the test result to Applicant Tracking System
  const generateResultColor = (final_result) => {
    if (final_result === "Pass") {
      return "success";
    } else if (final_result === "Fail") {
      return "error";
    } else {
      return "warning";
    }
  };
console.log(testSubmitReason)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {loading ? (
          <MDBox align="center" variant="h6" mb={2} ml={4} mt={3}>
            <CircularProgress color="black" size={30} mt={3} />
          </MDBox>
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <MDTypography variant="h6" color="white">
                    Test Evaluation
                  </MDTypography>
                </MDBox>
                {
                  testSubmitReason !== "" && <MDBox>
                  <MDTypography variant="h6" style={{color:"red",textAlign:'center',marginTop:"20px"}}> {testSubmitReason}</MDTypography>
                </MDBox>
                }
                
                <MDBox pt={3} pl={4}>
                  <ol
                    style={{
                      paddingLeft: "30px",
                      marginTop: "10px",
                      fontSize: "16px",
                    }}
                  >
                    {mcqQuestions.map((question, index) => {
                      const selectedAnswer = question.candidateAnswer;
                      const isCorrect =
                        selectedAnswer === question.correct_choice;
                      const notAnswered = question.candidateAnswer;
                      // console.log(notAnswered, 'from selected ans')
                      if (isCorrect) {
                        mcqScore++;
                        correctAnswers++;
                      } else {
                        wrongAnswers++;
                      }
                      return (
                        // <li key={question._id} style={{ marginBottom: "30px" }}>
                        <MDBox>
                          
                          <MDBox className="card-body">
                            <MDTypography variant="h6" fontWeight="medium" mt={1} mb={1} style={{whiteSpace: "pre-wrap"}}>
                              {index + 1}.  
                              {question.question.split('\n').map((line, index) => (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            ))}
                            </MDTypography>

                            {question.imageURL && (
                              <MDBox className="card-body">
                                <img src={question.imageURL} alt="Question Image" style={{ width: '50%' }} />
                              </MDBox>
                            )}
                            <MDTypography
                              variant="h6"
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20pxx",
                              }}
                            >
                              Correct answer: {question.correct_choice}
                            </MDTypography>
                            <RadioGroup
                              name={question._id}
                              value={question.candidateAnswer}
                              defaultValue={question.candidateAnswer}
                              // onChange={(e) => handleRadioChange(e, question._id)}
                            >
                              <FormControlLabel
                                disabled
                                value={1}
                                control={<Radio />}
                                label={
                                  <MDTypography
                                    variant="body2"
                                    sx={{ fontSize: "14px", color: "text" }}
                                  >
                                    {question.choice1}
                                  </MDTypography>
                                }
                              />
                              <FormControlLabel
                                disabled
                                value={2}
                                control={<Radio />}
                                label={
                                  <MDTypography
                                    variant="body2"
                                    sx={{ fontSize: "14px", color: "text" }}
                                  >
                                    {question.choice2}
                                  </MDTypography>
                                }
                              />
                              <FormControlLabel
                                disabled
                                value={3}
                                control={<Radio />}
                                label={
                                  <MDTypography
                                    variant="body2"
                                    sx={{ fontSize: "14px", color: "text" }}
                                  >
                                    {question.choice3}
                                  </MDTypography>
                                }
                              />
                              <FormControlLabel
                                disabled
                                value={4}
                                control={<Radio />}
                                label={
                                  <MDTypography
                                    variant="body2"
                                    sx={{ fontSize: "14px", color: "text" }}
                                  >
                                    {question.choice4}
                                  </MDTypography>
                                }
                              />
                            </RadioGroup>

                            <MDBox
                              id={`symbol-${question._id}`}
                              className="symbol"
                            >
                              {notAnswered !== "" ? (
                                isCorrect ? (
                                  <MDTypography
                                    style={{
                                      color: "#28a745",
                                      fontWeight: "bold",
                                      marginRight: "5px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    &#10004; Correct
                                  </MDTypography>
                                ) : (
                                  <MDTypography
                                    style={{
                                      color: "#dc3545",
                                      fontWeight: "bold",
                                      marginRight: "5px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    &#10008; Wrong
                                  </MDTypography>
                                )
                              ) : (
                                <MDTypography
                                  style={{
                                    color: "#e08e36",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    fontSize: "15px",
                                  }}
                                >
                                  &#8709; Not Answered
                                </MDTypography>
                              )}
                            </MDBox>
                          </MDBox>
                        </MDBox>
                        // </li>
                      );
                    })}
                    <MDBox
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "30px",
                      }}
                    >
                      <MDTypography>
                        Correct Answers: {correctAnswers}
                      </MDTypography>
                      <MDTypography>Wrong Answers: {wrongAnswers}</MDTypography>
                      <MDTypography>
                        Score: {mcqScore} / {total}
                      </MDTypography>
                    </MDBox>
                  </ol>
                  <center>
                    <Divider />

                    {/* working */}
                    <MDBox>
                      {testResults === "" ? (
                        <MDBox>
                          <MDTypography variant="h5">
                            Evaluate the candidate :
                          </MDTypography>
                          <MDButton
                            variant="contained"
                            style={{
                              marginRight: "10px",
                              marginTop: "30px",
                              marginBottom: "30px",
                              marginTop: "10px",
                            }}
                            color="success"
                            onClick={() => {
                              updateCandidateResult("Pass", { email });
                            }}
                          >
                            Pass
                          </MDButton>
                          <MDButton
                            variant="contained"
                            style={{
                              marginRight: "10px",
                              marginTop: "30px",
                              marginBottom: "30px",
                              marginTop: "10px",
                            }}
                            color="warning"
                            onClick={() => {
                              updateCandidateResult("On Hold", { email });
                            }}
                          >
                            On Hold
                          </MDButton>
                          <MDButton
                            variant="contained"
                            style={{
                              marginRight: "10px",
                              marginTop: "30px",
                              marginBottom: "30px",
                              marginTop: "10px",
                            }}
                            color="error"
                            onClick={() => {
                              updateCandidateResult("Fail", { email });
                            }}
                          >
                            Fail
                          </MDButton>
                        </MDBox>
                      ) : (
                        <MDBox style={{ marginBottom: "20px" }}>
                          {/* <MDTypography variant="h5" sx={{ marginBottom:'10px'}}>Result of the Candidate : </MDTypography> */}
                          <MDButton
                            variant="contained"
                            color={generateResultColor(testResults)}
                          >
                            Result of the Candidate : {testResults}
                          </MDButton>
                          <ChangeResultModel result={testResults} />
                        </MDBox>
                      )}
                    </MDBox>
                  </center>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        )}
        <ScrollToggle />
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default EvalQuestions

 {/* <MDBox sx={{
                    display:'flex',
                    justifyContent:"space-between"
                  }}>
                    <MDButton onClick= {()=>{
                      navigate(-1)
                    }} variant='gradient' color='info'>
                    <ArrowBackIcon style={{marginLeft:"-10px"}}/> Back
                    </MDButton>
                    <MDTypography
                      variant="h5"
                      sx={{ marginRight: "20px" }}
                      textAlign="start"
                    >
                      Candidate: {email}
                    </MDTypography>
                  </MDBox> */}
// if (testResults.length > 0) {
    //   setLoading(true)
    //   const selectedAnswersIds = testResults.flatMap(result =>
    //     Object.keys(result.selectedAnswers)
    //   );
    //   axios
    //     .get(`${process.env.REACT_APP_API_URL}/getMCQQuestions`, {
    //       params: {
    //         ids: selectedAnswersIds.join(",")
    //       }
    //     })
    //     .then(response => {
    //       const questionsWithImage = response.data.map(question => {
    //         if (question.image && question.image.data) {
    //           const base64Image = question.image.data;
    //           question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
    //         }
    //         question.question = DOMPurify.sanitize(question.question);
    //         return question;
    //       });
    //       setMCQQuestions(questionsWithImage);
    //       setLoading(false)
    //     })
    //     .catch((error) => {
    //       toast.warn("Something went wrong ,please try after sometime.", 
    //       {
    //         style: {
    //           fontSize: '18px', 
    //         },
    //       })
    //       navigate('/Candidate-List')
    //       console.error(error, "eval")
    //     });
    // }