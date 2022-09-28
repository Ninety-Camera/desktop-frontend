import React from "react";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import VIDEOCLIP1 from "../../assets/video1.mp4";
import { Stack } from "@mui/system";
import VideoArea from "../../components/VideoArea";

const videoList = [
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
];

export default function ViewVideos() {
  return (
    <React.Fragment>
      <Stack direction="column" spacing={2}>
        <BlackHorizontalBar phrase="Ninety Camera" />
        <VideoArea videosList={videoList} alignment={"column"} width={500} height={300}/>
      </Stack>
    </React.Fragment>
  );
}
