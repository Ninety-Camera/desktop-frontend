import React from "react";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import VIDEOCLIP1 from "../../assets/video1.mp4";
import { Stack } from "@mui/system";
import VideoArea from "../../components/VideoArea";
import { useNavigate } from "react-router-dom";

const videoList = [
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
];

export default function ViewVideos() {
  const navigate = useNavigate();
  return (
    <div style={{ overflow: "hidden", justifyContent: "center" }}>
      <Stack direction="column" spacing={2}>
        <BlackHorizontalBar
          title="Ninety Camera"
          buttonText={"Dashboard"}
          buttonAction={() => navigate("/dashboard")}
        />
        <VideoArea
          videosList={videoList}
          alignment={"column"}
          width={500}
          height={300}
        />
      </Stack>
    </div>
  );
}
