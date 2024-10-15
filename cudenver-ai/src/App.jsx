import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppNavbar from "./components/AppNavbar";
import AppTheme from "../theme/AppTheme.jsx";

import Stack from "@mui/material/Stack";
import Copyright from "./components/Copyright.jsx";
import Hero from "./components/Hero.jsx";
// import ExperiencePage from "./components/ExperiencePage.jsx";
//{currentPage === "experience" && <ExperiencePage />}
import HomePage from "./components/HomePage.jsx";
import { Box } from "@mui/material";

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = React.useState("home");

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <AppNavbar setCurrentPage={setCurrentPage} />
        {/* Main content */}
        <Box
          id="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundImage:
              theme.palette.mode === "cd "
                ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsla(210, 100%, 16%, 0.6), transparent)"
                : "radial-gradient(ellipse 80% 50% at 50% -20%, hsla(210, 100%, 90%, 0.6), transparent)",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Hero />
            {currentPage === "home" && <HomePage />}
            <Copyright sx={{ my: 4 }} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
