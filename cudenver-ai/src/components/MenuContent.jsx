import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import ForumIcon from "@mui/icons-material/Forum";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Divider from "@mui/material/Divider";

const mainListItems = [
  {
    text: "Register for Challenge",
    icon: <HowToRegRoundedIcon />,
    link: "https://forms.office.com/r/Xb3MZjTibT",
  },
  {
    text: "Become a Member",
    icon: <PersonAddIcon />,
    link: "https://forms.office.com/r/Wk4fW5eRba",
  },
  {
    text: "Learn More",
    icon: <AssignmentRoundedIcon />,
    link: "https://ucdenver.campuslabs.com/engage/organization/aisa",
  },
  {
    text: "Email Us",
    icon: <EmailIcon />,
    link: "mailto:aisa@ucdenver.edu",
  },
  {
    text: "Discord",
    icon: <ForumIcon />,
    link: "https://discord.gg/VG28u28bwK",
  },
  {
    text: "Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/cudenver.ai",
  },
  {
    text: "LinkedIn",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/company/cudenver-ai/",
  },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemButton
                component="a"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "text.primary",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(100, 108, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "text.primary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                />
              </ListItemButton>
            </ListItem>
            {index === 0 && <Divider />} {index === 3 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
