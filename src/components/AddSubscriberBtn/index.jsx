import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ADD_SUB from "../../assets/images/addSubscriber.svg";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function AddSubscriberBtn(props) {
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //should refresh the list of users
    setOpen(false);
  };

  const handleAdd = () => {
    // this.newUsers.push({email: {email}, role: "additional"})
    props.setUsers((current) => [
      ...current,
      { email: email, role: "additional" },
    ]);
    handleClose();
  };

  return (
    <div data-testid="addSubscriberBtn">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          width: 50,
          // height: 100,
          backgroundColor: "#6C63FF",
          fontFamily: "Inter",
          color: "white",
          fontSize: 12,
          fontWeight: 700,
          "&:hover": {
            backgroundColor: "#6f63EE",
          },
        }}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Subscriber</DialogTitle>
        <DialogContent>
          <DialogContentText>
        Scan the QR code below!
          </DialogContentText>
          {/* <img src={ADD_SUB} style={{ width: "20vw", alignSelf: "center" }} />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={props.deviceID}
              viewBox={`0 0 256 256`}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleAdd}>Add</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
