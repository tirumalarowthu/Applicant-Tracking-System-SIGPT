import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Icon from "@mui/material/Icon";


const generateResultColor = (final_result) => {
    if (final_result === "Pass") {
        return "success"
    } else if (final_result === "Fail") {
        return "error"
    } else {
        return "warning"
    }
}

function DeleteQuestionModal({ open, onClose, questionId, name }) {
    // const question = name.replace(/(<([^>]+)>)/ig, '');
    const [isLoading, setIsLoading] = useState(false);
    const handleResultChange = (result) => {
        // onChangeResult(result);
        onClose();
    };

    const DeleteQuestion = async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/deleteQuestion/${questionId}`);
          setIsLoading(true)
          toast.success("Question deleted successfully.");
          await new Promise(resolve => setTimeout(resolve, 2000));
          onClose()
          setIsLoading(false);
          window.location.reload(false);
        } catch (error) {
          toast.warn("Failed to delete question.", {
            style:{
                fontSize: '16px',
            }
          });
          console.log(error);
          window.location.reload(false);
        }
      };
      
      

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: "absolute",borderRadius:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <MDBox>
                    <MDTypography variant="h6" component="h2" style={{color:'black'}}>Do you really want to delete the question?</MDTypography>
                    <br/>
                    <MDTypography variant="button" component="h4" fontWeight="light" style={{color:'black'}}>Question: {name.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                        ))}</MDTypography>
                    <MDTypography variant="button" component="h6" color='error' fontWeight="light" sx={{fontSize:'12px'}}>Note: If you delete the question, it will be removed from the database.</MDTypography>

                    </MDBox>

                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                {/* <MDTypography variant="h6" mt={2}>Change Result : </MDTypography> */}
                <MDBox sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <MDButton variant="contained" color="success" onClick={() => DeleteQuestion()} disabled={isLoading}>{isLoading? "Deleting..." : "Yes" }</MDButton>
                    {/* <MDButton variant="contained" color="warning" onClick={() => handleResultChange("On Hold")}>On Hold</MDButton> */}
                    <MDButton variant="contained" color="error" onClick={() => handleResultChange("Fail")}>No</MDButton>
                    {/* <Button variant="contained" onClick={onClose}>Cancel</Button> */}
                </MDBox>
            </Box>
        </Modal>
    );
}

function DeleteQuestionModel({ questionId, name }) {
    const [showModal, setShowModal] = useState(false);
    const { email } = useParams()
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    const handleChangeResult = async (result) => {
        // Implement logic to update candidate result
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/update/TestResult/${email}`, { result })
            toast.success(`Please wait,Changing result to: ${result}`, {
                style: {
                  fontSize: '16px', 
                },
                onClose: () => {
                  window.location.reload();
                }
              });
        } catch (error) {
            console.log(error)
        }
        closeModal();
    };

    return (
        <MDBox>
            <MDButton onClick={openModal} sx={{textDecoration :"underline", marginTop: '10px'}} variant="contained" color="primary" >
                {/* {result} */}
                <Icon>delete</Icon>&nbsp;delete
            </MDButton>
            <DeleteQuestionModal open={showModal} onClose={closeModal} onChangeResult={handleChangeResult} questionId={questionId} name={name} />
        </MDBox>
    );
}

export default DeleteQuestionModel;

//   await Promise.all(
        //     checkedCandidates.map(async (candidateId) => {
        //       setIsLoading(true)
        //       // console.log(email.item_id, "item")
        //       await axios.patch(`${process.env.REACT_APP_API_URL}/confirm/approval/${candidateId}/true`);
        //     })
        //   );
