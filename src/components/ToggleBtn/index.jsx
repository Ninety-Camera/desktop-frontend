import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export default function ToggleBtn(props) {
  //const [systemState, setSystemState] = useState("RUNNING");

  return (
    <Button
      variant="contained"
      color={props.state === "RUNNING" ? "secondary" : "primary"}
      startIcon={props.state === "RUNNING" ? <StopIcon /> : <PlayArrowIcon />}
      style={{ textTransform: "none" }}
      onClick={() => {
        if (props.state === "RUNNING") {
          props.setState("STOP");
        } else {
            props.setState("RUNNING");
        }
      }}
      data-testid="toggleBtn"
    >
      {props.state === "RUNNING" ? "Stop Monitoring" : "Start Monitoring"}
    </Button>
  );
}
