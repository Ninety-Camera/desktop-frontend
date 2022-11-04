import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCameraForm from "../AddCameraForm";
import Link from "@mui/material/Link";

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddCamera = () => {};

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}
        sx={{ color: "#6C63FF" }}
      >
        <MenuItem component={AddCameraForm} onClick={handleClose}>ADD CAMERA</MenuItem>
        
        <MenuItem
          onClick={handleClose}
          component={Link}
          sx={{ color: "#6C63FF" }}
          href="../"
        >
          LOG OUT
        </MenuItem>
      </Menu>
    </div>
  );
}
