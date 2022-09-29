import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import { ADMIN_SECTIONS, DASHBOARD_ROUTES } from "../../constants";

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
