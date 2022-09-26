import React from "react";
import "@fontsource/inter";
import { Stack, Button, Typography, Box } from "@mui/material";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import CustomButton from "../../components/Custombutton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VIDEOCLIP1 from "../../assets/video1.mp4";

import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Dashboard() {
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
                sx={{
                  backgroundColor: "#F50057",
                  color: "white",
                  fontWeight: 700,
                  height: "80%",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#D50057",
                  },
                }}
              >
                <PauseCircleIcon></PauseCircleIcon>
                Pause
              </Button>
            </div>
            <div style={{ justifyContent: "center", flex: "right" }}>
              <Tooltip title="Settings" placement="left-start">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
        </div>
        <div style={{ padding: 20 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              maxWidth: "500",
              alignContent: "flex-start",
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={2}>
              <video
                src={VIDEOCLIP1}
                width="320"
                height="240"
                controls
                loop
              ></video>
              <video
                src={VIDEOCLIP1}
                width="320"
                height="240"
                controls
                loop
              ></video>
              <video
                src={VIDEOCLIP1}
                width="320"
                height="240"
                controls
                loop
              ></video>
              <video
                src={VIDEOCLIP1}
                width="320"
                height="240"
                controls
                loop
              ></video>
            </Stack>
          </Box>
        </div>
      </Stack>
    </React.Fragment>
  );
}
