import React from "react";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { Stack, Button, IconButton } from "@mui/material";
import VIDEO_ERROR_IMAGE from "../../assets/images/notify.svg";
import ToggleBtn from "../ToggleBtn";

export default function VideoItem(props) {
  const videoClip = props.videoClip;
  const [state, setState] = useState("RUNNING");
  const defaultImage = { VIDEO_ERROR_IMAGE };

  const replaceImage = (error) => {
    //replacement of broken Image
    error.target.src = this.defaultImage;
  };

  return (
    <React.Fragment>
      <img //should use video tag with controls
        src={videoClip.sourcePath}
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
        >{`CCTV - ${props.index + 1}`}</p>
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
