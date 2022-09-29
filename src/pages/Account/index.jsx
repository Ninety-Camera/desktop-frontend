import React from "react";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import { Stack } from "@mui/system";
import PROFILE_IMG from "../../assets/images/profile.svg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Navigate, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const username = "Test User";
const password = "12345";
const email = "user@gmail.com";

export default function Account() {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [editablePW, setEditablePW] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordCrt, setPasswordCrt] = useState("");

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
    <React.Fragment>
      <Stack direction="column" spacing={1}>
        <BlackHorizontalBar
          title={"Ninety Camera"}
          buttonText={"Dashboard"}
          buttonAction={() => navigate("/dashboard")}
        />
        <div
          style={{
            color: "#6C63FF",
            fontWeight: 700,
            fontSize: 25,
            padding: 20,
            justifyContent: "center",
          }}
        >
          My Account
        </div>
        <Stack direction="row" spacing={3}>
          <div
            style={{
              overflow: "hidden",
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Card
              sx={{
                width: 500,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <CardHeader title={username}></CardHeader>
              <CardContent>
                <Stack direction="column" spacing={1}>
                  <div
                    style={divStyles}
                  >
                    <Stack direction="row" spacing={2}>
                      <Typography>Username</Typography>
                      <TextField
                        InputProps={{ readOnly: !editable }}
                        defaultValue={username}
                      ></TextField>
                    </Stack>
                  </div>
                  <div style={divStyles}>
                    <Stack direction="row" spacing={2}>
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
                    <Stack direction="row" spacing={2}>
                      <Typography>Other Accounts</Typography>
                      <div>
                        <Stack direction="column" spacing={2}>
                          <Typography type="email">{email}</Typography>
                          <Typography type="email">{email}</Typography>
                          <Typography type="email">{email}</Typography>
                        </Stack>
                      </div>
                    </Stack>
                  </div>
                  <Button onClick={handleBtnClick}>
                    {editable ? "Save" : "Edit"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
          <div>
            <img src={PROFILE_IMG} style={{ width: "40vw" }}></img>
          </div>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#6C63FF",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
