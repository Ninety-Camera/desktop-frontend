import { Button } from "@mui/material";
import React from "react";
import api from "../../api";
import * as moment from "moment";
import { Stack } from "@mui/system";

export default function RecordVideoItem(props) {
  const { id, date } = props;

  async function openRecordVideo() {
    try {
      await api.local_video.openRecordVideo(id);
    } catch (error) {}
  }

  return (
    <div
      style={{
        marginRight: 10,
        marginBottom: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div style={{ padding: 40 }}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <p style={{ fontWeight: "bold" }}>
            Video at: {moment(date).format("hh:mm:ss A")}
          </p>
          <Button variant="contained" onClick={openRecordVideo}>
            Open Video
          </Button>
        </Stack>
      </div>
    </div>
  );
}
