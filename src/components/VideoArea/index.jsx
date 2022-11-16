import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VideoItem from "../VideoItem";

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
            <VideoItem
              videoClip={videoClip}
              index={videosList.indexOf(videoClip)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
