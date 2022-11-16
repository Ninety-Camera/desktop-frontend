import React from "react";
import { Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/system";
import PROFILE_IMG from "../../../assets/images/profile.svg";
import { Button, IconButton } from "@mui/material";
import AddSubscriberBtn from "../../../components/AddSubscriberBtn";
import RemoveSubscriber from "../../../components/RemoveSubscriberBtn";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Avatar } from "@mui/material";
import SETTING_IMG from "../../../assets/images/profile.svg";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
import HeightBox from "../../../components/HeightBox";
import axios from "axios";
import IMAGE from "../../../assets/images/Intruder1.jpg";
import { useEffect } from "react";

const name = "Test User";
const password = "12345";
const username = "user@gmail.com";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    deviceID: "",
    password: "",
    emails: [],
  });
  const [editable, setEditable] = useState(false);
  const [editablePW, setEditablePW] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordCrt, setPasswordCrt] = useState("");
  const [users, setUsers] = useState([
    { email: "user1@mail.com", role: "owner" },
    { email: "user2@mail.com", role: "additional" },
    { email: "user3@mail.com", role: "additional" },
    { email: "user4@mail.com", role: "additional" },
  ]);

  useEffect(() => {
    console.log("lll");
    getData();
  });

  const [profileData, setProfileData] = useState(null);

  function getData() {
    axios
      .get("http://localhost:5000/profile")
      .then((response) => {
        const res = response.data;
        if (
          profile === null ||
          profile.name !== res.name ||
          profile.password !== res.password
        ) {
          setProfile({
            name: res.name,
            password: res.password,
            deviceID: res.deviceID,
            emails: res.emails,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    console.log(profile);
  }

  const handleBtnClick = () => {
    if (editable) {
      //should implement
    }
    setEditable(!editable);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const divStyles = {
    overflow: "hidden",
    // width: "120%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "10%",
    paddingTop: "10%",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    if (password === passwordCrt) {
      setEditablePW(true);
      handleClose();
    } else {
      alert("Invalid Password");
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <div>
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
            <div style={{}}>
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
                }}
              >
                <Typography sx={{ fontSize: 20, fontWeight: 50 }}>
                  Device Id : {profile.deviceID}
                </Typography>
              </Paper>
              <HeightBox height={10}></HeightBox>
              <Stack direction="row" spacing={0}>
                <div
                  style={{
                    width: "50%",
                    borderRight: "2px solid #6C63FF",
                    paddingBottom: "5%",
                  }}
                >
                  <Stack direction="column" spacing={1}>
                    <div style={divStyles}>
                      <Stack direction="column" spacing={1}>
                        <Typography>Name</Typography>
                        <Stack direction="row" spacing={5}>
                          <TextField
                            InputProps={{ readOnly: !editable }}
                            defaultValue={name}
                            sx={{ width: "90%" }}
                            variant="standard"
                          ></TextField>
                          <IconButton onClick={handleBtnClick}>
                            {editable ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                        </Stack>
                      </Stack>
                    </div>
                    <div style={divStyles}>
                      <Stack direction="column" spacing={1}>
                        <Typography>Password</Typography>
                        <Stack direction="row" spacing={5}>
                          <TextField
                            type="password"
                            InputProps={{ readOnly: !editablePW }}
                            defaultValue={password}
                            variant="standard"
                          ></TextField>
                          <IconButton onClick={handleClickOpen}>
                            <EditIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </div>
                    <div style={divStyles}>
                      <Stack direction="column" spacing={1}>
                        <Typography>Username (Primary Account)</Typography>
                        <Typography type="email">{username}</Typography>
                      </Stack>
                    </div>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogContent>
                        <DialogContentText>
                          Please Enter your current Password here
                        </DialogContentText>

                        <TextField
                          autoFocus
                          margin="dense"
                          id="currentPassword"
                          label="Current Password"
                          type="password"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setPasswordCrt(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCheck}>Continue</Button>
                      </DialogActions>
                    </Dialog>
                  </Stack>
                </div>
                <div style={{ width: "50%", paddingLeft: "5%" }}>
                  <div style={divStyles}>
                    <Stack direction="column" spacing={3}>
                      <Typography>Other Accounts </Typography>
                      <div
                        style={{
                          overflow: "hidden",
                          marginRight: "auto",
                          paddingLeft: "5%",
                        }}
                      >
                        <Stack direction="column" spacing={2}>
                          {users.map((user) => {
                            return (
                              <Typography
                                type="email"
                                key={users.indexOf(user)}
                                // InputProps={{ readOnly: true }}
                                // defaultValue={user.email}
                                sx={{ width: "90%" }}
                                // variant="standard"
                              >
                                {user.email}
                              </Typography>
                            );
                          })}
                        </Stack>
                      </div>
                      <div style={{ marginLeft: "auto", marginRight: "30%" }}>
                        <Stack direction="row" spacing={1}>
                          <AddSubscriberBtn
                            users={users}
                            setUsers={setUsers}
                            deviceID="ahd1234"
                          />
                          <RemoveSubscriber users={users} setUsers={setUsers} />
                        </Stack>
                      </div>
                    </Stack>
                  </div>
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
