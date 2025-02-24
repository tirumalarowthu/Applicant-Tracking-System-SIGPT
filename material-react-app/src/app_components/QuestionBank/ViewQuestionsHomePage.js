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

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import DomainCard from "./DomainCard";
import vlsiImg from "./vlsi.jpg"
import vlsi_3 from "./vlsi_3.jpg"
function ViewQuestionsHomePage() {
  const { sales, tasks } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="info"
                  title="VLSI_FRESHER_1 QUESTIONS"
                  description="VLSI_FRESHER_1"
                  area='VLSI_FRESHER_1'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  // image="https://www.einfochips.com/blog/wp-content/uploads/2018/12/how-rtos-for-embedded-systems-powers-the-internet-of-things-featured01.jpg"
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
                <DomainCard
                  color="info"
                  title="VLSI_FRESHER_2 QUESTIONS"
                  description="VLSI_FRESHER_2"
                  area='VLSI_FRESHER_2'
                  image={vlsiImg}
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
                <DomainCard
                  color="info"
                  title="VLSI_FRESHER_3 QUESTIONS"
                  description="VLSI_FRESHER_3"
                  area='VLSI_FRESHER_3'
                  image={vlsi_3}
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
                <DomainCard
                  color="info"
                  title="UNIX QUESTIONS"
                  description="UNIX"
                  area='UNIX'
                  image="https://i.pinimg.com/originals/30/8d/5c/308d5ca367a58714a3e940ad16153ccd.png"
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="info"
                  title="PYTHON QUESTIONS"
                  description="PYTHON"
                  area='PYTHON'
                  image="https://devblogs.microsoft.com/python/wp-content/uploads/sites/12/2018/08/pythonfeature.png"
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="info"
                  title="EMBEDDED QUESTIONS"
                  description="EMBEDDED"
                  area='EMBEDDED'
                  image="https://www.silicon-power.com/web/images/industrial/application_banner_mobile_07.jpg"
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="info"
                  title="EMBEDDED QUESTIONS SET-2"
                  description="EMBEDDED"
                  area='EMBEDDED_2'
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSz6X6cPZFD3ILawyhoz6J7BbL0rtdYJrWJg&s"
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewQuestionsHomePage;

{/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Registered"
                count={100}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Test Taken"
                count="80"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Evaluated"
                count="70"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Pending"
                count="10"
                percentage={{
                  color: "",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> */}
{/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
{/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="success"
                  title="VLSI_FRESHER_3 QUESTIONS"
                  description="VLSI_FRESHER_3"
                  area='VLSI_FRESHER_3'
                  image="https://www.einfochips.com/blog/wp-content/uploads/2018/12/how-rtos-for-embedded-systems-powers-the-internet-of-things-featured01.jpg"
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
                <DomainCard
                  color="success"
                  title="VLSI_FRESHER_4 QUESTIONS"
                  description="VLSI_FRESHER_4"
                  area='VLSI_FRESHER_4'
                  image="https://www.einfochips.com/blog/wp-content/uploads/2018/12/how-rtos-for-embedded-systems-powers-the-internet-of-things-featured01.jpg"
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
                <DomainCard
                  color="info"
                  title="VLSI EXPERIENCE QUESTIONS"
                  description="Experience"
                  date="just updated"
                  area='VLSI'
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWaZFag5uo9qPSGnKKtUYpBTvZqqQBaE3RTok3jL7PQ&s"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DomainCard
                  color="success"
                  title="EMBEDED QUESTIONS"
                  description="Fresher/Experience"
                  area='EMBEDDED'
                  image="https://www.einfochips.com/blog/wp-content/uploads/2018/12/how-rtos-for-embedded-systems-powers-the-internet-of-things-featured01.jpg"
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
                <DomainCard
                  color="dark"
                  title="SOFTWARE"
                  description="React/Node/Python"
                  area='SOFTWARE'
                  date="just updated"
                  image="https://www.coderus.com/wp-content/uploads/2020/11/different-types-of-software-coderus-branded-image.jpg"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}