import React from "react";
import VIDEOCLIP1 from "../../../assets/video1.mp4";
import { Grid } from "@mui/material";

const videosList = [
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
];

export default function ProcessedVideo() {
  return (
    <Grid container spacing={5} justifyContent="center">
      {videosList.map((videoClip) => {
        return (
          <Grid item xs="auto" key={videosList.indexOf(videoClip)}>
            <video
              src={videoClip.sourcePath}
              width={320}
              height={240}
              controls
              loop
              alt="CCTV video"
              onError={(event) => {
                event.target.src =
                  "https://www.svgrepo.com/show/343419/computer-error.svg";
                event.onerror = null;
              }}
            ></video>
            <p
              style={{
                color: "#6C63FF",
                fontSize: 20,
                margin: 0,
                textAlign: "center",
              }}
            >{`On ${videoClip.date} at ${videoClip.hour}`}</p>
          </Grid>
        );
      })}
    </Grid>
  );
}
