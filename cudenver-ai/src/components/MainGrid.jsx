import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomizedDataGrid from "./CustomizedDataGrid";
import PageViewsBarChart from "./PageViewsBarChart";
import PageViewsBarChartTen from "./PageViewsBarChartTen.jsx";
import SessionsChart from "./SessionsChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import StatCard from "./StatCard";
import HighlightedCard from "../components/HighlightedCard.jsx";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

export default function MainGrid({ setCurrentPage }) {
  const [data, setData] = useState([
    {
      title: "Success Rate",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0.951, 0.065, 0, 0.072, 0.942, 0.945, 0.991,
        1.0, 0.993, 0.997, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.999, 1.0, 1.0, 1.0,
        1.0,
      ],
      interval: "daily",
      trend: "down",
    },
    {
      title: "Perturbation Magnitude",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1.351, 0.0029, 0, 0.0033, 1.3514, 1.3512,
        1.466, 4.9993, 31.0403, 1.5194, 13.09, 10.0055, 3.3926, 13.0634,
        18.4881, 4.0322, 2.3623, 10.0027, 3.0595, 3.857, 7.2268,
      ],
      interval: "daily",
      trend: "down",
    },
    {
      title: "Visual Similarity",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 0.9989, 1.0, 1.0, 1.0, 1.0, 0.9978, 1.0, 0.9978, 1.0,
      ],
      interval: "daily",
      trend: "down",
    },
    {
      title: "Average Confidence",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9856, 0.7214, 0, 0.6959, 0.9853, 0.985,
        0.9906, 0.98, 0.9927, 0.9957, 0.9962, 0.9962, 0.9835, 0.9847, 0.9996,
        0.9833, 0.9748, 0.9848, 0.9957, 0.9959, 0.9982,
      ],
      interval: "daily",
      trend: "down",
    },
    {
      title: "Confidence Gap",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, -0.0538, -0.534, 0, -0.4593, -0.0578, 0.1588,
        -0.056, -0.0062, 0.1729, 0.3932, 0.4256, 0.0291, 0.3461, 0.4264, 0.4026,
        0.5083, -0.0215, 0.3104, 0.1991, 0.254, 0.3999,
      ],
      interval: "daily",
      trend: "down",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return loading ? (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.6s ease",
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "1700px",
          lg: "1900px",
          xl: "2100px",
        },
        mx: "auto",
        px: 2,
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: "100%" }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Submission Guidelines
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Ensure your submission follows these guidelines:
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>File format</strong>: .pkl
                  </li>
                  <li>
                    <strong>Maximum file size</strong>: 100MB
                  </li>
                  <li>For more details check out the problem page.</li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Upload Your Submission
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Please upload your file in .pkl format,
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HighlightedCardDisabled />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                *All metrics below are updated every hour.
              </Typography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: "100%" }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Key Dates
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Keep the following dates in mind
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>Challenge Start:</strong> October 1st, 2024
                  </li>
                  <li>
                    <strong>Submission Deadline:</strong> October 30th, 2024,
                    11:59 PM
                  </li>
                  <li>
                    <strong>CU Denver Data Science and AI Symposium:</strong>{" "}
                    November 1st, 2024.{" "}
                    <a
                      style={{
                        cursor: "pointer",
                        borderBottom: "1px solid #3f51b5",
                      }}
                      href="https://datascience.ucdenver.edu/events/symposium"
                    >
                      DSAI
                    </a>
                  </li>
                  <li>
                    <strong>Winners Notified:</strong> October 30th, 2024. Their
                    solutions will be presented during the symposium.
                  </li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Need Help?
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                If you encounter any issues, have questions, or need help,
                please use one of the following methods:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Challenge Description{" "}
                  <a
                    onClick={() => handlePageChange("problem")}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                  >
                    Challenge
                  </a>
                </li>
                <li>
                  Ask us on{" "}
                  <a
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                    href="https://discord.gg/VG28u28bwK"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  Email us at{" "}
                  <a
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                    href="mailto:aisa@ucdenver.edu"
                  >
                    aisa@ucdenver.edu
                  </a>
                </li>
              </ul>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Box sx={{ textAlign: "center", mb: 2 }} align={"center"}>
          <Typography component="h2" variant="h4">
            Loading metrics...
          </Typography>
        </Box>
      </Grid>
    </Box>
  ) : (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.6s ease",
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "1700px",
          lg: "1900px",
          xl: "2100px",
        },
        mx: "auto",
        px: 2,
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: "100%" }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Submission Guidelines
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Ensure your submission follows these guidelines:
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>File format</strong>: .pkl
                  </li>
                  <li>
                    <strong>Maximum file size</strong>: 100MB
                  </li>
                  <li>For more details check out the problem page.</li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Upload Your Submission
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Please make sure of the following:
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    Use the same <strong>team name</strong> in all submissions.
                  </li>
                  <li>
                    Your Tensor has the following shape:{" "}
                    <strong>[1000, 3, 32, 32]</strong>.
                  </li>
                </ul>
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HighlightedCard />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                *All metrics below are updated every hour. Last update:{" "}
                {"11:59:59 PM"}
              </Typography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: "100%" }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Key Dates
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Keep the following dates in mind
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>Challenge Start:</strong> October 1st, 2024
                  </li>
                  <li>
                    <strong>Submission Deadline:</strong> October 30th, 2024,
                    11:59 PM
                  </li>
                  <li>
                    <strong>CU Denver Data Science and AI Symposium:</strong>{" "}
                    November 1st, 2024.{" "}
                    <a
                      style={{
                        cursor: "pointer",
                        borderBottom: "1px solid #3f51b5",
                      }}
                      href="https://datascience.ucdenver.edu/events/symposium"
                    >
                      DSAI
                    </a>
                  </li>
                  <li>
                    <strong>Winners Notified:</strong> October 30th, 2024. Their
                    solutions will be presented during the symposium.
                  </li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Need Help?
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                If you encounter any issues, have questions, or need help,
                please use one of the following methods:
              </Typography>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Challenge Description{" "}
                  <a
                    onClick={() => handlePageChange("problem")}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                  >
                    Challenge
                  </a>
                </li>
                <li>
                  Ask us on{" "}
                  <a
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                    href="https://discord.gg/VG28u28bwK"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  Email us at{" "}
                  <a
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #3f51b5",
                    }}
                    href="mailto:aisa@ucdenver.edu"
                  >
                    aisa@ucdenver.edu
                  </a>
                </li>
              </ul>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ sm: 12, md: 8 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 4 }}>
          <PageViewsBarChart />
        </Grid>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography component="h2" variant="h4">
            Best Overall Metrics
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[0].title}
              value={Math.max(...data[0].data.slice(-30)).toString()}
              interval={data[0].interval}
              trend={data[0].trend}
              data={data[0].data.slice(-30)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[1].title}
              value={Math.max(...data[1].data.slice(-30)).toString()}
              interval={data[1].interval}
              trend={data[1].trend}
              data={data[1].data.slice(-30)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[2].title}
              value={Math.max(...data[2].data.slice(-30)).toString()}
              interval={data[2].interval}
              trend={data[2].trend}
              data={data[2].data.slice(-30)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[3].title}
              value={Math.max(...data[3].data.slice(-30)).toString()}
              interval={data[3].interval}
              trend={data[3].trend}
              data={data[3].data.slice(-30)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[4].title}
              value={Math.max(...data[4].data.slice(-30)).toString()}
              interval={data[4].interval}
              trend={data[4].trend}
              data={data[4].data.slice(-30)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid>
            <Box sx={{ textAlign: "left", mb: 2 }}>
              <Typography component="h2" variant="h4">
                All Submissions
              </Typography>
            </Box>
            <CustomizedDataGrid />
          </Grid>
        </Grid>
        <Grid size={{ sm: 12, md: 12 }}>
          <PageViewsBarChartTen />
        </Grid>
      </Grid>
    </Box>
  );
}

MainGrid.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
