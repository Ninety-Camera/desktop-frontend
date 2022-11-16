import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import api from "../../api";

// const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, users, setUsers } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  async function handleListItemClick(value) {
    // When calling this function show a loading widget
    try {
      const response = await api.cctv.deleteSubscribedUser(value?.userId);
      if (response?.data?.status == 200) {
        setUsers(users.filter((user) => users.indexOf(user) !== value));
      } else {
        // Error occured while getting the responses
        // Show the error snackbar
      }
    } catch (error) {}
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Remove Subscriber</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem key={users.indexOf(user)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.user.email} />
            <ListItemIcon>
              <IconButton
                onClick={() => handleListItemClick(users.indexOf(user))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function RemoveSubscriber(props) {
  React.useEffect(() => {}, [props.users]);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          width: 50,
          // height: 100,
          backgroundColor: "#F50057",
          fontFamily: "Inter",
          color: "white",
          fontSize: 12,
          fontWeight: 700,
          "&:hover": {
            backgroundColor: "#D50057",
          },
        }}
      >
        Remove
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        users={props.users}
        setUsers={props.setUsers}
      />
    </div>
  );
}
