import React from "react";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import INTRUDER_IMG1 from "../../assets/images/Intruder1.jpg";
import INTRUDER_IMG2 from "../../assets/images/intruder2.webp";
import { Stack } from "@mui/system";
import VIDEO_CLIP from "../../assets/video1.mp4";
import { useNavigate } from "react-router-dom";
import { Block } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from "@mui/material";

const images = [INTRUDER_IMG1, INTRUDER_IMG2, INTRUDER_IMG2];
const time = "09:34 pm";
const date = "02/12/2021";

export default function ViewNotification(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Stack direction="column" spacing={1}>
        {/* <BlackHorizontalBar
          title="Ninety Camera"
          buttonText={<ArrowBackIcon />}
          buttonAction={() => navigate("/dashboard/intrusion")}
        /> */}
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
          {" "}
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
            ></img>
            <Typography
              component={"h1"}
              sx={{ fontSize: 30, textAlign: "center", fontWeight: 500 }}
            >
              Someone intrudes your residence around {time} on {date}
            </Typography>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              {/* <Typography
                component={"h2"}
                sx={{ fontSize: 20, fontWeight: 500 }}
              >
                Screenshots of the intruder
              </Typography> */}
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
                {/* <img src={INTRUDER_IMG1} alt="" style={{ width: "20vw" }}></img>
                <img src={INTRUDER_IMG2} alt="" style={{ width: "20vw" }}></img> */}
              </Stack>
            </div>
            <div style={{
              alignContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }
            }>
              <video
                src={VIDEO_CLIP}
                width="320"
                height="240"
                controls
                loop
              ></video>
            </div>
          </Stack>
          {/* <div
            style={{
              width: "90%",
              overflowX: "scroll",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1}>
              <img src={INTRUDER_IMG1} alt="" style={{ width: "20vw" }}></img>
              <img src={INTRUDER_IMG2} alt="" style={{ width: "20vw" }}></img>
            </Stack>
          </div> */}
        </div>
      </Stack>
    </div>
  );
}
