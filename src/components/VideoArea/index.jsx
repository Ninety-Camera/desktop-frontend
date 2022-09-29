import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";

export default function VideoArea(props) {
  const videosList = props.videosList;
  const width = props.width;
  const height = props.height;
  const alignment = props.alignment;
  return (
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
      <Stack direction={alignment} spacing={5}>
        {videosList.map((videoClip) => {
          return (
            <Stack
              direction={alignment == "row" ? "column" : "row"}
              spacing={1}
              key={videosList.indexOf(videoClip)}
            >
              <video
                src={videoClip.sourcePath}
                width="320"
                height="240"
                controls
                loop
              ></video>
              <div>{videoClip.date + " at " + videoClip.hour}</div>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
