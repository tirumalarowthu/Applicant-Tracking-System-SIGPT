import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

function Login() {
  const authContext = useContext(AuthContext);
  const [loading,setLoading] = useState(false)
  // const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // const addUserHandler = (newUser) => setUser(newUser);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();
    setLoading(true)

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      setLoading(false)
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      setLoading(false)
      return;
    }

    // const newUser = { email: inputs.email, password: inputs.password };
    // addUserHandler(newUser);

    // const myData = {
    //   data: {
    //     type: "token",
    //     attributes: { ...newUser },
    //   },
    // };

    try {
      // const response = await AuthService.login(myData);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login/${inputs.email}`, inputs)
      console.log(response.data)
      if(response.data){
        localStorage.setItem('eval_info', JSON.stringify(response.data))
        console.log(localStorage.getItem("eval_info"))
        authContext.login(response.access_token, response.refresh_token);
      }
      
    } catch (res) {
      console.log(res.response.data, "response of the error")
      if (res.message ==="Network Error"){
        toast.error("No internet connection!")
        setLoading(false)
        // window.location.reload()
      } 
      else if ( res.response.data.email ==="Email not found.") {
        toast.error("The Email you've entered is not found.")
        setLoading(false)
                // window.location.reload()

      }
      else if ( res.response.data.password ==="Incorrect Password.") {
        toast.error("Incorrect Password.")
        setLoading(false)
                // window.location.reload()

      }
      
      
      
      else {
        if (res.response.status === 400){
          console.log(res.response.data)
          setCredentialsError(res.response.data);
          setLoading(false)
        }else{
          setLoading(false)
        }
        
      }
      // if (res.hasOwnProperty("message")) {
      //   setCredentialsError(res.message);
      //   setLoading(false)
      // } else {
      //   setCredentialsError(res.errors[0].detail);
      //   setLoading(false)
      // }
    }

    

    return () => {
      setInputs({
        email: "",
        password: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
      });
    };
  };


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <BasicLayoutLanding image={bgImage}>
      <Card>
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ATS LOGIN
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
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
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler} >
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
                
              />
            </MDBox>
            <MDBox mb={2}>
      <MDInput
        type={showPassword ? "text" : "password"}
        label="Password"
        fullWidth
        name="password"
        value={inputs.password}
        onChange={changeHandler}
        error={errors.passwordError}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
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
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              {
                loading ?  <MDButton variant="gradient" disabled color="info" fullWidth>
               <CircularProgress color='black' size={20} /> Please Wait...
              </MDButton>  :  <MDButton variant="gradient" color="info" fullWidth type="submit">
                Log in
              </MDButton>
              }
              
            </MDBox>
            {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )}
            {/* <MDBox mt={3} mb={1} textAlign="center">
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
            </MDBox> */}
            {/* <MDBox mb={1} textAlign="center">
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
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayoutLanding>
  );
}

export default Login;
