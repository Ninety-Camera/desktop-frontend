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
// import HeightBox from "../../../components/HeightBox";

const username = "Test User";
const password = "12345";
const email = "user@gmail.com";

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
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
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
      <Stack direction="column" spacing={1}>
        <div
          style={{
            color: "#6C63FF",
            fontWeight: 700,
            fontSize: 25,
            padding: 20,
            justifyContent: "center",
          }}
        >
          Settings
        </div>
        <div
          style={{
            overflow: "hidden",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Stack direction="column" spacing={2}>
            <div style={divStyles}>
              <Stack direction="row" spacing={5}>
                <Typography>Username</Typography>
                <TextField
                  InputProps={{ readOnly: !editable }}
                  defaultValue={username}
                ></TextField>
              </Stack>
            </div>
            <div style={divStyles}>
              <Stack direction="row" spacing={5}>
                <Typography>Password</Typography>
                <TextField
                  type="password"
                  InputProps={{ readOnly: !editablePW }}
                  defaultValue={password}
                ></TextField>
                <IconButton onClick={handleClickOpen}>
                  <EditIcon />
                </IconButton>
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
            <div style={divStyles}>
              <Stack direction="row" spacing={2}>
                <Typography>Primary Account</Typography>
                <Typography type="email">{email}</Typography>
              </Stack>
            </div>
            <div style={divStyles}>
              <Stack direction="row" spacing={3}>
                <Typography>Other Accounts </Typography>
                <div>
                  <Stack direction="column" spacing={2}>
                    {users.map((user) => {
                      return (
                        <Typography type="email" key={users.indexOf(user)}>
                          {user.email}
                        </Typography>
                      );
                    })}
                  </Stack>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
        {/* <HeightBox height={20}/> */}
        <div style={{
            overflow: "hidden",
            width: "35%",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={1} >
            <AddSubscriberBtn users={users} setUsers={setUsers} />
            <RemoveSubscriber users={users} setUsers={setUsers} />
          </Stack>
          <Button onClick={handleBtnClick} sx={{ width: "65%" }}>
            {editable ? "Save" : "Edit"}
          </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
