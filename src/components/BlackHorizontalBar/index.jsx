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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#2F2E41" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showButton && (
            <CustomButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#6C63FF" }}
              onClick={buttonAction}
            >
              {buttonText}
            </CustomButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
