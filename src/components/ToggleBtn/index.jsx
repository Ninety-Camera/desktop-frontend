import React from "react";
import "@fontsource/inter";
import { Button, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

export default function ToggleBtn(props) {
  const { loading, disabled = false } = props;
  return (
    <Button
      variant="contained"
      color={props.state === "RUNNING" ? "secondary" : "primary"}
      startIcon={
        !loading && props.state === "RUNNING" ? <StopIcon /> : <PlayArrowIcon />
      }
      style={{ textTransform: "none" }}
      disabled={loading || disabled}
      sx={{ width: 170 }}
      onClick={() => {
        if (props.state === "RUNNING") {
          props.setState("STOP");
        } else {
          props.setState("RUNNING");
        }
      }}
      data-testid="toggleBtn"
    >
      {loading ? (
        <CircularProgress />
      ) : props.state === "RUNNING" ? (
        "Stop Monitoring"
      ) : (
        "Start Monitoring"
      )}
    </Button>
  );
}
