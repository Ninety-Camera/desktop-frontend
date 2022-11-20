import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import AddCameraForm from "../AddCameraForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AddCameraForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
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
      >
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <AddCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add new camera</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
