import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Button, Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import "@fontsource/inter";
// import {useNavigate} from "react-router-dom";

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
  // const navigate = useNavigate();
  const { phrase } = props;
  return (
    <Box
      style={{
        height: 70,
        backgroundColor: "#2F2E41",
        color: "white",
        fontSize: 30,
        fontFamily: "inter",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: 48,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: "0%",
        width: "100%",
        paddingLeft: 50,

        // justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          my: 2,
          fontSize: 30,
          fontFamily: "inter",
          fontStyle: "normal",
          textAlign: "left",
          flexGrow: 1,
          fontWeight: 700,
        }}
      >
        {phrase}
      </Typography>
      <CustomButton
        type="submit"
        variant="contained"
        size="large"
        sx={{ backgroundColor: "#6C63FF" }}
      >
        Register
      </CustomButton>
    </Box>
  );
}
