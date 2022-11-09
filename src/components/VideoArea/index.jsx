import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function VideoArea(props) {
  const videosList = props.videosList;
  const width = props.width;
  const height = props.height;
  const alignment = props.alignment;
  return (
    <Grid container spacing={5} justifyContent="center">
      {videosList.map((videoClip) => {
        return (
          <Grid item xs="auto" key={videosList.indexOf(videoClip)}>
            <img
              src={videoClip.sourcePath}
              width={320}
              height={240}
              alt="Image"
            />
            <p
              style={{
                color: "#6C63FF",
                fontSize: 20,
                margin: 0,
                textAlign: "center",
                fontWeight: 800,
              }}
            >{`CCTV - ${videosList.indexOf(videoClip) + 1}`}</p>
          </Grid>
        );
      })}
    </Grid>
  );
}
