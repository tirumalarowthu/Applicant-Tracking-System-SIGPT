/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components 
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/avatar.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { object } from "prop-types";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";



export default function data() {
  const [candidateList, setCandidateList] = useState([]);
  // const eval_email = location.state?.email;
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true)


  const handleEvaluateCandidate = (item) => {
    // console.log(item.email,"email")

    if (item.testStatus === "Test Not Taken" || item.testStatus === "Test Cancelled" ||item.testStatus === "Test Taking") {
      toast.warn(`${item.testStatus}. Evaluation cannot be performed.`, 
      {
        style: {
          fontSize: '16px', 
        },
      }
    )
      navigate('/Candidate-List')
      return;
    }
    const state = { email: item.email, testStatus: item.testStatus, result: item.result, area:item.area };
    // console.log(state)
    navigate(`/Dashboard/Candidate-List/${item.email}`, { state });
  };


  useEffect(() => {   
    getCandidateList();
  }, []);
  const getCandidateList = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/candidates?filter=isApproved:true`);
        // console.log(response.data.results) 
        setLoading(false)

        const formatedTableData = response.data.results.map((item,index) => 
        { 
            return  {
                s_no : <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {index+1}
                      </MDTypography>,
                name: <Author image={team4} name={item.name} email={item.email} />,
                // area: (
                //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                //     {item.area}
                //   </MDTypography>
                // ),
                area: (
                  item.area.map((area, index) => (
                    <MDTypography
                      key={index} // Assign a unique key for each element
                      component="a"
                      href="#"
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                    >
                      {area} <br/>
                    </MDTypography>
                  ))
                ),
                status: (
                    <MDBox ml={-1}>
                      <MDTypography component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium">{item.testStatus}</MDTypography>
                        {/* {item.testStatus === 'Evaluated' ? (
                            <MDBadge badgeContent={item.testStatus} color="" variant="gradient" size="sm" />
                        ) : (
                            <MDBadge badgeContent={item.testStatus} color="" variant="gradient" size="sm" />
                        )} */}
                    </MDBox>
                ),
                Marks: (
                  <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  { item.testStatus === "Evaluated" || item.testStatus === "Test Taken" ? (
                    `${item.totalScore}/${item.totalQuestions}`
                  ) : (
                    ""
                  )}
                </MDTypography>
                
                ),
                action: (
                  <>
                    <MDTypography style={{ display:"flex"}}>
                        <MDBox key={item.id}
                            style ={{
                            cursor: "pointer"
                            }} 
                            ml={-1}>
                            
                            <Link to={{ pathname: `/Candidate-List/Edit/${item.email}`, state: { item }}}  >
                                <MDBadge sx={{textDecoration: 'underline', color:'#FFFFFF'}}  badgeContent="Edit" color="info" variant="gradient" size="sm" />
                            </Link>
                        </MDBox>
                       
                          <MDBox key={item.id}
                          onClick={(e) => 
                              handleEvaluateCandidate(item)
                          }
                          style ={{cursor: "pointer"}} ml={0}>
                            {  item.testStatus === "Evaluated" ?
                              <MDBadge sx={{textDecoration: 'underline', color:'#FFFFFF'}} badgeContent={item.testStatus === "Evaluated" ?"Re-Evaluate":"Evaluate"} color={item.testStatus === "Evaluated" ?"primary" :"secondary"} variant="gradient" size="sm" /> :
                              <MDBadge  sx={{textDecoration: item.testStatus === "Test Taken"?'underline':"", color:'#FFFFFF'}}  badgeContent={item.testStatus === "Test Not Taken" ?"Evaluate":"Evaluate"} disabled color={item.testStatus === "Test Not Taken" ?"warning" :"c"} variant="gradient" size="sm" /> 

                            }
  
                      </MDBox>
                                                    
                    </MDTypography>
                  </>
                ),
                Result: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {item.result}
                  </MDTypography>
                )
              }
        }
      
  
  )

        setCandidateList(formatedTableData);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  
//   console.log(candidateList)
  return {
    
    columns: [
      { Header: "S.No", accessor: "s_no", align: "left", width: "10%" },
      { Header: "Name", accessor: "name", width: "25%", align: "left" },
      { Header: "Area", accessor: "area", width: "", align: "left" },

    //   { Header: "Email", accessor: "email", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      // { Header: "Registered ", accessor: "registered_date", align: "center" },
      { Header: "Action", accessor: "action", align: "left" },
      { Header: "Marks", accessor: "Marks", align: "center" },
      { Header: "Result", accessor: "Result", align: "center" },
    ],

    rows: candidateList,
    loading,
  };
}


// const serverdata = [
//     {
//       author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
//       function: <Job title="Executive" description="Projects" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           19/09/17
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
//       function: <Job title="Programator" description="Developer" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           24/12/08
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
//       function: <Job title="Manager" description="Executive" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           04/10/21
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
//       function: <Job title="Programator" description="Developer" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           14/09/20
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//   ]
  // const filterdata = serverdata.map((item) =>
  //       {
  //           return  {
  //               author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
  //               function: <Job title="Programator" description="Developer" />,
  //               status: (
  //                 <MDBox ml={-1}>
  //                   <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
  //                 </MDBox>
  //               ),
  //               employed: (
  //                 <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //                   14/09/20
  //                 </MDTypography>
  //               ),
  //               action: (
  //                 <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //                   Edit
  //                 </MDTypography>
  //               ),
  //             }
  //       }
  
  // )
  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  