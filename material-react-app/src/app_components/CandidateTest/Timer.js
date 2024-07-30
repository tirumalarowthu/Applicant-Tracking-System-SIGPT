import { useState, useEffect } from "react";
import axios from "axios";
import MDTypography from "components/MDTypography";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Timer = ({
  candidate_email,
  mcqquestions,
  setLoading,
  remainingTime,
  setRemainingTime,
}) => {
  const [candidateInfoFetched, setCandidateInfoFetched] = useState(false);
  const navigate = useNavigate();
  ///Submit the answers if time up:
  const handleAutoSubmit = async () => {
    setLoading(true);

    const selectedAnswers =
      (await JSON.parse(localStorage.getItem("selectedAnswers"))) || {};
    await mcqquestions.forEach((question) => {
      // Check if the question's _id exists in the answered object
      if (!selectedAnswers.hasOwnProperty(question._id)) {
        // If it doesn't exist, add it to the answered object with an empty string value
        selectedAnswers[question._id] = "";
      }
    });

    await axios
      .patch(`${process.env.REACT_APP_API_URL}/automatic/testresults`, {
        email: candidate_email,
        selectedAnswers,
      })
      .then((response) => {
        toast.info(
          "Your test is automatically submitted! Shortly, you will receive a mail regarding your results and further process.",
          {
            style: {
              fontSize: "16px",
            },
          }
        );
        navigate(`/result/${candidate_email}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        localStorage.clear();
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/candidate/details/${candidate_email}`
        );
        const candidateInfo = response.data.candidate;
        setRemainingTime(candidateInfo.timeLeft);
        setCandidateInfoFetched(true);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchData();
  }, [candidate_email]);

  useEffect(() => {
    if (candidateInfoFetched) {
      if (remainingTime == 300) {
        toast.warn(
          "You have only 5 minutes left! Please ensure that you answer all the questions.",
          { autoClose: false, style: { fontSize: "16px" } }
        );
        const timer = setInterval(() => {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        }, 1000);

        // Cleanup the timer when component unmounts or remainingTime becomes zero
        return () => clearInterval(timer);
      } else if (remainingTime <= 0) {
        // Submit the test or perform any action when remainingTime reaches zero
        // handleTestSubmissionAttempt();
        handleAutoSubmit();
        toast.warn("Time's up! Your test has been automatically submitted", {
          style: { fontSize: "16px" },
        });
      } else {
        // Start a timer to decrement remainingTime every second
        const timer = setInterval(() => {
          setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
        }, 1000);

        // Cleanup the timer when component unmounts or remainingTime becomes zero
        return () => clearInterval(timer);
      }
    }
  }, [candidateInfoFetched, remainingTime]);

  // Function to format time in HH:MM:SS format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}H:${minutes
      .toString()
      .padStart(2, "0")}M:${seconds.toString().padStart(2, "0")}S`;
  };

  return (
    <MDTypography>
      <AccessAlarmsIcon color="primary" />
      &nbsp;Time Left - {formatTime(remainingTime)}
    </MDTypography>
  );
};

export default Timer;

// import React, { useState, useEffect } from 'react';
// import MDTypography from 'components/MDTypography';
// import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

// const Timer = ({ handleNextClick }) => {
//     const initialTime = 90; // 90 seconds = 1 minute 30 seconds
//     const [time, setTime] = useState(initialTime);

//     useEffect(() => {
//         const startTime = parseInt(localStorage.getItem('startTime'), 10) || Date.now();
//         const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//         const remainingTime = initialTime - elapsedTime;

//         if (remainingTime <= 0) {
//             setTime(0);
//             localStorage.removeItem('timer');
//             localStorage.removeItem('startTime');
//             alert('Time is up! The test will be auto-submitted.');
//             handleNextClick();
//         } else {
//             setTime(remainingTime);
//             localStorage.setItem('timer', remainingTime);
//             localStorage.setItem('startTime', startTime);
//         }

//         const interval = setInterval(() => {
//             setTime(prevTime => {
//                 if (prevTime > 0) {
//                     const newTime = prevTime - 1;
//                     localStorage.setItem('timer', newTime);
//                     if (newTime === 60) {
//                         alert('60 seconds  remaining!');
//                     }
//                     return newTime;
//                 } else {
//                     clearInterval(interval);
//                     return 0;
//                 }
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [handleNextClick]);

//     const formatTime = () => {
//         const minutes = Math.floor(time / 60);
//         const seconds = time % 60;
//         return `${minutes.toString().padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;
//     };

//     return (
//         <MDTypography>
//             <AccessAlarmsIcon color="primary" />
//             &nbsp;Time Left - {formatTime()}
//         </MDTypography>
//     );
// };

// export default Timer;

//Working code ####

// import React, { useState, useEffect } from 'react';
// import MDTypography from 'components/MDTypography';
// // import { Icon } from '@mui/material';
// import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
// const Timer = () => {
//     const initialTime = 1200; // 1200 seconds = 20 minutes
//     const [time, setTime] = useState(initialTime);

//     useEffect(() => {
//         const startTime = parseInt(localStorage.getItem('startTime'), 10) || Date.now();
//         const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//         const remainingTime = initialTime - elapsedTime;

//         if (remainingTime <= 0) {
//             alert('Time is up! So test will be auto submit.');
//             setTime(0);
//             localStorage.removeItem('timer');
//             localStorage.removeItem('startTime');
//             document.getElementById("submit_test_auto").click();
//             // handleNextClick()
//         } else {
//             setTime(remainingTime);
//             localStorage.setItem('timer', remainingTime);
//             localStorage.setItem('startTime', startTime);
//         }

//         const interval = setInterval(() => {
//             setTime(prevTime => {
//                 if (prevTime > 0) {
//                     const newTime = prevTime - 1;
//                     localStorage.setItem('timer', newTime);
//                     if (newTime === 60) {
//                         alert('60 seconds remaining!');
//                     }else if(newTime === 0){
//                          localStorage.removeItem('timer');
//                          localStorage.removeItem('startTime');
//                          alert('Time is up! So test will be auto submit.');
//                          document.getElementById("submit_test_auto").click();

//                         //  handleNextClick()
//                     }

//                     return newTime;
//                 } else {
//                     clearInterval(interval);
//                     return 0;
//                 }
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     const formatTime = () => {
//         const hours = Math.floor(time / 3600);
//         const minutes = Math.floor((time % 3600) / 60);
//         const seconds = time % 60;
//         return `${hours.toString().padStart(2, '0')}H:${minutes
//             .toString()
//             .padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;
//     };

//     return (
//         <MDTypography variant="h6">
//              <AccessAlarmsIcon
//                 color="primary"
//              />

//              &nbsp;Time Left - {formatTime()}

//         </MDTypography>
//     );
// };

// export default Timer;
