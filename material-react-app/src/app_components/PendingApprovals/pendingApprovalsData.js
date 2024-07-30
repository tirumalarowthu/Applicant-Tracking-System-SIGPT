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
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RejectModel from "./RejectModel";
 
export default function data() {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading,setLoading] = useState(true)
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [checkedCandidates, setCheckedCandidates] = useState([])

  //for handling pending approvals : 
  const handleApprovals = async (id, decide, name) => {
    if (!decide) {
      const confirmMessage = `Do you want to reject "${name}"?`;
      if (window.confirm(confirmMessage)) {
        try {
          await axios.patch(`${process.env.REACT_APP_API_URL}/confirm/approval/${id}/${decide}`);
          window.location.reload(false);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        await axios.patch(`${process.env.REACT_APP_API_URL}/confirm/approval/${id}/${decide}`)
        .then(()=>{
          toast.success("Candidate approved successfully.")
        })
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
const handleCandidateSelection = (e, candidateId) => {
  const isChecked = e.target.checked;
  setSelectedCandidates(prevSelected => {
    if (isChecked) {
      // Add candidateId if it's not already selected
      if (!prevSelected.includes(candidateId)) {
        return [...prevSelected, candidateId];
      }
    } else {
      // Remove candidateId if it's already selected
      return prevSelected.filter(id => id !== candidateId);
    }
    return prevSelected; // No change if candidateId is already in the list and unchecked
  });
};
  
  // console.log(checkedCandidates)
  useEffect(() => { 
    getPendingApprovals();
  }, []);
  const getPendingApprovals = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pending/approvals`);
        // console.log(response.data)
        setCheckedCandidates(response.data.map((item) => item._id))
        // console.log(checkedCandidates)
        setLoading(false)
        const formatedTableData = response.data.map((item,index) =>
        {
            return  {
                s_no : <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {index+1}
                      </MDTypography>,
                select: (
                  <input
                    type="checkbox"

                    color="blue"
                    onChange={(e) => handleCandidateSelection(e, item._id)}
                    // checked={selectedCandidates.includes(item._id)}
                    name="myCheckbox" value="isChecked"
                  />
                ),
                // selected: (
                //   <input
                //     type="checkbox"
                //     color="blue"
                //     // onChange={(e) => handleCandidateSelection(e, item._id)}
                //     // checked={selectedCandidates.includes(item._id)}
                //     name="myCheckbox" value="isChecked"
                //   />
                // ),
                name: <Author image={team4} name={item.name} email="" />,
                email:( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {item.email}
              </MDTypography>),
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
                // area: (
                //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                //   {item.area}
                // </MDTypography>
                //   // <MDBox ml={-1}>
                //   //   <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
                //   // </MDBox>
                // ),
                registered_date: (
                  <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {new Date(item.createdAt).toDateString()}
                  </MDTypography>
                ),
                action: (
                  <>
                   {/* <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    Edit
                  </MDTypography> */}
                  <MDTypography
                    style={{
                      display:"flex"
                    }}
                  >
                    <MDBox 
                    
                    ml={1}>
                      <Link to ={`/Candidate-List/Edit/${item.email}`}>
                    <MDBadge  badgeContent="Edit" color="secondary"  variant="gradient" size="sm" />

                      </Link>
                  </MDBox>
                  <MDBox 
                    onClick={() =>
                            handleApprovals(item._id, true, item.name)
                          }
                    style ={{
                      cursor: "pointer"
                    }} 
                    ml={1}>
                    <MDBadge  badgeContent="Approve" color="info" variant="gradient" size="sm" />
                  </MDBox>
                  <RejectModel name={item.name} id={item._id} sx={{margin:'0px'}}/>
                  {/* <MDBox 
                     onClick={() =>
                      handleApprovals(item._id, false, item.name)
                      }
                      style ={{
                        cursor: "pointer"
                      }} 
                      ml={0}>
                    <MDBadge badgeContent="Reject" color="primary" variant="gradient" size="sm" />
                  </MDBox> */}
                  </MDTypography>
                  </>
                 
                ),
                
              }
        }
  
  )

    setPendingApprovals(formatedTableData);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
//   const handleCandidateSelection = (e, candidateId) => {
//     const isChecked = e.target.checked;
//     if (isChecked) {
//         setSelectedCandidates((prevSelected) => [...prevSelected, candidateId]);
//     } else {
//         setSelectedCandidates((prevSelected) => prevSelected.filter((id) => id !== candidateId));
//     }
// };
const handleSelectAll = (e) => {
  const isChecked = e.target.checked;
  setSelectedCandidates(isChecked ? checkedCandidates : []);
  // console.log(selectedCandidates)
  // Update the checked state of each candidate's checkbox
  const checkboxes = document.querySelectorAll('input[name="myCheckbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
};

  const SelectHeader = () => (
    <input
      type="checkbox"
      onChange={handleSelectAll}
      value="isChecked"

      checked={selectedCandidates.length === checkedCandidates.length}
    />
  );
  
  
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

  
  // console.log(pendingApprovals)
  return {
    columns: [
      // { Header: SelectHeader, accessor: "select", width: "30px", align: "left" },
      { Header: "S.No", accessor: "s_no", align: "left", width: '30px' },
      { Header: "Name", accessor: "name", width: "100px", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Area", accessor: "area", align: "center" },
      { Header: "Registered ", accessor: "registered_date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: pendingApprovals,
    loading,
    selectedCandidates,
    checkedCandidates,
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

  