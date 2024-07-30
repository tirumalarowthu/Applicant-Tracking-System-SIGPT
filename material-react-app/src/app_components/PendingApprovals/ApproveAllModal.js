import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';


function ApproveAllOpenModal({ open, onClose, onChangeResult, total_candidates, checkedCandidates }) {
    const [isLoading, setIsLoading] = useState(false)
    const handleResultChange = () => {
        // onChangeResult(result);
        onClose();
    };
    const ApproveAllCandidates = async () => {
        try {
          await Promise.all(
            checkedCandidates.map(async (candidateId) => {
              setIsLoading(true)
              // console.log(email.item_id, "item")
              await axios.patch(`${process.env.REACT_APP_API_URL}/confirm/approval/${candidateId}/true`);
            })
          );
          onClose()
          // window.location.reload(false);
          toast.success("Candidates approved successfully.", {
            onClose: () => {
                setIsLoading(false);
            }
        });
        await new Promise(resolve => setTimeout(resolve, 3000));
          setIsLoading(false)
          window.location.reload(false);
        } catch (error) {
          toast.warn("Failed to Approve candidates.", {
            style:{
                fontSize: '16px',
            }
          })
          console.log(error);
          window.location.reload(false);
         
        }
      };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: "absolute",borderRadius:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                <MDBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <MDBox>
                    <MDTypography variant="h6" component="h2" style={{color:'black'}}>Do you really want to approve all the candidates?</MDTypography>
                    <br/>
                    <MDTypography variant="h6" style={{color:'black'}}>Total No.of candidates: {total_candidates}</MDTypography>
                    </MDBox>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </MDBox>
                {/* <MDTypography variant="h6" mt={2}>Change Result : </MDTypography> */}
                <MDBox sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                    <MDButton sx={{marginRight: '10px'}} variant="contained" color="success" onClick={() => ApproveAllCandidates()} disabled={isLoading}>{isLoading? "Approving..." : "Yes" }</MDButton>
                    {/* <MDButton variant="contained" color="warning" onClick={() => handleResultChange("On Hold")}>On Hold</MDButton> */}
                    <MDButton variant="contained" color="error" onClick={() => handleResultChange()}>No</MDButton>
                    {/* <Button variant="contained" onClick={onClose}>Cancel</Button> */}
                </MDBox>
            </Box>
        </Modal>
    );
}

function ApproveAllModal({ total_candidates, checkedCandidates }) {
    const [showModal, setShowModal] = useState(false);
    const { email } = useParams()
    // console.log(total_candidates)
    // console.log(checkedCandidates)
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleChangeResult = async (result) => {
        // Implement logic to update candidate result
        try {
            // await axios.post(`${process.env.REACT_APP_API_URL}/update/TestResult/${email}`, { result })
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
            <MDButton onClick={openModal} sx={{textDecoration :"underline",marginRight:'10px'}} variant="contained" color="info" >
                Approve All
            </MDButton>
            <ApproveAllOpenModal open={showModal} total_candidates={total_candidates} checkedCandidates={checkedCandidates} onClose={closeModal} onChangeResult={handleChangeResult} />
        </MDBox>
    );
}

export default ApproveAllModal;
