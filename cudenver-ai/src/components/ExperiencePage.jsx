import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import cse from "../assets/cse.png";
import club from "../assets/club.png";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export default function ExperiencePage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "1700px",
          lg: "1900px",
          xl: "2100px",
        },
        mx: "auto",
        px: 2,
      }}
    >
      <Stack
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid item size={{ xs: 12, sm: 12, lg: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            AI Student Association
          </Typography>
          <Typography variant="body1" fontSize={18} lineHeight={1.8}>
            The AI Student Association at CU Denver is a student-led
            organization dedicated to exploring the applications of artificial
            intelligence, data science, and machine learning. We provide a
            collaborative platform for students to connect, engage, and grow
            through hands-on projects, coding challenges, and research
            initiatives. Our mission is to bridge the gap between theory and
            practice by organizing events such as hackathons, workshops, and
            technical talks that equip students with the skills needed to excel
            in the AI industry. We focus on fostering an environment of
            innovation, collaboration, and professional development, ensuring
            that our members are prepared to tackle real-world challenges and
            contribute meaningfully to the field of AI. Whether you’re an
            experienced AI enthusiast or just getting started, the AI Student
            Association offers opportunities for learning, networking, and
            advancing your AI journey.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, mt: 4 }}>
            This challenge was designed, and engineered by our members.
            Interested in how we did it?
          </Typography>{" "}
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, lg: 4 }}>
          <SyledCard variant="outlined">
            <Box sx={{ height: "100%", alignItems: "center", p: 2 }}>
              <CardMedia
                component="img"
                image={"https://picsum.photos/1200/600?image=998"}
                alt={"Placeholder"}
                sx={{ width: 80, height: 80, borderRadius: "25%" }}
              />
              <Typography variant="h6">HoLA</Typography>
              <Typography variant="body2">HoLA</Typography>
              <a href={"link"} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </a>
            </Box>
          </SyledCard>
        </Grid>

        <Grid
          container
          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          sx={{
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Our Partners
            </Typography>
          </Box>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={cse}
              alt="College of ..."
              sx={{ width: 129, height: 100 }}
            />
          </Grid>
          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={club}
              alt="AI Student Association"
              sx={{ width: 129, height: 100 }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
