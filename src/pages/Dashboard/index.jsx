import React, { useState } from "react";
import "@fontsource/inter";
import { Stack, Button, Typography, Box } from "@mui/material";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import CustomButton from "../../components/Custombutton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VIDEOCLIP1 from "../../assets/video1.mp4";
import NotificationBars from "../../components/NotificationBars";
import NotificationArea from "../../components/NotificationArea";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoArea from "../../components/VideoArea";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import AddSubscriberBtn from "../../components/AddSubscriberBtn";
import RemoveSubscriber from "../../components/RemoveSubscriberBtn";
import { Navigate, useNavigate } from "react-router-dom";
import SettingsMenu from "../../components/SettingsMenu";

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
];

const users = [
  { email: "user1@mail.com", role: "owner" },
  { email: "user2@mail.com", role: "additional" },
  { email: "user3@mail.com", role: "additional" },
  { email: "user4@mail.com", role: "additional" },
];

export default function Dashboard() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  // console.log("dash:"+users);
  const toggle = () => {
    setState(!state);
  };
  return (
    <React.Fragment>
      <Stack direction="column">
        <BlackHorizontalBar phrase={"Ninety Camera"} />
        <div
          style={{
            color: "#6C63FF",
            fontWeight: 700,
            fontSize: 25,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={2}>
            <div style={{ justifyContent: "center" }}>Dashboard</div>
            <div>
              <Button
                onClick={toggle}
                sx={{
                  backgroundColor: "#F50057",
                  color: "white",
                  fontWeight: 700,
                  height: "80%",
                  justifyContent: "center",
                  id: "startStopBtn",
                  "&:hover": {
                    backgroundColor: "#D50057",
                  },
                  alignItems: "center",
                }}
              >
                {state ? (
                  <Stack direction="row" spacing={1}>
                    <div>
                      <StopIcon></StopIcon>
                    </div>
                    <div>Stop</div>
                  </Stack >
                ) : (
                  <Stack direction="row" spacing={1}>
                    <div>
                      <PlayArrowIcon />
                    </div>
                    <div>Start</div>
                  </Stack>
                )}
              </Button>
            </div>
            {/* <div style={{ justifyContent: "center", flex: "right" }}>
              <Tooltip title="Settings" placement="left-start">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </div> */}
            <SettingsMenu/>
          </Stack>
        </div>
        <div style={{ padding: 20 }}>
          <VideoArea videosList={videoList} alignment={"row"} />
        </div>
        <h1 style={{ paddingLeft: 40 }}>Recent Intrusions</h1>
        <div style={{ padding: 20, justifyContent: "center" }}>
          <Stack direction="row" spacing={2}>
            <div
              style={{
                width: "100%",
                height: 202,
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
                  <Stack direction="row" spacing={2}>
                    <AddSubscriberBtn users={users} />
                    <RemoveSubscriber users={users} />
                  </Stack>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <Button
                    sx={{
                      width: "91%",
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
                    <Stack direction="column" spacing={1}>
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
    </React.Fragment>
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
