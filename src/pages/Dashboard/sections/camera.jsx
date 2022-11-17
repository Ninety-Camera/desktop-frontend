import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Stack, Button } from "@mui/material";
import VideoArea from "../../../components/VideoArea";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";
import ToggleBtn from "../../../components/ToggleBtn";

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
              <ToggleBtn state={systemState} setState={setSystemState} />
            </div>
            <SettingsMenu />
          </Stack>
        </div>
        <div style={{ paddingLeft: 40, paddingRight: 40 }}>
          <VideoArea alignment={"row"} />
        </div>
        <HeightBox height={10} />
      </Stack>
    </div>
  );
}
