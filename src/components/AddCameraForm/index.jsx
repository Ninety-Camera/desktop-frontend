import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Stack } from "@mui/system";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import { useSelector, useDispatch } from "react-redux";
import HeightBox from "../HeightBox";
import { addCamera } from "../../reducers/cameraSlice";

const webCamValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  cameraId: Yup.string().required().label("id"),
});

const iPCamValidationSchema = Yup.object().shape({
  link: Yup.string().required().label("Link"),
  name: Yup.string().required().label("Name"),
});

export default function AddCameraForm() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [cameraType, setCameraType] = useState("webCamera");
  const [loading, setLoading] = useState(false);

  async function addWebCamera(values) {
    setLoading(true);
    const camera = {
      systemId: userState?.CCTV_System?.id,
      name: values?.name,
      type: "WEB_CAMERA",
      status: "STOP",
    };

    try {
      const response = await api.camera.addCamera(camera, userState?.token);
      if (response?.data?.status === 201) {
        // Camera adding success
        const cameraRes = response?.data?.data?.camera;
        const localResponse = await api.local_camera.addCamera({
          id: cameraRes?.id,
          name: camera.name,
          type: "WEB_CAMERA",
          source: values.cameraId,
        });
        if (localResponse?.status === 200) {
          dispatch(
            addCamera({
              id: cameraRes?.id,
              name: camera.name,
              type: "WEB_CAMERA",
              source: values.cameraId,
            })
          );
        }
      }
    } catch (error) {
      // Error occured
      // Show snack bar
    }
    setLoading(false);
  }

  async function addIpCamera(values) {
    setLoading(true);
    const camera = {
      systemId: userState?.CCTV_System?.id,
      name: values?.name,
      type: "IP_CAMERA",
      status: "STOP",
    };
    try {
      const response = await api.camera.addCamera(camera, userState?.token);
      if (response?.data?.status === 201) {
        // Camera adding success
        console.log("Camera added succesfully");
        const cameraRes = response?.data?.data?.camera;
        const localResponse = await api.local_camera.addCamera({
          id: cameraRes?.id,
          name: camera.name,
          type: "IP_CAMERA",
          source: values.link,
        });
        if (localResponse?.status === 200) {
          dispatch(
            addCamera({
              id: cameraRes?.id,
              name: camera.name,
              type: "IP_CAMERA",
              source: values.link,
            })
          );
        }
      }
    } catch (error) {
      // Error occured
      // Show snack bar
    }
    setLoading(false);
  }

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
    <div data-testid="addCameraForm">
      <Button onClick={handleClickOpen("paper")}>Add Camera</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Cameras</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
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
                    <HeightBox height={20} />
                    <Formik
                      initialValues={{
                        cameraId: "",
                        name: "",
                      }}
                      validationSchema={webCamValidationSchema}
                      onSubmit={(values) => {
                        addWebCamera(values);
                      }}
                    >
                      {(formikProps) => {
                        const { errors, handleSubmit, handleChange, touched } =
                          formikProps;
                        return (
                          <React.Fragment>
                            <TextField
                              variant="standard"
                              label="id"
                              onChange={handleChange("cameraId")}
                              sx={{ width: 500 }}
                            />
                            <TextField
                              variant="standard"
                              label="name"
                              onChange={handleChange("name")}
                              sx={{ width: 500 }}
                            />
                            <HeightBox height={20} />
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress /> : "Add"}
                            </Button>
                          </React.Fragment>
                        );
                      }}
                    </Formik>
                  </Stack>
                </div>
              ) : (
                <div>
                  <Stack direction="column" spacing={1}>
                    Select camera
                    <HeightBox height={20} />
                    <Formik
                      initialValues={{
                        name: "",
                        link: "",
                      }}
                      validationSchema={iPCamValidationSchema}
                      onSubmit={(values) => {
                        addIpCamera(values);
                      }}
                    >
                      {(formikProps) => {
                        const { errors, handleSubmit, handleChange, touched } =
                          formikProps;
                        return (
                          <React.Fragment>
                            <TextField
                              variant="standard"
                              label="name"
                              onChange={handleChange("name")}
                              sx={{ width: 500 }}
                            />
                            <TextField
                              variant="standard"
                              label="link"
                              onChange={handleChange("link")}
                              sx={{ width: 500 }}
                            />

                            <HeightBox height={20} />
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress /> : "Add"}
                            </Button>
                          </React.Fragment>
                        );
                      }}
                    </Formik>
                  </Stack>
                </div>
              )}
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
