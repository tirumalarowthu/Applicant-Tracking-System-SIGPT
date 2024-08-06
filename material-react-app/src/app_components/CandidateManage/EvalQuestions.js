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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const [appData, setAppData] = useState({});
  const navigator = useNavigate();
  const { email } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/singleApplicant/${email}`)
      .then((res) => {
        console.log(res.data);
        setAppData(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [email]);
  ///delete Applicant
  const deleteApplicant = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/applicant/delete/${appData._id}`)
      .then((res) => {
        alert(`Applicant ${appData.name} deleted successfully`);
        navigator("/");
        dispatch(fetchApplicants());
      })
      .catch((err) =>
        alert("Unable to delete applicant.Please try after some time.")
      );
  };
  const cellStyle = {
    flex: 1,
    padding: "8px",
    textAlign: "left",
    border: "1px solid #ddd",
  };

  const headerStyle = {
    backgroundColor: "#0288d1",
    color: "white",
    padding: "8px",
    textAlign: "left",
    flex: 1,
    border: "1px solid #ddd",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {Object.keys(appData).length > 0 && (
        <Card className="mb-4 container">
          <MDBox p={3}>
            <MDTypography variant="h4" align="center">
              Full details of the Applicant
            </MDTypography>
            <Divider />
            <MDBox mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">
                      Name of the Applicant
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.name}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Email</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.email}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Mobile Number</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.mobile}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Applied Role</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.role}
                    </MDTypography>
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">
                      Area for Online Assessment Test
                    </MDTypography>
                    <MDTypography variant="body1" readOnly>
                      {appData.area}
                    </MDTypography>
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">College Name</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.collegeName}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Qualification</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.qualification}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Branch</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.branch}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Passout Year</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.passout}
                    </MDTypography>
                  </MDBox>
                </Grid>
                {appData.experience > 0 && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <MDBox>
                        <MDTypography variant="h6">
                          Previous Company Name
                        </MDTypography>
                        <MDTypography
                          variant="caption"
                          style={{ fontSize: "16px" }}
                          readOnly
                        >
                          {appData.previousCompany}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDBox>
                        <MDTypography variant="h6">
                          Experience in Years
                        </MDTypography>
                        <MDTypography
                          variant="caption"
                          style={{ fontSize: "16px" }}
                          readOnly
                        >
                          {appData.experience}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Next Round Owner</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.nextRound}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">
                      Status of the applicant
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.status}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">
                      Source of Applicant
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.sourceOfProfile}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">
                      Source Name
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {appData.sourceName}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Applied Date</MDTypography>
                    <MDTypography
                      variant="caption"
                      style={{ fontSize: "16px" }}
                      readOnly
                    >
                      {new Date(appData.createdAt).toString().substring(0, 25)}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox>
                    <MDTypography variant="h6">Resume Link</MDTypography>
                    <MDButton
                      variant="outlined"
                      color="primary"
                      onClick={() => window.open(appData.resumeLink)}
                    >
                      Open Resume
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            {appData.comments.length > 0 && (
              <MDBox mt={3}>
                {/* <Card> */}
                  <MDBox >
                    <MDTypography
                      variant="h4"
                      align="center"
                      className="bg-info text-white"
                      pb={2}
                    >
                      Comments
                    </MDTypography>
                    {/* <MDBox mt={2}> */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Paper>
                          <MDBox display="flex" flexDirection="column">
                            <MDBox display="flex" bgcolor="#0288d1">
                              <MDTypography
                                style={{
                                  ...headerStyle,
                                  flexGrow: 1,
                                  fontSize: "16px",
                                }}
                              >
                                S.No
                              </MDTypography>
                              <MDTypography
                                style={{
                                  ...headerStyle,
                                  flexGrow: 2,
                                  fontSize: "16px",
                                }}
                              >
                                Round
                              </MDTypography>
                              <MDTypography
                                style={{
                                  ...headerStyle,
                                  flexGrow: 2,
                                  fontSize: "16px",
                                }}
                              >
                                Updated By
                              </MDTypography>
                              <MDTypography
                                style={{
                                  ...headerStyle,
                                  flexGrow: 3,
                                  fontSize: "16px",
                                }}
                              >
                                Updated At
                              </MDTypography>
                              <MDTypography
                                style={{
                                  ...headerStyle,
                                  flexGrow: 4,
                                  fontSize: "16px",
                                }}
                              >
                                Comments
                              </MDTypography>
                            </MDBox>
                            {appData.comments.map((item, index) => (
                              <MDBox
                                display="flex"
                                key={index}
                                bgcolor={index % 2 === 0 ? "#f9f9f9" : "white"}
                              >
                                <MDTypography
                                  variant="caption"
                                  style={{
                                    ...cellStyle,
                                    flexGrow: 1,
                                    fontSize: "14px",
                                  }}
                                >
                                  {index + 1}
                                </MDTypography>
                                <MDTypography
                                  variant="caption"
                                  style={{
                                    ...cellStyle,
                                    flexGrow: 2,
                                    fontSize: "14px",
                                  }}
                                >
                                  {item.cRound}
                                </MDTypography>
                                <MDTypography
                                  variant="caption"
                                  style={{
                                    ...cellStyle,
                                    flexGrow: 2,
                                    fontSize: "14px",
                                  }}
                                >
                                  {item.commentBy}
                                </MDTypography>
                                <MDTypography
                                  variant="caption"
                                  style={{
                                    ...cellStyle,
                                    flexGrow: 3,
                                    fontSize: "14px",
                                  }}
                                >
                                  {new Date(item.Date).toLocaleString()}
                                </MDTypography>
                                <MDTypography
                                  variant="caption"
                                  style={{
                                    ...cellStyle,
                                    flexGrow: 4,
                                    fontSize: "14px",
                                  }}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.comment,
                                    }}
                                  />
                                </MDTypography>
                              </MDBox>
                            ))}
                          </MDBox>
                        </Paper>
                      </Grid>
                    </Grid>
                    {/* </MDBox> */}
                  </MDBox>
                {/* </Card> */}
              </MDBox>
            )}
          </MDBox>
          <MDBox
            className="container mb-2"
            display="flex"
            justifyContent="space-between"
          >
            {/* <RouterLink to="/ChangeApplicantStatus" onClick={() => dispatch(GetApplicant(appData))}> */}
            {/* <MDButton variant="contained" color="primary">Change Applicant Status</MDButton> */}
            {/* </RouterLink> */}
            {/* <DeleteModel deleteApplicant={deleteApplicant} name={appData.name} email={appData.email} /> */}
          </MDBox>
        </Card>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default EvalQuestions;

{
  /* <MDBox sx={{
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
                  </MDBox> */
}
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
