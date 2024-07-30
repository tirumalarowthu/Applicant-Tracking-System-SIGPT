import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";

function TabSwitchModel({
  open,
  onClose,
  tabSwitchCount,
  handleAutoSubmitTest,
}) {

  useEffect(()=>{
    if(tabSwitchCount > 5) {
      onClose();
      toast.warn(
        "Your test is being automatically submitted because you switched tabs during the test.",
        { style: { fontSize: "16px" } }
      );
      handleAutoSubmitTest(
        "The test was automatically submitted due to the candidate continuously switching tabs."
      );
    }
  },[tabSwitchCount]);


  const handleTabSwitch = (tabSwitchCount) => {
    if (tabSwitchCount > 5) {
      onClose();
      toast.warn(
        "Your test is being automatically submitted because you switched tabs during the test.",
        { style: { fontSize: "16px" } }
      );
      handleAutoSubmitTest(
        "The test was automatically submitted due to the candidate switching tabs."
      );
    } else {
      onClose();
    }
  };

  return (
    <Modal open={open} disableEscapeKeyDown disableBackdropClick>
      <MDBox
        sx={{
          backgroundColor: "#efefef",
          color: "red",
          position: "absolute",
          borderRadius: "10px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* <MDTypography variant="h6" component="h2" >Please remember not to switch tabs during the test. If you do, the test will end automatically. Stay on this tab to complete your test smoothly. Thank you for your cooperation</MDTypography> */}
          <MDTypography variant="h6" component="h2">
            <span style={{ color: "red" }}>Warning </span> : You are not allowed
            to switch tabs during the test. If you are continuously switching
            tabs, the test will be automatically submitted. Please ensure to
            stay on this tab to complete your test smoothly. Your cooperation is
            appreciated. Thank you.
          </MDTypography>
          {/* <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton> */}
        </MDBox>
        <MDBox>
          <MDTypography style={{ color: "red" }} variant="h6" component="h6">
            Tab Switch Count is : {tabSwitchCount}
          </MDTypography>
        </MDBox>
        {/* <MDTypography variant="h6" component="h2" style={{color:'red'}}>No. of times shifted to another tab is : {tabSwitchCount} </MDTypography> */}
        {/* <MDTypography variant="h6" mt={2}>Change Result : </MDTypography> */}
        <MDBox sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <MDButton
            variant="contained"
            color="error"
            onClick={() => handleTabSwitch(tabSwitchCount)}
          >
            OK
          </MDButton>
          {/* <Button variant="contained" onClick={onClose}>Cancel</Button> */}
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default TabSwitchModel;

// function TabSwitchModel() {
//     const [showModal, setShowModal] = useState(false);
//     const { email } = useParams()
//     const openModal = () => setShowModal(true);
//     const closeModal = () => setShowModal(false);
//     const handleChangeResult = async (result) => {
//         // Implement logic to update candidate result
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/update/TestResult/${email}`, { result })
//             toast.success(`${response.data.name}'s result has been updated to "${result}" successfully.`, {
//                 style: {
//                   fontSize: '16px',
//                 },
//                 autoClose:5000,
//                 onClose: () => {
//                     window.location.reload();
//                 }
//               });
//         } catch (error) {
//             console.log(error)
//         }
//         closeModal();
//     };

//     return (
//         <MDBox>
//             <MDButton onClick={openModal} sx={{textDecoration :"underline", marginTop: '10px'}} variant="contained" color="primary" >
//                 Re-Evaluate
//             </MDButton>
//             <CandidateResultChangeModal open={showModal} onClose={closeModal} onChangeResult={handleChangeResult} />
//         </MDBox>
//     );
// }
