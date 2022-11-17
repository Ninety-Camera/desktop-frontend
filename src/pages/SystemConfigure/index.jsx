import React, { useState, useEffect } from "react";
import { Stack } from "@mui/system";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Table,
  TableHead,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import HeightBox from "../../components/HeightBox";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import BGIMAGE from "../../assets/images/systemBG.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemStatus } from "../../reducers/userSlice";
import { addCamera } from "../../reducers/cameraSlice";

const webCamValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  cameraID: Yup.string().required().label("id"),
});

const iPCamValidationSchema = Yup.object().shape({
  link: Yup.string().required().label("Link"),
  name: Yup.string().required().label("Name"),
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

const CustomButton = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#6C63FF",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#5C63FF",
  },
}));

export default function SystemConfigure() {
  const userState = useSelector((state) => state.user);
  const cameraState = useSelector((state) => state.camera);
  const dispatch = useDispatch();
  const [cameraType, setCameraType] = React.useState("webCamera");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [cameras, setCameras] = React.useState([]);
  const [system, setSystem] = useState();

  useEffect(() => {
    console.log("cameras are: ", cameraState);
  }, [cameraState]);

  async function createTheSystem() {
    try {
      const response = await api.cctv.createSystem(
        { cameraCount: 0 },
        userState?.token
      );

      if (response?.data?.status === 201) {
        // system created succesfully
        setSystem(response?.data?.data);
        dispatch(updateSystemStatus(response?.data?.data));
      } else {
        // error occured in creating the system
      }
    } catch (error) {
      // Add a snack message saying that error occured
    }
  }

  async function addWebCamera(values) {
    const camera = {
      systemId: system?.id,
      name: values?.name,
      type: "WEB_CAMERA",
      status: "STOP",
    };

    try {
      const response = await api.camera.addCamera(camera, userState?.token);
      if (response?.data?.status === 201) {
        const cameraRes = response?.data?.data?.camera;
        const localResponse = await api.local_camera.addCamera({
          id: cameraRes?.id,
          name: camera.name,
          type: "WEB_CAMERA",
          source: values.cameraId,
        });
        console.log("Local response", localResponse);
        dispatch(addCamera(response?.data?.data?.camera));
        setCameras((current) => [
          ...current,
          { ...response?.data?.data?.camera },
        ]);
      }
    } catch (error) {
      // Error occured
      // Show snack bar
    }
  }

  async function addIpCamera(values) {
    const camera = {
      systemId: system?.id,
      name: values?.name,
      type: "IP_CAMERA",
      status: "STOP",
    };
    try {
      const response = await api.camera.addCamera(camera, userState?.token);
      if (response?.data?.status === 201) {
        dispatch(addCamera(response?.data?.data?.camera));
        setCameras((current) => [
          ...current,
          { ...response?.data?.data?.camera },
        ]);
      }
    } catch (error) {
      // Error occured
      // Show snack bar
    }
  }

  useEffect(() => {
    createTheSystem();
  }, []);

  const handleChange = (event) => {
    setCameraType(event.target.value);
  };

  return (
    <div>
      <Helmet>
        <style>
          {"body { background-image: " +
            `url(${BGIMAGE})` +
            "; overflow: hidden; background-repeat: no-repeat; background-size: cover}"}
        </style>
      </Helmet>
      <div
        style={{
          alignContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          left: "10%",
          top: "5%",
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Add your cameras here...
        </Typography>
      </div>
      <Stack direction="row" spacing={5}>
        <div style={{ width: "50%", alignContent: "center" }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: "30%",
              position: "absolute",
              top: "20%",
              left: "10%",
            }}
          >
            <form action="">
              <FormControl sx={{ padding: "5%" }}>
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
              </FormControl>
            </form>
            {cameraType === "webCamera" ? (
              <Formik
                initialValues={{
                  cameraID: "",
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
                    <Stack direction="column" spacing={1}>
                      <Typography>Select camera</Typography>
                      <Stack direction="row" spacing={1}>
                        <IconButton>
                          <AddAPhotoIcon />
                        </IconButton>
                        <TextField
                          variant="standard"
                          id="Name"
                          label="name"
                          error={errors.name && touched.name}
                          helperText={
                            touched.name && errors.name ? errors.name : ""
                          }
                          onChange={handleChange("name")}
                        />
                        <TextField
                          variant="standard"
                          id="cameraID"
                          label="id"
                          error={errors.cameraID && touched.cameraID}
                          helperText={
                            touched.cameraID && errors.cameraID
                              ? errors.cameraID
                              : ""
                          }
                          onChange={handleChange("cameraID")}
                        />
                      </Stack>
                      <HeightBox height={15} />

                      <Stack direction="row" justifyContent="space-between">
                        <CustomButton
                          type="submit"
                          variant="contained"
                          size="large"
                          onClick={handleSubmit}
                          disabled={loading}
                          sx={{ backgroundColor: "#6C63FF" }}
                        >
                          ADD
                        </CustomButton>
                      </Stack>

                      <CustomButton
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: "#6C63FF" }}
                      >
                        Next
                      </CustomButton>
                    </Stack>
                  );
                }}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  name: "",
                  link: "",
                  username: "",
                  password: "",
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
                    <Stack direction="column" spacing={1}>
                      <TextField
                        variant="standard"
                        id="name"
                        label="Camera Name"
                        error={errors.name && touched.name}
                        helperText={
                          touched.name && errors.namw ? errors.namw : ""
                        }
                        onChange={handleChange("name")}
                      />
                      <TextField
                        variant="standard"
                        id="link"
                        label="Link"
                        error={errors.link && touched.link}
                        helperText={
                          touched.link && errors.link ? errors.link : ""
                        }
                        onChange={handleChange("link")}
                      />
                      <TextField
                        variant="standard"
                        id="username"
                        label="Username"
                        error={errors.username && touched.username}
                        helperText={
                          touched.username && errors.username
                            ? errors.username
                            : ""
                        }
                        onChange={handleChange("username")}
                      />
                      <TextField
                        variant="standard"
                        type="password"
                        id="password"
                        label="Password"
                        error={errors.password && touched.password}
                        helperText={
                          touched.password && errors.password
                            ? errors.password
                            : ""
                        }
                        onChange={handleChange("password")}
                      />
                      <HeightBox height={15} />
                      <div style={{ width: "50%" }}>
                        <Stack direction="row">
                          <CustomButton
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{ backgroundColor: "#6C63FF" }}
                          >
                            ADD
                          </CustomButton>
                        </Stack>
                      </div>
                      <CustomButton
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={() => {
                          navigate("/dashboard/camera");
                        }}
                        sx={{ backgroundColor: "#6C63FF" }}
                      >
                        Next
                      </CustomButton>
                    </Stack>
                  );
                }}
              </Formik>
            )}
          </Stack>
        </div>
        <div
          style={{
            width: "40%",
            position: "absolute",
            top: "20%",
            left: "45%",
            paddingLeft: "2%",
            borderLeft: "1px solid #6C63FF",
          }}
        >
          <h2> Total number of cameras {cameras.length}</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Camera ID</TableCell>
                  <TableCell align="right">Camera Name</TableCell>
                  <TableCell align="right">Camera Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cameras.map((camera) => (
                  <TableRow
                    key={camera.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {camera.id}
                    </TableCell>
                    <TableCell align="right">{camera.name}</TableCell>
                    <TableCell align="right">{camera.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Stack>
    </div>
  );
}
