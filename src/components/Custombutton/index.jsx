import React from "react";
import "@fontsource/inter";
import { Button } from "@mui/material";



export default function CustomButton(props) {
    const { color, hoverColor, phrase } = props;
  return (
    <Button
      sx={{
        backgroundColor: {color},
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: {hoverColor},
        },
      }}
    >
      {phrase}
    </Button>
  );
}
