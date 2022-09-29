import { Button } from "@mui/material";
import React from "react";
import { Stack } from "@mui/material";
import Inter from "@fontsource/inter";
import { useNavigate } from "react-router-dom";

export default function NotificationArea(props) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#F50057",
        width: "90%",
        padding: 10,
        justifyContent: "center",
        borderRadius: 4,
        justifyItems: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <div
          style={{
            flex: "left",
            justifyContent: "center",
            padding: 5,
            fontFamily: "inter",
            color: "white",
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          {props.date + " at " + props.time}
        </div>
        <div style={{ flex: "right", justifyContent: "center" }}>
          
          <Button color="primary" variant="contained" onClick = {()=>navigate("/viewNotification")}>
            View
          </Button>
        </div>
      </Stack>
    </div>
  );
}
