import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
export default function Hero() {
  const vpn =
    "https://www.ucdenver.edu/docs/default-source/offices-oit-documents/how-to-documents/vpnaccess.pdf?sfvrsn=e96ca2ba_4";
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          pt: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          container
          spacing={1}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            AI&nbsp;Student Association&nbsp;
          </Typography>
          <Typography
            fontSize={18}
            sx={{
              textAlign: "center",
              color: "text.primary",
            }}
          >
            Welcome to the D.E.C.O.Y. Challenge!
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Compete, Learn, and Outsmart AI Models
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            spacing={2}
            useFlexGap
            sx={{ pt: 1, width: "100%" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                fontSize: "1.2rem",
              }}
              href="http://decoychallenge.ucdenver.pvt"
            >
              Challenge Website
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                fontSize: "1.2rem",
              }}
              href="https://discord.com/invite/VG28u28bwK"
            >
              Discord Server
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              pt: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Accesing the Website
            </Typography>
            <Typography variant="body1" fontSize={18} lineHeight={1.8}>
              <ul style={{ paddingLeft: "30px" }}>
                <li>
                  <strong>On Campus: </strong>
                  Please connect to <strong>"AurariaNet"</strong>
                  or <strong>"CU Denver"</strong> Wifi, not guest.
                </li>
                <li>
                  <strong>Off Campus: </strong>
                  Please connect to <strong>VPN</strong> if you are off-campus.{" "}
                  <a href={vpn}> VPN Guide</a>{" "}
                </li>
                <li>
                  <strong>Discord: </strong>
                  Join our discord: For more questions and help, join our
                  Discord server.
                </li>
              </ul>
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              <strong>Certificate Warning ?</strong>
              {""} <WarningAmberIcon />
            </Typography>
            <Typography variant="h7" sx={{}}>
              {" "}
              Some users may see a certificate warning when using HTTPS. Feel
              free to proceed with accepting the certification; it is safe!
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
