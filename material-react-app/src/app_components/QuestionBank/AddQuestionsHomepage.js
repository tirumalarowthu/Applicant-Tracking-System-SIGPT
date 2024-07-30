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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import vlsi_3 from "./vlsi_3.jpg"
// Dashboard components
import QuestionsCard from "./QuestionsCard";
import vlsiImg from "./vlsi.jpg"
import MDTypography from "components/MDTypography";

function AddQuestionsHomepage() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_1"
                  description="Fresher-1"
                  date="just updated"
                  area='VLSI_FRESHER_1'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="success"
                  title="VLSI FRESHER_2"
                  description="Fresher-2"
                  date="just updated"
                  area='VLSI_FRESHER_2'
                  image={vlsiImg}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <QuestionsCard
                  color="success"
                  title="VLSI FRESHER_3"
                  description="Fresher-3"
                  date="just updated"
                  area='VLSI_FRESHER_3'
                  image={vlsi_3}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="info"
                  title="UNIX"
                  description="Add UNIX Questions"
                  date="just updated"
                  area='UNIX'
                  image="https://i.pinimg.com/originals/30/8d/5c/308d5ca367a58714a3e940ad16153ccd.png"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="info"
                  title="PYTHON"
                  description="Add PYTHON Questions"
                  date="just updated"
                  area='PYTHON'
                  image="https://devblogs.microsoft.com/python/wp-content/uploads/sites/12/2018/08/pythonfeature.png"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="info"
                  title="EMBEDDED"
                  description="Add EMBEDDED Questions"
                  date="just updated"
                  area='EMBEDDED'
                  image="https://www.silicon-power.com/web/images/industrial/application_banner_mobile_07.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>

                <QuestionsCard
                  color="info"
                  title="EMBEDDED"
                  description="Add EMBEDDED SET- 2 Questions"
                  date="just updated"
                  area='EMBEDDED_2'
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSz6X6cPZFD3ILawyhoz6J7BbL0rtdYJrWJg&s"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox>
        <MDTypography sx={{ color: 'tomato', fontStyle: 'bold' }}>"Note: To add a new area, please contact the Admin."</MDTypography>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddQuestionsHomepage;

 {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_3"
                  description="Fresher-3"
                  date="just updated"
                  area ='VLSI_FRESHER_3'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_4"
                  description="Fresher-4"
                  date="just updated"
                  area ='VLSI_FRESHER_4'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI QUESTIONS"
                  description="Fresher/Experience"
                  date="just updated"
                  area ='VLSI'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <QuestionsCard
                  color="success"
                  title="EMBEDED QUESTIONS"
                  description="Fresher/Experience"
                  area='EMBEDDED'
                  image="https://www.tessolve.com/wp-content/uploads/2022/06/embedded-system-micro.jpg"
                //   description={
                //     <>
                //       (<strong>+15%</strong>) increase in today sales.
                //     </>
                //   }
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <QuestionsCard
                  color="dark"
                  title="SOFTWARE"
                  description="Python"
                  area='SOFTWARE'
                  date="just updated"
                  image="https://www.tatvasoft.com/outsourcing/wp-content/uploads/2023/06/Application-Software.jpg"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
