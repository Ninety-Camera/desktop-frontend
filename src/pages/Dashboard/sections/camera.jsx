import React, { useState, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Stack, Button } from "@mui/material";
import VideoArea from "../../../components/VideoArea";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";
import ToggleBtn from "../../../components/ToggleBtn";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemRunningState } from "../../../reducers/userSlice";
import { updateAllCameraRunningStatus } from "../../../reducers/cameraSlice";

export default function CameraSection() {
  const userState = useSelector((state) => state.user);
  const cameraState = useSelector((state) => state.camera);
  const dispatch = useDispatch();
  const [systemState, setSystemState] = useState(
    userState?.CCTV_System?.status
  );
  const [loading, setLoading] = useState(false);
  async function changeSystemMonitoringStatus() {
    var newState = systemState === "RUNNING" ? "STOP" : "RUNNING";
    setLoading(true);
    try {
      const response = await api.cctv.changeMonitoringStatus(
        { newStatus: newState, systemId: userState?.CCTV_System?.id },
        userState?.token
      );
      if (response?.data?.status === 200) {
        setSystemState(newState);
        dispatch(updateAllCameraRunningStatus(newState));
        dispatch(updateSystemRunningState(newState));
      } else {
        // Error occured
      }
      setLoading(false);
    } catch (error) {}
  }

  return (
    <div style={{ overflowX: "hidden", overflowY: "scroll" }}>
      <Stack direction="column" spacing={5}>
        <HeightBox height={2} />
        <div
          style={{
            paddingLeft: 40,
            justifyContent: "center",
          }}
        >
          <Stack direction="row" spacing={5} alignItems="center">
            <div>
              <ToggleBtn
                state={systemState}
                loading={loading}
                disabled={cameraState?.cameras.length === 0}
                setState={(status) => {
                  changeSystemMonitoringStatus();
                }}
              />
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
