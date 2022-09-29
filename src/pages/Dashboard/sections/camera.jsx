import React, { useState } from "react";
import "@fontsource/inter";
import { Stack, Button, Typography, Box } from "@mui/material";
import BlackHorizontalBar from "../../../components/BlackHorizontalBar";
import CustomButton from "../../../components/Custombutton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VIDEOCLIP1 from "../../../assets/video1.mp4";
import NotificationBars from "../../../components/NotificationBars";
import NotificationArea from "../../../components/NotificationArea";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoArea from "../../../components/VideoArea";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import AddSubscriberBtn from "../../../components/AddSubscriberBtn";
import RemoveSubscriber from "../../../components/RemoveSubscriberBtn";
import { Navigate, useNavigate } from "react-router-dom";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";

const notifications = [
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
  { date: "20/02/2022", time: "09:34" },
];

const videoList = [
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
];

const users = [
  { email: "user1@mail.com", role: "owner" },
  { email: "user2@mail.com", role: "additional" },
  { email: "user3@mail.com", role: "additional" },
  { email: "user4@mail.com", role: "additional" },
];

export default function CameraSection() {
  const [systemState, setSystemState] = useState("RUNNING");
  const navigate = useNavigate();

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
                  ? "Stop Processing"
                  : "Start Processing"}
              </Button>
            </div>

            <SettingsMenu />
          </Stack>
        </div>
        <div style={{ paddingLeft: 40, paddingRight: 40 }}>
          <VideoArea videosList={videoList} alignment={"row"} />
        </div>
        <HeightBox height={10} />
        <h1 style={{ paddingLeft: 40 }}>Recent Intrusions</h1>
        <div style={{ padding: 20, justifyContent: "center" }}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "100%",
                maxHeight: 1000,
                justifyContent: "center",
                paddingLeft: 20,
                overflowY: "scroll",
              }}
            >
              <Stack direction="column" spacing={1}>
                {notifications.map((notification) => {
                  return (
                    <NotificationArea
                      key={notifications.indexOf(notification)}
                      date={notification.date}
                      time={notification.time}
                    />
                  );
                })}
              </Stack>
            </div>
            <div style={{ width: "100%", justifyContent: "center" }}>
              <Stack direction="column" spacing={1}>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AddSubscriberBtn users={users} />
                    <RemoveSubscriber users={users} />
                  </Stack>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <Button
                    sx={{
                      width: 655,
                      height: 100,
                      backgroundColor: "#6C63FF",
                      fontFamily: "Inter",
                      color: "white",
                      fontSize: 15,
                      fontWeight: 700,
                      "&:hover": {
                        backgroundColor: "#6f63EE",
                      },
                    }}
                    // onClick={navigate("../viewVideos")}
                    href="../viewVideos"
                  >
                    <Stack
                      direction="column"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <div>View Previous Videos </div>
                      <div>
                        <PlayCircleIcon />
                      </div>
                    </Stack>
                  </Button>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

// function StopButton() {
//   return (
//     <div>
//       <StopIcon></StopIcon>
//       "Stop"
//     </div>
//   );
// }

// function StartButton() {
//   return (
//     <div>
//       <StartButton />
//       "Start"
//     </div>
//   );
// }
