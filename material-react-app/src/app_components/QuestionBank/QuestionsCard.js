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

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsBarChart configurations
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
import { Link } from "react-router-dom";

function QuestionsCard({ color, title, description, date, area, chart, image }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <Link to={`/add-questions/${area}`} >
        <MDBox padding="1rem">
          {useMemo(
            () => (
              <MDBox
                variant="gradient"
                bgColor={color}
                borderRadius="16px"
                coloredShadow={color}
                py={0}
                pr={0}
                mt={-5}
                height="12.5rem"
              >
                <img width="100%" height="100%" src={image} />
                {/* <Chart type="bar" data={data} options={options} /> */}
              </MDBox>
            ),
            [chart, color]
          )}
          <MDBox pt={3} pb={1} px={1}>
            <MDTypography variant="h6" textTransform="capitalize">
              {title}
            </MDTypography>
            <MDTypography component="div" variant="button" color="text" fontWeight="light">
              {description}
            </MDTypography>
            <Divider />
            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                {/* <Icon>schedule</Icon> */}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="light">
                {/* {date} */}
                To add questions : <Link to={`/add-questions/${area}`} style={{ color: "GrayText", fontFamily: "initial" }}>Click Here</Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Link>
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
QuestionsCard.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
QuestionsCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default QuestionsCard;
