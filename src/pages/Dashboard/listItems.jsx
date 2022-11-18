import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import { DASHBOARD_ROUTES } from "../../constants";

export default function MainListItems() {
  const navigate = useNavigate();

  function routeToPage(page) {
    navigate(`/dashboard/${page}`);
  }
  return (
    <React.Fragment>
      <ListItemButton onClick={() => routeToPage(DASHBOARD_ROUTES.CAMERA)}>
        <ListItemIcon>
          <OndemandVideoIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Cameras" />
      </ListItemButton>
      <ListItemButton onClick={() => routeToPage(DASHBOARD_ROUTES.INTRUSIONS)}>
        <ListItemIcon>
          <SnowshoeingIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Intrusions" />
      </ListItemButton>
      <ListItemButton
        onClick={() => routeToPage(DASHBOARD_ROUTES.PROCESSEDVIDEOS)}
      >
        <ListItemIcon>
          <VideocamIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Processed Videos" />
      </ListItemButton>
      <ListItemButton onClick={() => routeToPage(DASHBOARD_ROUTES.SETTINGS)}>
        <ListItemIcon>
          <SettingsIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );
}
