import * as React from "react";
import GettingStartedPage from "./pages/GettingStartedPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import OrganizersPage from "./pages/OrganizersPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import AppNavbar, { Toolbar } from "./components/AppNavbar.jsx";
import AppTheme from "../theme/AppTheme.jsx";
import MainGrid from "./components/MainGrid";
import Container from "@mui/material/Container";
import Copyright from "./components/Copyright.jsx";

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = React.useState("home");

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 2,
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AppNavbar setCurrentPage={setCurrentPage} />
        <Toolbar />

        {currentPage === "main" && <MainGrid setCurrentPage={setCurrentPage} />}
        {currentPage === "data" && <GettingStartedPage />}
        {currentPage === "organizers" && <OrganizersPage />}
        {currentPage === "problem" && (
          <ProblemPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      </Container>
      <Copyright sx={{ my: 4 }} />
    </AppTheme>
  );
}
