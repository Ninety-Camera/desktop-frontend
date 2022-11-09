import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Stack, Button } from "@mui/material";
import VIDEOCLIP1 from "../../../assets/video1.mp4";
import VideoArea from "../../../components/VideoArea";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";

const videoList = [
  {
    sourcePath: "http://localhost:5000/video_feed/cam1",
    date: "20/02/2022",
    hour: "12:00",
  },
];

export default function CameraSection() {
  const [systemState, setSystemState] = useState("RUNNING");

  return (
    <div style={{ overflow: "hidden" }}>
      <Stack direction="column">
        <HeightBox height={10} />
        <div
          style={{
            paddingLeft: 40,
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={5} alignItems="center">
            <div>
              <Button
                variant="contained"
                color={systemState === "RUNNING" ? "secondary" : "primary"}
                startIcon={
                  systemState === "RUNNING" ? <StopIcon /> : <PlayArrowIcon />
                }
                style={{ textTransform: "none" }}
                onClick={() => {
                  if (systemState === "RUNNING") {
                    setSystemState("STOP");
                  } else {
                    setSystemState("RUNNING");
                  }
                }}
              >
                {systemState === "RUNNING"
                  ? "Stop Monitoring"
                  : "Start Monitoring"}
              </Button>
            </div>

            <SettingsMenu />
          </Stack>
        </div>
        <div style={{ paddingLeft: 40, paddingRight: 40 }}>
          <VideoArea videosList={videoList} alignment={"row"} />
        </div>
        <HeightBox height={10} />
      </Stack>
    </div>
  );
}
