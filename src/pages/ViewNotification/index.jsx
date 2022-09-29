import React from "react";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import INTRUDER_IMG1 from "../../assets/images/Intruder1.jpg";
import INTRUDER_IMG2 from "../../assets/images/intruder2.webp";
import { Stack } from "@mui/system";
import VIDEO_CLIP from "../../assets/video1.mp4";

const images = [INTRUDER_IMG1, INTRUDER_IMG2];
const time = "09:34";
const date = "02/12/2021";

export default function ViewNotification(props) {
  return (
    <Stack direction="column" spacing={1}>
      <BlackHorizontalBar phrase="Ninety Camera" />
      <div
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>
          Someone intrudes your residence around {time} on {date}
        </h1>
        <p>Here are some evidence for you !</p>
        <h2>Screenshots of the intruder</h2>
        <div
          style={{
            width: "90%",
            overflowX: "scroll",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <img src={INTRUDER_IMG1} alt="" style={{ width: "20vw" }}></img>
            <img src={INTRUDER_IMG2} alt="" style={{ width: "20vw" }}></img>
          </Stack>
        </div>
        <div>
          <h2> A video Clip of the intrder</h2>
          <video
            src={VIDEO_CLIP}
            width="320"
            height="240"
            controls
            loop
          ></video>
        </div>
      </div>
    </Stack>
  );
}
