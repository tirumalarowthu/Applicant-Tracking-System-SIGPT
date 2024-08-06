import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  MDBoxider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { candidate_areas } from "./CandidateAreas";

// import { MenuItem, Select } from '@material-ui/core';

// Authentication layout components
import BasicLayoutEditForm from "app_components/CandidateManage/DashboardNav";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import axios from "axios";
import { Cabin } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { ANNEXURE_FORM_URL } from "../../baseUl";

function EditCandidateForm() {
  const authContext = useContext(AuthContext);
  const { email } = useParams();
  // const [candidateList, setCandidateList] = useState([]);
  // const [candidateItem, setCandidateItem] = useState({})
  const [inputs, setInputs] = useState({});
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/singleApplicant/${email}`
        );
        // console.log('Response:', response.data);
        setApplicantdetails(response.data);
        setInputs(response.data);
        setLoading(false);
        // setCandidateList(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchData();
  }, []);

  const changeDoneBy = JSON.parse(localStorage.getItem("eval_info")).name;
  const role = JSON.parse(localStorage.getItem("eval_info")).role;
  const statusOpt =
    role === "Hiring Manager"
      ? [
          "HR Round",
          "Hiring Manager",
          "Online Assessment Test",
          "Technical Round",
          "Rejected",
          "On hold",
          "Selected",
        ]
      : role === "HR"
      ? [
          "HR Round",
          "Hiring Manager",
          ,
          "Online Assessment Test",
          "Rejected",
          "On hold",
          "Selected",
        ]
      : ["HR Round", "Hiring Manager", "Technical Round"];
  const owners = ["Veera(HM)", "Areesh(HR)"];
  const navigate = useNavigate();
  // const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch()
  const [applicantdetails, setApplicantdetails] = useState({});
  const [postData, setPostData] = useState({
    email: applicantdetails.email,
    commentBy: changeDoneBy,
    comment: "",
    status: applicantdetails.status,
    cRound: applicantdetails.status,
    nextRound: "",
  });
  // console.log(applicantdetails)
  const handleUpdateApplicantStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    validForm();
    postData.email = applicantdetails.email;
    postData.cRound = applicantdetails.status;
    console.log(postData, "post data");
    if (validForm() === true) {
      const config = { headers: { "Content-Type": "Application/json" } };
      try {
        if (postData.status === "Selected") {
          postData.comment =
            postData.comment +
            ` .To proceed with offer letter : <a target="_blank" href="${ANNEXURE_FORM_URL}">Click Here</a>`;
          postData.cRound = postData.status;
          await axios.put(
            `${process.env.REACT_APP_API_URL}/appicant/update/comments`,
            postData,
            config
          );
        } else {
          console.log(postData, "data");
          await axios.put(
            `${process.env.REACT_APP_API_URL}/appicant/update/comments`,
            postData,
            config
          );
        }
        try {
          toast.success(
            `${applicantdetails.name} status updated successfully`,
            {
              autoClose: 3000,
            }
          );
          // dispatch(fetchApplicants())
          await axios.post(
            `${process.env.REACT_APP_API_URL}/change/${postData.commentBy}/${postData.nextRound}/${applicantdetails.name}`
          );
          // // alert(`Email send to ${postData.nextRound} successfully`)
          // if (postData.status === "Online Assessment Test") {
          //   try {

          //     //Register for online test in Test evaluation system
          //     await axios.post(`${TES_URL}/register`,
          //       {
          //         name: applicantdetails.name,
          //         email: applicantdetails.email,
          //         area: applicantdetails.area,
          //         atsId: applicantdetails._id

          //       })
          //       .then((res) => console.log(res))
          //       .catch(err => console.log(err.message))
          //     //Send mail to the applicant for online
          //     await axios.post(`${process.env.REACT_APP_API_URL}/send/${applicantdetails.name}/${applicantdetails.email}`)
          //     alert(`Online Assessment Test link sent to ${applicantdetails.name} successfully.`)
          //   }
          //   catch (err) {
          //     alert(`Failed to send test link to ${applicantdetails.name}.`)
          //     console.log(err.message)
          //   }
          // }

          navigate(-1);
        } catch (err) {
          alert("Failed to send email.");
          navigate("/");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        alert("Unable to change applicant status now!Try after some time.");
      }
    }
    // else {
    //     toast.error("Please provide all the inputs!")
    // }
    setLoading(false);
  };
  //Handling input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  //validations for the form
  const validForm = () => {
    let isValid = true;
    let errors = {};

    if (postData.status === applicantdetails.status ) {
      errors["status"] = "Please check the status Current status and New status are same.";
      isValid = false;
    } 
    if ( !postData.status) {
      errors["status"] = "Please update the status of the applicant.";
      isValid = false;
    }

    if (!postData.comment) {
      errors["comment"] = "Please write comments for the applicant.";
      isValid = false;
    }

    if (!postData.commentBy) {
      errors["commentBy"] = "Please choose the person who commented.";
      isValid = false;
    }

    if (!postData.nextRound) {
      errors["nextRound"] = "Please choose the next round owner.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  ///To hide the errors .
  const hideErrors = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // useEffect(() => {
  //     const candidate = candidateList.find(candidate => candidate._id === _id);
  //     if (candidate) {
  //         setInputs(candidate);
  //         // console.log(candidate);/*-
  //     }
  // }, [candidateList, _id]);

  const handleEditModalClose = () => {
    // Redirect to a new page
    navigate(-1);
  };

  // const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
  //   const [rememberMe, setRememberMe] = useState(false);

  //   const [inputs, setInputs] = useState({
  //     // email: "tes@gmail.com",
  //     // password: "tes@123",
  //   });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // const addUserHandler = (newUser) => setUser(newUser);

  //   const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    // console.log(inputs)
  };
  const handleEditForm = async (event) => {
    console.log(inputs);
    event.preventDefault();
    if (inputs.result === "On Hold") {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/updateTestResult/${inputs.email}`,
          { result: result }
        );
      } catch (err) {
        console.log(err.message);
        alert("Failed to update the result. Please update the result again");
      }
    }
    try {
      console.log(inputs._id, "input");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/edit/${inputs._id}`,
        inputs
      );
      toast.success(`Candidate edited successfully.`, {
        style: {
          fontSize: "16px",
        },
      });
      navigate(-1);
      // navigate('/Candidate-List');
    } catch (error) {
      console.log(error);
    }
  };
  const handleAreaCheckBox = (area, time) => {
    // Check if the selected area is already in the inputs.area array
    const areaIndex = inputs.area.indexOf(area);
    // Calculate total time for selected areas
    let totalSelectedTime = 0;
    inputs.area.forEach((selectedArea) => {
      const selectedAreaIndex = candidate_areas.findIndex(
        (item) => item.area === selectedArea
      );
      if (selectedAreaIndex !== -1) {
        totalSelectedTime += candidate_areas[selectedAreaIndex].time;
      }
    });

    // If the selected area is not in the inputs.area array, and there are less than 2 areas selected, add it
    if (areaIndex === -1 && inputs.area.length < 2) {
      setInputs({
        ...inputs,
        area: [...inputs.area, area],
        timeLeft: inputs.timeLeft + time,
      });
    }
    // If the selected area is already in the inputs.area array, remove it
    else if (areaIndex !== -1) {
      const updatedAreas = [...inputs.area];
      updatedAreas.splice(areaIndex, 1);
      setInputs({
        ...inputs,
        area: updatedAreas,
        timeLeft: inputs.timeLeft - time,
      });
    }
    // If the maximum number of areas is reached, show an alert
    else {
      alert("Select up to 2 areas only for the Online Assessment.");
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBoxider/> */}
      {loading ? (
        <MDBox align="center" variant="h6" mb={2} ml={4} mt={3}>
          <CircularProgress color="black" size={30} mt={3} />
        </MDBox>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ marginTop: "30px" }}>
            <Card style={{ width: "60%", margin: "0px auto" }}>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Change Status of the Candidate
                </MDTypography>
              </MDBox>
              <MDBox pt={1} pb={3} px={3}>
                <MDBox
                  component="form"
                  role="form"
                  method="POST"
                  onSubmit={handleUpdateApplicantStatus}
                >
                  <MDBox
                    mb={1}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <MDTypography
                      component="label"
                      variant="h6"
                      color=""
                      htmlFor="nameInput"
                    >
                      Name
                    </MDTypography>
                    <MDInput
                      type="text"
                      fullWidth
                      value={applicantdetails.name}
                      id="nameInput"
                      name="name"
                      onChange={changeHandler}
                      error={errors.emailError}
                    />
                  </MDBox>

                  <MDBox
                    mb={2}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <MDTypography
                      component="label"
                      variant="h6"
                      color=""
                      htmlFor="nameInput"
                    >
                      Email
                    </MDTypography>
                    <MDInput
                      type="email"
                      label=""
                      fullWidth
                      value={applicantdetails.email}
                      name="email"
                      onChange={changeHandler}
                      error={errors.emailError}
                      disabled={
                        inputs.testStatus === "Evaluated" ||
                        inputs.testStatus === "Test Taken"
                      }
                    />
                  </MDBox>
                  {/* <FormControl sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", }}>
                    <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                      Test Status
                    </MDTypography>
                    <Select
                      style={{ width: '100%', height: '40px', textAlign: "start" }}
                      label=""
                      labelId="test-status-label"
                      id="test-status-select"
                      value={inputs.testStatus || "Select Status"}
                      onChange={(event) => {
                        setInputs({
                          ...inputs,
                          testStatus: event.target.value,
                        });
                      }}
                      disabled={inputs.testStatus === "Test Taken" || inputs.testStatus === "Evaluated"}
                      IconComponent={() => <ArrowDropDownIcon style={{ marginRight: '10px' }} />}
                    >
                      {/* <MenuItem value="">Select Status</MenuItem> */}
                  {/* {inputs.testStatus === "Test Not Taken" ? (
                        <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                      ) : null}
                      {inputs.testStatus === "Test Cancelled" ? (
                        <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
                      ) : null}
                      {inputs.testStatus === "Evaluated" ? (
                        <MenuItem value="Evaluated"> Evaluated</MenuItem>
                      ) : null}
                      {inputs.testStatus === "Test Taken" ? (
                        <MenuItem value="Test Taken"> Test Taken</MenuItem>
                      ) : null}
                      {inputs.testStatus && inputs.testStatus !== "Test Taken" && inputs.testStatus !== "Evaluated" ? (
                        <MenuItem value={inputs.testStatus}>{inputs.testStatus}</MenuItem>
                      ) : null}
                    </Select>
                  </FormControl> */}

                  {/* <MDBox>
                    <MDTypography >Selected areas for the Online Assessment </MDTypography>
                    <MDBox style={{display:'flex',flexWrap:"wrap"}}>
                      {/* {candidate_areas.map((item) => (
                        <FormControlLabel
                          style={{width:"48%"}}
                          key={item.areaOption}
                          control={
                            <Checkbox
                              checked={inputs.area.includes(item.area)}
                              onChange={() => 
                                (inputs.testStatus === "Test Not Taken" ) &&  handleAreaCheckBox(item.area, item.time)
                              }
                            />
                          }
                          label={<span style={{ fontSize:"12px",fontWeight:"400" }}>{item.areaOption}</span>}
                        />
                      ))} */}
                  {/* </MDBox> */}
                  {/* </MDBox> */}

                  <MDBox>
                    {/* <form className='border border-2 p-2 rounded bg-light' onSubmit={handleUpdateApplicantStatus}> */}
                    <MDBox
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography
                        component="label"
                        variant="h6"
                        color=""
                        htmlFor="nameInput"
                      >
                        Change Done By:
                      </MDTypography>
                      <MDInput
                        className="form-control"
                        fullWidth
                        name="commentBy"
                        readOnly
                        onChange={handleInputChange}
                        value={changeDoneBy}
                        onFocus={hideErrors}
                        type="text"
                      />
                      {errors.commentBy ? (
                        <p className="text-danger">{errors.commentBy}</p>
                      ) : null}
                    </MDBox>
                    <MDBox
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography
                        component="label"
                        variant="h6"
                        color=""
                        htmlFor="nameInput"
                      >
                        Current Status:
                      </MDTypography>
                      <MDInput
                        className="form-control"
                        fullWidth
                        name="cRound"
                        value={applicantdetails.status}
                        readOnly
                        onChange={handleInputChange}
                        type="text"
                      />
                    </MDBox>
                    <MDBox
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography
                        component="label"
                        variant="h6"
                        htmlFor="statusInput"
                      >
                        New Status:
                      </MDTypography>
                      <Select
                        style={{
                          width: "100%",
                          height: "40px",
                          textAlign: "start",
                        }}
                        labelId="status-label"
                        id="status-select"
                        value={postData.status || ""}
                        onChange={handleInputChange}
                        name="status"
                        IconComponent={() => (
                          <ArrowDropDownIcon style={{ marginRight: "10px" }} />
                        )}
                      >
                        <MenuItem value="">Select Status</MenuItem>
                        {statusOpt &&
                          statusOpt.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.status && (
    <p style={{ color: 'red', fontSize: '14px' }}>{errors.status}</p>
  )}
                    </MDBox>

                    {/* // For online Assessment test code:  */}
                    {/* {
                      postData && postData?.status === "Online Assessment Test" && 
                        <MDBox>
                          <MDTypography style={{ textAlign: 'start', fontSize: "14px" }} >Select areas for the Online Assessment </MDTypography>
                          <MDBox style={{ textAlign: 'start', display: "flex", justifyContent: "space-between", flexWrap: "wrap" }} >
                            {candidate_areas.map((item) => (
                              <FormControlLabel
                                key={item.areaOption}
                                style={{ width: "48%" }}
                                control={
                                  <Checkbox
                                    checked={TESAreainputs?.area?.includes(item.area)}
                                    onChange={() => handleAreaCheckBox(item.area, item.time)}
                                  />
                                }
                                label={<span style={{ fontSize: "10px", fontWeight: "400" }}>{item.areaOption.slice(0, item.areaOption.indexOf('('))}</span>}
                              />
                            ))}
                          </MDBox>

                        </MDBox>  
                    } */}

                    <MDBox
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography
                        component="label"
                        variant="h6"
                        htmlFor="nextRoundInput"
                      >
                        New Owner:
                      </MDTypography>
                      <Select
                        style={{
                          width: "100%",
                          height: "40px",
                          textAlign: "start",
                        }}
                        labelId="nextRound-label"
                        id="nextRound-select"
                        value={postData.nextRound || ""}
                        onChange={handleInputChange}
                        name="nextRound"
                        IconComponent={() => (
                          <ArrowDropDownIcon style={{ marginRight: "10px" }} />
                        )}
                      >
                        <MenuItem value="">Select Owner</MenuItem>
                        {owners &&
                          owners.map((s) => (
                            <MenuItem key={s} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                      </Select>
                      {errors.nextRound && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{errors.nextRound}</p>
                      )}
                    </MDBox>

                    {/* <MDBox className="mb-3 row">
                        <label className="col-sm-3 col-form-label">New Status:</label>
                        <MDBox className="col-sm-9">
                            <select className='form-select' onChange={handleInputChange} onFocus={hideErrors} name="status">
                                <option value="">---Choose new status---</option>
                                {statusOpt && statusOpt.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.status ? <p className='text-danger'>{errors.status}</p> : null}
                        </MDBox>
                    </MDBox> */}
                    {/* <MDBox className="mb-3 row">
                        <label className="col-sm-3 col-form-label">New Owner:</label>
                        <MDBox className="col-sm-9">
                            <select className='form-select' value={postData.nextRound} onChange={handleInputChange} onFocus={hideErrors} name="nextRound">
                                <option >--Choose new owner--</option>
                                {owners && owners.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            {errors.nextRound ? <p className='text-danger'>{errors.nextRound}</p> : null}
                        </MDBox>
                    </MDBox> */}
                    <MDBox
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <MDTypography
                        component="label"
                        variant="h6"
                        htmlFor="commentInput"
                      >
                        Comments:
                      </MDTypography>
                      <MDInput
                        className="form-control"
                        fullWidth
                        name="comment"
                        value={postData.comment}
                        onFocus={hideErrors}
                        onChange={handleInputChange}
                        type="text"
                      />
                      {errors.comment && (
                        <p style={{ color: 'red', fontSize: '14px' }}>{errors.comment}</p>
                      )}
                    </MDBox>
                    {/* <MDBox className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Comments:</label>
                        <MDBox className="col-sm-9">
                            <input className='form-control' name="comment" value={postData.comment} onFocus={hideErrors} onChange={handleInputChange} type="text" />
                            {errors.comment ? <p className='text-danger'>{errors.comment}</p> : null}
                        </MDBox>
                    </MDBox> */}
                    {/* <MDBox>
                        {
                            loading ? <button className="btn btn-info" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Change status... </button>
                                : <button type="submit" className="btn btn-primary" disabled={loading}>Change Status</button>
                        }
                    </MDBox> */}
                    {/* </form> */}
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      style={{ marginRight: "10px" }}
                      variant="gradient"
                      color="info"
                      onClick={handleEditModalClose}
                    >
                      Close
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      color="success"
                      type="submit"
                      sx={{ backgroundColor: "green" }}
                    >
                      Save Changes
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              {/* </MDBox> */}
            </Card>
          </Grid>
        </Grid>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default EditCandidateForm;

///working code :
{
  /* <FormControl sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", }}>
                    <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                      Area
                    </MDTypography>
                    <Select
                      style={{ width: '100%', height: '40px', textAlign: "start" }}
                      label=""
                      labelId="area-label"
                      id="area-select"
                      value={inputs.area || "Select Area"}
                      onChange={(event) => {
                        setInputs({
                          ...inputs,
                          area: event.target.value,
                        });
                      }}
                      disabled={inputs.testStatus === "Test Taken" || inputs.testStatus === "Evaluated"}
                      IconComponent={() => <ArrowDropDownIcon style={{ marginRight: '10px' }} />}
                    >
                      {/* <MenuItem value="">Select Status</MenuItem> */
}

// <MenuItem value="VLSI_FRESHER_1">VLSI_FRESHER_1</MenuItem>
// <MenuItem value="VLSI_FRESHER_2">VLSI_FRESHER_2</MenuItem>
{
  /* <MenuItem value="VLSI_FRESHER_3">VLSI_FRESHER_3</MenuItem> */
}
// <MenuItem value="VLSI_FRESHER_1_2">VLSI_FRESHER_1 & VLSI_FRESHER_2</MenuItem>
{
  /*
                  <MenuItem value="VLSI">VLSI</MenuItem>
                  <MenuItem value="EMBEDDED">EMBEDDED</MenuItem>
                  <MenuItem value="SOFTWARE">SOFTWARE</MenuItem> */
}

// </Select>
// </FormControl> */}

// await axios.put(`http://13.233.161.128/appicant/update/comments`, { email: inputs.email, comment: `The applicant's test result has been updated from On Hold to <b> ${result} </b>`, commentBy: "TES System", cRound: "Online Assessment Test", nextRound: "Veera", status: "Hiring Manager" })
// window.location.reload()
//   const index = candidateList.findIndex((candidateItem) => {
//     // console.log('candidateItem:', candidateItem);
//     return candidateItem._id === inputs._id;
//   });
//   const updatedCandidates = [...candidateList];
// //   console.log(updatedCandidates)
//   updatedCandidates[index].name = inputs.name;
//   updatedCandidates[index].email = inputs.email;
// //   updatedCandidates[index].testStatus = testStatus;
//   updatedCandidates[index].area = inputs.area;
//   updatedCandidates[index].mcqCount = inputs.mcqCount;
//   updatedCandidates[index].codeCount = inputs.codeCount;
//   updatedCandidates[index].paragraphCount = inputs.paragraphCount;
//   setInputs(updatedCandidates);
//   setShowEditModal(false);
// window.location.reload();
{
  /* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */
}

{
  /* <MDBox mb={2}>
            <Select
                value={inputs.testStatus}
                onChange={(event) => {
                inputs({
                    ...inputs,
                    testStatus: event.target.value,
                });
                }}
                disabled={
                inputs.testStatus === "Test Taken" ||
                inputs.testStatus === "Evaluated"
                }
            >
                <MenuItem value="">Select status</MenuItem>
                <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
            </Select>
            </MDBox> */
}

{
  /* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */
}

{
  /* {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )} */
}
{
  /* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password? Reset it{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  here
                </MDTypography>
              </MDTypography>
            </MDBox> */
}
{
  /* <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */
}
//   const submitHandler = async (e) => {
//     // check rememeber me?
//     e.preventDefault();

//     const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
//       setErrors({ ...errors, emailError: true });
//       return;
//     }

//     if (inputs.password.trim().length < 6) {
//       setErrors({ ...errors, passwordError: true });
//       return;
//     }

//     // const newUser = { email: inputs.email, password: inputs.password };
//     // addUserHandler(newUser);

//     // const myData = {
//     //   data: {
//     //     type: "token",
//     //     attributes: { ...newUser },
//     //   },
//     // };

//     try {
//       // const response = await AuthService.login(myData);
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginEvaluator`, inputs)
//       authContext.login(response.access_token, response.refresh_token);
//     } catch (res) {
//       if (res.hasOwnProperty("message")) {
//         setCredentialsError(res.message);
//       } else {
//         setCredentialsError(res.errors[0].detail);
//       }
//     }

//     return () => {
//       setInputs({
//         email: inputs.name,
//         password: "",
//       });

//       setErrors({
//         emailError: false,
//         passwordError: false,
//       });
//     };
//   };

//   const handleEditModalClose = (item) => {
//     // console.log(item)
//   }

{
  /* <FormControl sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
                <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                    Result
                </MDTypography>
                <Select
                    style={{ width: '100%', height: '40px', textAlign:"start"}}
                    label = ""
                    labelId="test-status-label"
                    // readOnly
                    id="test-status-select"
                    value={inputs.result || "Select Area"}
                    error={errors.areaError}
                    onChange={(event) => {
                    setInputs({
                        ...inputs,
                        result: event.target.value,
                    });
                    }}
                    disabled={
                      inputs.result === "Pass" ||
                      inputs.result === "Fail"
                    }
                    
                >
                    <MenuItem value="On Hold">ON HOlD</MenuItem>
                    <MenuItem value="Pass">PASS</MenuItem>
                    <MenuItem value="Fail">FAIL</MenuItem>
                </Select>
            </FormControl> */
}
{
  /* <MDBox mb={2} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Area
            </MDTypography>
                <MDInput
                    type="text"
                    label=""
                    fullWidth
                    // defaultValue=""
                    value={inputs.area}
                    name="area"
                    onChange={changeHandler}
                    error={errors.areaError}
                />
            </MDBox> */
}
{
  /* <MDBox>
              {inputs.result === "On Hold" && (
              <FormControl>
                <InputLabel>Result</InputLabel>
                <Select
                  value={inputs.result}
                  onChange={(e) => setInputs(e.target.value)}
                >
                  <MenuItem value="On Hold">On Hold</MenuItem>
                  <MenuItem value="Pass">Pass</MenuItem>
                  <MenuItem value="Fail">Fail</MenuItem>
                </Select>
              </FormControl>
            )}
            </MDBox> */
}
