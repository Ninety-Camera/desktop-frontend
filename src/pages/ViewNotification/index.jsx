import React, { useState } from "react";
import INTRUDER_IMG1 from "../../assets/images/Intruder1.jpg";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import api from "../../api";
import { LOCAL_URL } from "../../constants";
import * as moment from "moment";
import HeightBox from "../../components/HeightBox";

export default function ViewNotification(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.pathname;
  const params = path.split("/");
  const intrusionId = params[params.length - 2];
  const time = params[params.length - 1];
  const images = [
    `${LOCAL_URL}get/image/${intrusionId}/1`,
    `${LOCAL_URL}get/image/${intrusionId}/2`,
    `${LOCAL_URL}get/image/${intrusionId}/3`,
  ];
  const [loading, setLoading] = useState(false);

  async function openVideo() {
    setLoading(true);
    try {
      const response = await api.local_intrusions.openIntrusionVideo(
        intrusionId
      );
      if (response?.status === 200) {
      }
    } catch (error) {}
    setLoading(false);
  }

  return (
    <div>
      <Stack direction="column" spacing={1}>
        <div>
          <IconButton
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#6C63FF",
              color: "white",
              position: "fixed",
              top: 20,
              left: 20,
              "&:hover": {
                backgroundColor: "#5C53FF",
                // boxShadow: 'none',
              },
            }}
            onClick={() => navigate("/dashboard/intrusion")}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div
          style={{
            overflow: "hidden",
            width: "80%",
            left: "10%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Stack direction="column" spacing={2}>
            <img
              src={INTRUDER_IMG1}
              alt=""
              style={{
                display: "Block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "20%",
                padding: 10,
              }}
            />
            <Typography
              component={"h1"}
              sx={{ fontSize: 30, textAlign: "center", fontWeight: 500 }}
            >
              Someone intrudes your residence around{" "}
              {moment(time).format("HH:MM")} on{" "}
              {moment(time).format("YYYY-MM-DD")}
            </Typography>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1}>
                {images.map((image) => (
                  <img
                    src={image}
                    alt=""
                    style={{
                      border: "1px solid #6C63FF",
                      borderRadius: "4px",
                      padding: "5px",
                      width: "20vw",
                    }}
                  ></img>
                ))}
              </Stack>
            </div>
            <HeightBox height={10} />
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                sx={{ width: 500 }}
                disabled={loading}
                onClick={openVideo}
              >
                {loading ? <CircularProgress /> : "Open Video"}
              </Button>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
