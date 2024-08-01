import React, { useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from 'react-toastify';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';
import { FormControlLabel, MenuItem, Select } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from 'react-router-dom';
// import { baseUrl } from '../../baseUl';

const roles = ["ML-Lead", "ML-Engineer", 'MERN Stack Developer', 'Web-dev lead', 'React JS Developer', 'Node Js Developer', 'Test Engineer', 'Java Developer', 'Python Developer', "VLSI Design Engineer", "Embedded Engineer", "Others"];
const qualifications = ['Master of Engineering', 'Master of Technology', 'Bachelor of Engineering', 'Bachelor of Technology', "Bachelor's degree", "Others"];
const branches = ['Computer Science Engineering', 'Information Technology', 'Electronics and Communication Engineering', "Electrical and Electronic Engineering", "Mechanical Engineering", 'Others'];
const area = ['Software', 'VLSI', 'VLSI_Fresher', 'Embedded'];
const sourceOfProfileList =['Naukri', 'LinkedIn', 'Consultancy', 'Institute'];

function AddApplicant() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    collegeName: '',
    qualification: '',
    branch: '',
    role: '',
    // area: '',
    passout: '',
    resumeLink: '',
    isExperienced: '',
    previousCompany: '',
    sourceOfProfile:'',
    experience: '0'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      errors.name = 'Name should contain only alphabets and spaces';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number should contain only 10 digits';
    } else if (!/^[6-9]\d{9}/.test(formData.mobile)) {
      errors.mobile = "Invalid mobile number";
    }
    if (!formData.collegeName) {
      errors.collegeName = 'College name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.collegeName.trim())) {
      errors.collegeName = "College name should only contain alphabets and spaces";
    }
    const fieldsToValidate = ['qualification', 'branch', 'role', 'sourceOfProfile'];
    for (const field of fieldsToValidate) {
      if (!formData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    if (!formData.passout) {
      errors.passout = 'Passout year is required';
    } else if (!/^(200\d|201\d|202[0-3])/.test(formData.passout)) {
      errors.passout = "Please enter a valid passout year.";
    }
    if (!formData.resumeLink) {
      errors.resumeLink = 'Resume link is required';
    } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(formData.resumeLink.trim())) {
      errors.resumeLink = "Resume link should be a valid URL";
    }
    if (formData.isExperienced === "") {
      errors.isExperienced = 'Please confirm whether the applicant has experience or not';
    }
    if (formData.isExperienced === 'yes') {
      if (!formData.previousCompany) {
        errors.previousCompany = 'Previous company name is required';
      } else if (!/^[a-zA-Z0-9 ]+$/.test(formData.previousCompany.trim())) {
        errors.previousCompany = 'Previous company should only contain alphabets and spaces';
      }
      if (!formData.experience || formData.experience === "0") {
        errors.experience = 'Total experience is required';
      } else if (formData.experience < 0 || formData.experience > 30) {
        errors.experience = "Maximum experience is limited to 30 years";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/applicant/add`, formData);
        if (response.status === 201) {
          toast.info(`New Applicant ${formData.name} Added Successfully`, { autoClose: 3000, style: { fontSize: '16px' } });
          await axios.post(`${baseUrl}/add/send/${formData.name}/${formData.role}`);
          toast.info('Email sent to Hiring Manager successfully.', { autoClose: 3000, style: { fontSize: '16px' } });
          navigate("/");
        } else {
          setErrors(response.data || {});
          toast.error(response.data?.email || "Unable to add applicant now! Try after some time.", { autoClose: 5000, style: { fontSize: '16px' } });
        }
      } catch (err) {
        setErrors(err.response?.data || {});
        toast.error(err.response?.data?.email || "Unable to add applicant now! Try after some time.", { autoClose: 5000, style: { fontSize: '16px' } });
      }
    }
    setLoading(false);
  };

  const selectHeight = {
    height:"40px"
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ margin: "70px auto", width: "80%" }}>
        <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={-3} p={1} mb={1} textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add New Applicant
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Name of the Applicant" fullWidth name="name" value={formData.name} onChange={handleChange} error={!!errors.name} />
              {errors.name && <MDTypography variant="caption" color="error" fontWeight="light">{errors.name}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email of the Applicant" fullWidth name="email" value={formData.email} onChange={handleChange} error={!!errors.email} />
              {errors.email && <MDTypography variant="caption" color="error" fontWeight="light">{errors.email}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="number" label="Mobile Number" fullWidth name="mobile" value={formData.mobile} onChange={handleChange} error={!!errors.mobile} />
              {errors.mobile && <MDTypography variant="caption" color="error" fontWeight="light">{errors.mobile}</MDTypography>}
            </MDBox>
            <MDBox mb={2} >
              <Select fullWidth name="role" value={formData.role} onChange={handleChange} displayEmpty style={selectHeight} >
                <MenuItem value="" disabled>---Select Applied Role---</MenuItem>
                {roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
              </Select>
              {errors.role && <MDTypography variant="caption" color="error" fontWeight="light">{errors.role}</MDTypography>}
            </MDBox>
            {/* <MDBox mb={2}>
              <Select fullWidth name="area" value={formData.area} onChange={handleChange} displayEmpty style={selectHeight}>
                <MenuItem value="" disabled>---Select Area---</MenuItem>
                {area.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </Select>
              {errors.area && <MDTypography variant="caption" color="error" fontWeight="light">{errors.area}</MDTypography>}
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput type="text" label="College Name" fullWidth name="collegeName" value={formData.collegeName} onChange={handleChange} error={!!errors.collegeName} />
              {errors.collegeName && <MDTypography variant="caption" color="error" fontWeight="light">{errors.collegeName}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <Select fullWidth name="qualification" value={formData.qualification} onChange={handleChange} displayEmpty style={selectHeight}>
                <MenuItem value="" disabled>---Select Highest Qualification---</MenuItem>
                {qualifications.map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
              </Select>
              {errors.qualification && <MDTypography variant="caption" color="error" fontWeight="light">{errors.qualification}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <Select fullWidth name="branch" value={formData.branch} onChange={handleChange} displayEmpty style={selectHeight}>
                <MenuItem value="" disabled>---Select Branch---</MenuItem>
                {branches.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </Select>
              {errors.branch && <MDTypography variant="caption" color="error" fontWeight="light">{errors.branch}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Passout Year" fullWidth name="passout" value={formData.passout} onChange={handleChange} error={!!errors.passout} />
              {errors.passout && <MDTypography variant="caption" color="error" fontWeight="light">{errors.passout}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Resume Link" fullWidth name="resumeLink" value={formData.resumeLink} onChange={handleChange} error={!!errors.resumeLink} />
              {errors.resumeLink && <MDTypography variant="caption" color="error" fontWeight="light">{errors.resumeLink}</MDTypography>}
            </MDBox>
            <MDBox mb={2}>
              <MDTypography variant="body2">Is Experienced?</MDTypography>
              <Select fullWidth name="isExperienced" value={formData.isExperienced} onChange={handleChange} displayEmpty style={selectHeight}>
                <MenuItem value="" disabled>Select Experience Status</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
              {errors.isExperienced && <MDTypography variant="caption" color="error" fontWeight="light">{errors.isExperienced}</MDTypography>}
            </MDBox>
            {formData.isExperienced === 'yes' && (
              <>
                <MDBox mb={2}>
                  <MDInput type="text" label="Previous Company" fullWidth name="previousCompany" value={formData.previousCompany} onChange={handleChange} error={!!errors.previousCompany} />
                  {errors.previousCompany && <MDTypography variant="caption" color="error" fontWeight="light">{errors.previousCompany}</MDTypography>}
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="number" label="Experience (Years)" fullWidth name="experience" value={formData.experience} onChange={handleChange} error={!!errors.experience} />
                  {errors.experience && <MDTypography variant="caption" color="error" fontWeight="light">{errors.experience}</MDTypography>}
                </MDBox>
              </>
            )}
            <MDBox mb={2}>
              <Select fullWidth name="sourceOfProfile" value={formData.sourceOfProfile} onChange={handleChange} displayEmpty style={selectHeight}>
                <MenuItem value="" disabled>---Select Source of Profile---</MenuItem>
                {sourceOfProfileList.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </Select>
              {errors.sourceOfProfile && <MDTypography variant="caption" color="error" fontWeight="light">{errors.area}</MDTypography>}
            </MDBox>
            <MDBox mt={2} mb={1}>
              {loading ? (
                <MDButton variant="gradient" disabled color="warning" fullWidth type="submit">Adding...</MDButton>
              ) : (
                <MDButton variant="gradient" color="info" fullWidth type="submit">+ Add</MDButton>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer />
    </DashboardLayout>
  );
}

export default AddApplicant;
