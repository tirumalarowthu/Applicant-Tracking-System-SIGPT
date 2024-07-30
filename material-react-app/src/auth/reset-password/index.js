import { useEffect, useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import axios from "axios";

// for the reset I should take from the url the token sent and the email
const PasswordReset = () => {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(false);
  const [loading,setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    passwordError: false,
    confirmationError: false,
    error: false,
    textError: "",
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const condition = localStorage.getItem('userEmail') || false
    if (condition === false) {
      navigate("/forgot-password")
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    if (inputs.password_confirmation.trim() !== inputs.password.trim()) {
      setErrors({ ...errors, confirmationError: true });
      return;
    }


    try {
      const email = localStorage.getItem('userEmail') || false
      if (email) {
        try {
          // console.log(email,inputs.password)
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/updatePassword/user/${email} `, { newPassword: inputs.password })
          // console.log(response)
          localStorage.removeItem('userEmail')
          alert("Password has been reset successfully.")
          navigate("/auth/login")

          // navigate("/login")
        }
        catch (err) {
          alert("Failed to update password.Please try after some time!")
          setLoading(false)
        }
      }
      setInputs({
        password: "",
        password_confirmation: "",
      });

      setErrors({
        passwordError: false,
        confirmationError: false,
        error: false,
        textError: "",
      });

      // if (errors.passwordError === false && errors.confirmationError === false) {
      //   setNotification(true);
      //   navigate("/auth/login")
      // }
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setErrors({ ...errors, error: true, textError: err.errors.password[0] });
      }
      return null;
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your new password and its confirmation for update
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password Confirmation"
                variant="standard"
                fullWidth
                name="password_confirmation"
                value={inputs.password_confirmation}
                onChange={changeHandler}
                error={errors.confirmationError}
              />
            </MDBox>

            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {errors.textError}
              </MDTypography>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                change
              </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
      {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
            Your password change was successful. Go back to
            <MDTypography
              component={Link}
              to="/auth/login"
              variant="body2"
              fontWeight="medium"
              color="white"
            >
              &nbsp;login&nbsp;
            </MDTypography>
            to authenticate.
          </MDTypography>
        </MDAlert>
      )}
    </CoverLayout>
  );
};

export default PasswordReset;

{/* <MDBox mt={3} mb={1} textAlign="center">
              
</MDBox> */}
{/* <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography> */}
// const formData = {
//   password: inputs.password,
//   password_confirmation: inputs.password_confirmation,
//   email: email,
//   token: token,
// };

// const myData = {
//   data: {
//     type: "password-reset",
//     attributes: { ...formData },
//   },
// };
// useEffect(() => {
//   // get the token and email sent in the url
//   const queryParams = new URLSearchParams(window.location.search);
//   setToken(queryParams.get("token"));
//   setEmail(queryParams.get("email"));
// }, []);
