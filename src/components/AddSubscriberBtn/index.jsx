import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddSubscriberBtn(props) {
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(props.users);
 

  const newUsers = [...users];
  console.log("new:",newUsers);
  
//   console.log("new:"+newUsers);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // this.newUsers.push({email: {email}, role: "additional"})
    setUsers((current) => [
      ...current,
      { email: { email }, role: "additional" },
    ]);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          width: 320,
          height: 100,
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
            To add new subscriber to this software, please enter the email
            address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
