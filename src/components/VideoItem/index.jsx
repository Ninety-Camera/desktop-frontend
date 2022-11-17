import React from "react";
import { useState } from "react";
import { Stack } from "@mui/material";
import ToggleBtn from "../ToggleBtn";
import { LOCAL_URL } from "../../constants";

export default function VideoItem(props) {
  const videoClip = props.videoClip;
  const [state, setState] = useState("RUNNING");

  return (
    <React.Fragment>
      <img //should use video tag with controls
        src={`${LOCAL_URL}video_feed/${videoClip?.id}`}
        width={320}
        height={240}
        alt="CCTV video"
        onError={(event) => {
          event.target.src =
            "https://www.svgrepo.com/show/343419/computer-error.svg";
          event.onerror = null;
        }}
      />
      <Stack direction="column" spacing={0} sx={{ alignContent: "justify" }}>
        <p
          style={{
            color: "#6C63FF",
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
          }}
        >
          <ToggleBtn state={state} setState={setState} />
        </div>
      </Stack>
    </React.Fragment>
  );
}
