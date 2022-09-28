import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Button, Box, Divider, Typography } from "@mui/material";
import "@fontsource/inter";
// import {useNavigate} from "react-router-dom";

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
        paddingLeft: 50,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: "0%",
        width: "100%",
        textAlign: "center",
        
        // justifyContent: "center",
      }}
    >
      <Typography  sx={{ my: 2 , fontSize: 30,
        fontFamily: "inter",
        fontStyle: "normal",
        fontWeight: 700,}}>
      {phrase}
      </Typography>
      

      {/* <Divider/>
      <Button
        variant="contained"
        sx={{
          background: "#6C63FF",
          width: "8%",
          height: "60%",
          align: "right",
        }}
        // onClick={() => navigate("/dashboard")}
      >
        Log out
      </Button> */}
    </Box>
  );
}
