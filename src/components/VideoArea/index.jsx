import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VideoItem from "../VideoItem";
import { useSelector } from "react-redux";
import camera from "../../api/modules/camera";

export default function VideoArea(props) {
  const cameras = useSelector((state) => state.camera);
  return (
    <Grid container spacing={5} justifyContent="left">
      {cameras?.cameras.map((videoClip) => {
        return (
          <Grid item xs="auto" key={videoClip?.id}>
            <VideoItem videoClip={videoClip} index={videoClip?.id} />
          </Grid>
        );
      })}
    </Grid>
  );
}
