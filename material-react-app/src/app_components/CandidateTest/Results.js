import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";


const Results = () => {
  const navigate = useNavigate();
  const { candidate_email } = useParams()
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const labels = {
    0: '',
    1: 'Poor',
    2: 'Ok',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const buttonHandler = async () => {
    try {
      const response = await axios.post("/candidate/feedback", { email: candidate_email, rating: value })
      console.log(response)
      navigate("/");
    }
    catch (err) {
      console.log(err)
      navigate("/");

    }
    toast.info(
      "Thanks for being a part of the drive.",
      {
        style: {
          fontSize: '16px',
        },
      }
    );
    navigate("/");


  };

  return (
    <BasicLayoutLanding >
      <MDBox style={{ marginTop: "90px" }}>
        <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mt={2} mb={1}>
          "Thank you for taking the test. Good luck!"
          <Divider />
          <MDBox>
            <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mt={2} mb={1}>
              Rate Our App Now
            </MDTypography>
            <Rating
              name="hover-feedback"
              value={value}
              size="large"
              precision={1}
              // precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </MDBox>

        </MDTypography>
        <br />
        <MDButton
          onClick={buttonHandler}
          variant="gradient" color="info"
        >
          Click here to finish
        </MDButton>
      </MDBox>
    </BasicLayoutLanding >
  );
};

export default Results;
