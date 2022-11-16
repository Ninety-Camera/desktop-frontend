import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "react-qr-code";
import HeightBox from "../HeightBox";

export default function AddSubscriberBtn(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.cancelView();
  };

  return (
    <div data-testid="addSubscriberBtn">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#6C63FF",
          fontFamily: "Inter",
          color: "white",
          fontSize: 15,
          fontWeight: 700,
          "&:hover": {
            backgroundColor: "#6f63EE",
          },
        }}
      >
        Add Subscriber
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Subscriber</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Scan the QR code using the mobile app"}
          </DialogContentText>
          <HeightBox height={20} />

          <QRCode
            size={256}
            style={{ height: "auto", width: 300, height: 300 }}
            value={props.deviceID}
            viewBox={`0 0 256 256`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
