import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export default function ToggleBtn() {
  const [systemState, setSystemState] = useState("RUNNING");

  return (
    <Button
      variant="contained"
      color={systemState === "RUNNING" ? "secondary" : "primary"}
      startIcon={systemState === "RUNNING" ? <StopIcon /> : <PlayArrowIcon />}
      style={{ textTransform: "none" }}
      onClick={() => {
        if (systemState === "RUNNING") {
          setSystemState("STOP");
        } else {
          setSystemState("RUNNING");
        }
      }}
      data-testid="toggleBtn"
    >
      {systemState === "RUNNING" ? "Stop Monitoring" : "Start Monitoring"}
    </Button>
  );
}
