import React from "react";
import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ToggleBtn from "../ToggleBtn";
import { LOCAL_URL } from "../../constants";
import { deleteCamera } from "../../reducers/cameraSlice";
import HeightBox from "../HeightBox";

export default function VideoItem(props) {
  const videoClip = props.videoClip;
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [state, setState] = useState("RUNNING");
  const [loading, setLoading] = useState(false);

  async function delCamera() {
    setLoading(true);
    dispatch(
      deleteCamera({
        camId: videoClip?.id,
        token: userState?.token,
      })
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: "25px",
      }}
    >
      <img
        src={`${LOCAL_URL}video_feed/${videoClip?.id}`}
        width={320}
        height={240}
        alt="CCTV video"
        onError={(event) => {
          event.target.src =
            "https://www.svgrepo.com/show/343419/computer-error.svg";
          event.onerror = null;
        }}
        style={{
          borderRadius: "8px",
          padding: "5px",
          width: "95%",
          margin: "10px",
        }}
      />

      <div>
        <Stack direction="column" spacing={2} sx={{ alignContent: "justify" }}>
          <p
            style={{
              color: "black",
              fontSize: 20,
              margin: 0,
              textAlign: "center",
              fontWeight: 800,
            }}
          >
            {videoClip?.name}
          </p>
          <div
            style={{
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              padding: "10px 20px",
            }}
          >
            <Stack direction="row" spacing={1}>
              <ToggleBtn state={state} setState={setState} />
              <Button
                variant="contained"
                onClick={delCamera}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : "Delete Camera"}
              </Button>
            </Stack>
          </div>
          {/* <HeightBox height={10} />
        <div
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          
        </div> */}
        </Stack>
      </div>
    </div>
  );
}
