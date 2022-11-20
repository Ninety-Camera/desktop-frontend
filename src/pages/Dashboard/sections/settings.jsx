import React from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/system";
import AddSubscriberBtn from "../../../components/AddSubscriberBtn";
import RemoveSubscriber from "../../../components/RemoveSubscriberBtn";
import Paper from "@mui/material/Paper";
import HeightBox from "../../../components/HeightBox";
import { useEffect } from "react";
import api from "../../../api";
import { useSelector } from "react-redux";
import SnackBarComponent from "../../../components/SnackBarComponent";

export default function Settings() {
  const userState = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  async function getData() {
    try {
      const response = await api.cctv.getSubscribedUsers(
        userState?.CCTV_System?.id,
        userState?.token
      );

      if (response?.data?.status === 200) {
        setUsers(response?.data?.data?.users);
      } else {
        setSnackMessage({
          type: "error",
          message: "Error occured while getting the subscribed users",
        });
        setOpenSnackBar(true);
      }
    } catch (error) {
      // Add a toast message in here to show that an error occured while fetching the data
      setSnackMessage({ type: "error", message: "Network error occured" });
      setOpenSnackBar(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const divStyles = {
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "10%",
    paddingTop: "10%",
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <div>
          <SnackBarComponent
            type={snackMessage.type}
            message={snackMessage.message}
            open={openSnackBar}
            setOpen={setOpenSnackBar}
          />
          <Paper
            variant="outlined"
            sx={{
              width: "60%",
              position: "absolute",
              top: "20%",
              left: "25%",
              elevation: 15,
              borderRadius: 5,
            }}
          >
            <div>
              <Paper
                sx={{
                  width: "100%",
                  padding: "2%",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: "#6C63FF",
                  color: "white",
                  elevation: 15,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: 25, fontWeight: 50 }}>
                  <b>Device Id : {userState?.CCTV_System?.id}</b>
                </Typography>
              </Paper>
              <HeightBox height={10}></HeightBox>
              <Stack direction="row" spacing={0}>
                <div style={{ width: "90%", paddingLeft: "10%" }}>
                  <Stack direction="column" spacing={3}>
                    <div
                      style={{
                        overflow: "hidden",
                        marginRight: "auto",
                        paddingLeft: "5%",
                      }}
                    >
                      <Stack
                        direction="column"
                        alignItems="start"
                        justifyContent="start"
                      >
                        <Typography variant="h5" gutterBottom>
                          Other Subscribed Users
                        </Typography>
                        {users.map((user, index) => {
                          return (
                            <Typography type="email" key={index} variant="p">
                              {user?.user?.email}
                            </Typography>
                          );
                        })}
                      </Stack>
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "1%" }}>
                      <Stack direction="row" spacing={1}>
                        <AddSubscriberBtn
                          users={users}
                          setUsers={setUsers}
                          deviceID={userState?.CCTV_System?.id}
                          cancelView={getData}
                        />
                        <RemoveSubscriber users={users} setUsers={setUsers} />
                      </Stack>
                    </div>
                  </Stack>
                </div>
              </Stack>
              <HeightBox height={10}></HeightBox>
            </div>
          </Paper>
        </div>
      </Stack>
      <HeightBox height={20} />
    </div>
  );
}
