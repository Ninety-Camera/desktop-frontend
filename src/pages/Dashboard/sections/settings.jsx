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
// import HeightBox from "../../../components/HeightBox";

const name = "Test User";
const password = "12345";
const username = "user@gmail.com";

export default function Settings() {
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
              left: "20%",
              elevation: 15,
              borderRadius: 5,
            }}
          >
            <div style={{}}>
              <div
                style={{
                  width: "100%",
                  padding: "2%",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  backgroundColor: "#6C63FF",
                  color: "white",
                }}
              >
                <Typography sx={{ fontSize: 20, fontWeight: 50 }}>
                  Device Id : ahd123
                </Typography>
              </div>
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

                        {/* <IconButton onClick={handleBtnClick}>
                          {editable ? <SaveIcon /> : <EditIcon />}
                        </IconButton> */}
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
                          // width: "120%",
                          // marginLeft: "auto",
                          marginRight: "auto",
                          paddingLeft: "5%",
                          // paddingTop: "10%",
                        }}
                      >
                        <Stack direction="column" spacing={2}>
                          {users.map((user) => {
                            return (
                              <TextField
                                type="email"
                                key={users.indexOf(user)}
                                InputProps={{ readOnly: true }}
                                defaultValue={user.email}
                                sx={{ width: "90%" }}
                                variant="standard"
                              ></TextField>
                            );
                          })}
                        </Stack>
                      </div>
                      <div style={{ marginLeft: "auto", marginRight: "30%" }}>
                        <Stack direction="row" spacing={1}>
                          <AddSubscriberBtn users={users} setUsers={setUsers} />
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

          {/* <HeightBox height={20}/> */}
          {/* <div
              style={{
                overflow: "hidden",
                width: "35%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack direction="column" spacing={2}>
            <Button onClick={handleBtnClick} sx={{ width: "65%" }} >
              {editable ? "Save" : "Edit"}
            </Button>
          </Stack>
            </div> */}
        </div>
      </Stack>
      <HeightBox height={20} />
    </div>
  );
}
