import React, { useState } from "react";
import "@fontsource/inter";
import { Stack } from "@mui/material";
import VideoArea from "../../../components/VideoArea";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";
import ToggleBtn from "../../../components/ToggleBtn";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemRunningState } from "../../../reducers/userSlice";
import { updateAllCameraRunningStatus } from "../../../reducers/cameraSlice";
import SnackBarComponent from "../../../components/SnackBarComponent";

export default function CameraSection() {
  const userState = useSelector((state) => state.user);
  const cameraState = useSelector((state) => state.camera);
  const dispatch = useDispatch();
  const [systemState, setSystemState] = useState(
    userState?.CCTV_System?.status
  );
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

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
        setSnackMessage({
          type: "error",
          message: "Error occured while changing the status",
        });
        setOpenSnackBar(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSnackMessage({ type: "error", message: "A network error occured" });
      setOpenSnackBar(true);
    }
    setLoading(false);
  }

  return (
    <div style={{ overflowX: "hidden", overflowY: "scroll" }}>
      <SnackBarComponent
        type={snackMessage.type}
        message={snackMessage.message}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
      />
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
