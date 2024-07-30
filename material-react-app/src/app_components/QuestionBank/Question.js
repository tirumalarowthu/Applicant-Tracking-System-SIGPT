// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { Divider } from "@mui/material";
import axios from "axios";
import DeleteQuestionModel from "./DeleteQuestionModel";

function Question({ name, imageURL, qnum, c1, c2, c3, c4, questionId, correct_choice, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleDeleteQuestion = (questionId) => {
    const confirmMessage = `Do you want to delete the following question: ${name}?`
    if (window.confirm(confirmMessage)) {
      console.log(confirmMessage)
      try {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteQuestion/${questionId}`)
        alert("Question deleted successfully")
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function checkAnswer(ans) {
    switch (ans) {
      case 1: return "A";
      case 2: return "B";
      case 3: return "C";
      case 4: return "D";
      default: return ans;
    }
  }

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      m={2}
      width="45%"
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox mb={1} lineHeight={1}>
          <MDTypography variant="button" fontWeight="medium" style={{whiteSpace: "pre-wrap"}}>
            {qnum} ) {name.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </MDTypography>
          <br />
          {imageURL && (
            <MDTypography>
              <img width="100%" src={imageURL} alt="question pic" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </MDTypography>
          )}
          <MDTypography variant="button" fontWeight="light">a) {c1}</MDTypography>
          <br />
          <MDTypography variant="button" fontWeight="light">b) {c2}</MDTypography>
          <br />
          <MDTypography variant="button" fontWeight="light">c) {c3}</MDTypography>
          <br />
          <MDTypography variant="button" fontWeight="light">d) {c4}</MDTypography>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={0}
        >
          <MDTypography variant="button" fontWeight="medium">
            Correct choice : {checkAnswer(correct_choice)}
          </MDTypography>
          <DeleteQuestionModel questionId={questionId} name={name}/>
          {/* <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox onClick={() => handleDeleteQuestion(questionId)} mr={1}>
              <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
          </MDBox> */}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default Question;
