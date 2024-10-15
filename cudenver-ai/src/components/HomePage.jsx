import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import video from "../assets/demo.mp4";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: "lg" }}>
      <Grid container spacing={2} columns={12}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary", justifyContent: "center" }}
        >
          Challenge Demo
        </Typography>
        <Grid size={{ xs: 12, md: 12 }}>
          <SyledCard sx={{ height: "100%" }}>
            <CardMedia
              component="video"
              image={video}
              controls
              alt="Demo Video"
              sx={{ objectFit: "cover" }}
            />
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
