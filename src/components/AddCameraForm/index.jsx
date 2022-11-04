import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { InputLabel, Input, FormHelperText } from "@mui/material";
import { Stack } from "@mui/system";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

export default function AddCameraForm() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [cameraType, setCameraType] = React.useState("webCamera");

  const handleChange = (event) => {
    setCameraType(event.target.value);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div data-testid = "addCameraForm">
      <Button onClick={handleClickOpen("paper")}>Add Camera</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Cameras</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <form action="">
            <Stack direction="column" spacing={2}>
              <FormControl>
                <div>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ color: "black" }}
                  >
                    Select camera type
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={cameraType}
                    onChange={handleChange}
                    defaultValue={cameraType}
                  >
                    <FormControlLabel
                      value="webCamera"
                      control={<Radio />}
                      label="Web Camera"
                    />
                    <FormControlLabel
                      value="iPCamera"
                      control={<Radio />}
                      label="IP Camera"
                    />
                  </RadioGroup>
                </div>
                {cameraType == "webCamera" ? (
                  <div>
                    <Stack direction="column" spacing={1}>
                      Select camera
                      <Stack direction="row" spacing={1}>
                      <IconButton>
                        <AddAPhotoIcon />
                      </IconButton>
                      <TextField variant="standard" label="id" />
                      </Stack>
                    </Stack>
                  </div>
                ) : (
                  <div><Stack direction="column" spacing={1}>
                  Select camera
                  <TextField variant="standard" label="link" />
                  <TextField variant="standard" label="Username" />
                  <TextField variant="standard" label="Password" />
                </Stack></div>
                )}
              </FormControl>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
