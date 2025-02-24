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

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";

// Dashboard components

function ViewQuestionsHomePage() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDTypography>How to use application.</MDTypography>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewQuestionsHomePage;
