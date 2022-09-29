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
        justifyContent: "center",
        borderRadius: 4,
        justifyItems: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack direction="row" spacing={1}>
        <div style={{ flex: "left", justifyContent: "center", padding: 5, fontFamily: 'inter', color: "white", fontSize: 15}}>
          {props.date + " at " + props.time}
        </div>
        <div style={{ flex: "right", justifyContent: "center" }}>
          <Button
            sx={{
              backgroundColor: "#6C63FF",
              "&:hover": {
                backgroundColor: "#5C63FF",
              },
              height: "80%",
              color: "white",
              fontFamily: "Inter",
            }}
            onClick = {()=>navigate("/viewNotification")}
          >
            View
          </Button>
        </div>
      </Stack>
    </div>
  );
}
