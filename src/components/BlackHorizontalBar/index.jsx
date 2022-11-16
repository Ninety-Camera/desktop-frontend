import { findByLabelText } from "@testing-library/react";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText([500]),
  backgroundColor: "#6C63FF",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#5C63FF",
  },
}));

export default function BlackHorizontalBar(props) {
  const { title, buttonText, buttonAction, showButton = true } = props;
  return (
    <Box data-testid="blackHorizontalBar" sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar>
          {showButton && (
            <IconButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#6C63FF" , color: "white"}}
              onClick={buttonAction}
            >
              {buttonText}
            </IconButton>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
