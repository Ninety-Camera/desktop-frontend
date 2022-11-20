import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LOGIN_IMAGE from "../../assets/images/loginBG.svg";
import { Stack, Typography } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import DialogTitle from "@mui/material/DialogTitle";

import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import "@fontsource/inter";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { getLocalUser, loginUser } from "../../reducers/userSlice";
import { Helmet } from "react-helmet";
import api from "../../api";

const CustomTextField = styled(TextField)({
  width: "100%",
  height: "5%",
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

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email").min(3).max(36),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .matches(/\d+/, "Password should contain at least one number")
    .matches(
      /[a-z]+/,
      "Password should contain at least one lowercase character"
    )
    .matches(
      /[A-Z]+/,
      "Password should contain at least one uppercase character"
    )
    .matches(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    )
    .label("Password"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [timeoutAded, setTimeOutAdded] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(true);
  const [rechecking, setRecheking] = useState(false);
  const [disableSignUp, setDisableSignup] = useState(true);

  useEffect(() => {
    if (userState?.dataStatus === "success" || userState?.dataStatus == "") {
      if (!userState?.email) {
        setDisableSignup(false);
      }
    }
  }, [userState]);

  async function checkServer() {
    setRecheking(true);
    try {
      const response = await api.local_user.checkServer();
      if (response?.status === 200) {
        // Server running success
        setOpenDialog(false);
      } else {
        // Show thedialog
        setOpenDialog(true);
      }
    } catch (error) {
      // show the dialog
      setOpenDialog(true);
    }
    setRecheking(false);
  }

  useEffect(() => {
    checkServer();
    setLoading(true);
    dispatch(getLocalUser());
  }, []);

  async function sendForgotPasswordEmail(values) {
    setLoading(true);
    const data = { email: values?.resetPasswordMail };
    try {
      const response = await api.user.sendResetPasswordEmail(data);
      if (response?.data?.status === 200) {
        navigate("/resetPW", {
          state: {
            id: response?.data?.data?.user?.id,
            email: data.email,
          },
        });
      }
    } catch (error) {}
    setLoading(false);
  }

  useEffect(() => {
    if (
      userState?.auth &&
      userState?.CCTV_System?.id &&
      userState?.role === "OWNER"
    ) {
      setLoading(false);
      navigate("/dashboard/camera");
    } else if (userState?.dataStatus === "error") {
      setLoading(false);
    } else if (userState?.auth && userState?.CCTV_System?.id) {
      setLoading(false);
    } else if (!userState?.auth) {
      if (!timeoutAded) {
        setTimeOutAdded(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
  }, [userState]);

  async function signInUser(data) {
    if (userState?.email !== "" && userState?.email !== data.email) {
      setSnackMessage({
        type: "error",
        message: "You cannot log in to this system",
      });
      setOpenSnackBar(true);

      return;
    }
    setLoading(true);
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      setLoading(false);
      setSnackMessage({
        type: "error",
        message: "Invalid username or password!",
      });
      setOpenSnackBar(true);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleClick() {
    setLoading(true);
  }

  return (
    <div>
      <Dialog
        onClose={() => {
          setOpenDialog(true);
          checkServer();
        }}
        open={openDialog}
      >
        <DialogTitle>Server not found</DialogTitle>
        <DialogContent>
          <Typography variant="p">
            Please run Ninety Camera server package to run this
          </Typography>
          <HeightBox height={20} />
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              onClick={checkServer}
              disabled={rechecking}
              sx={{ width: 200 }}
            >
              {rechecking ? <CircularProgress /> : "Recheck"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Helmet>
        <style>
          {"body { background-image: " +
            `url(${LOGIN_IMAGE})` +
            "; overflow: hidden; background-repeat: no-repeat; background-size: cover}"}
        </style>
      </Helmet>
      <Paper
        variant="outlined"
        sx={{
          minWidth: 350,
          width: "24%",
          position: "absolute",
          top: "20%",
          left: "38%",
          elevation: 15,
        }}
      >
        <div style={{ paddingLeft: "10%", paddingTop: 50, width: "80%" }}>
          <div style={{ width: "100%", alignContent: "center" }}>
            <h2
              style={{
                fontSize: 36,
                fontFamily: "Inter",
                margin: 0,
                alignSelf: "center",
              }}
            >
              Welcome Back!
            </h2>
            <SnackBarComponent
              type={snackMessage.type}
              message={snackMessage.message}
              open={openSnackBar}
              setOpen={setOpenSnackBar}
            />
          </div>
          <HeightBox height={10} />

          <HeightBox height={20} />
          <Stack direction="column" spacing={2}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                signInUser(values);
              }}
              validationSchema={validationSchema}
            >
              {(formikProps) => {
                const { errors, handleSubmit, handleChange, touched } =
                  formikProps;

                return (
                  <React.Fragment>
                    <CustomTextField
                      label="Email"
                      id="Email"
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={touched.email ? errors.email : ""}
                      onChange={(event) => handleChange("email")(event)}
                    />

                    <CustomTextField
                      label="Password"
                      id="Password"
                      variant="outlined"
                      type="password"
                      error={errors.password && touched.password}
                      helperText={touched.password ? errors.password : ""}
                      onChange={(event) => handleChange("password")(event)}
                    />
                    <Stack directon="row">
                      <div style={{ width: "100%" }}></div>
                      <Button
                        sx={{ width: "100%" }}
                        variant="text"
                        style={{ textTransform: "none" }}
                        onClick={handleClickOpen}
                      >
                        Forgot Password?
                      </Button>
                    </Stack>
                    <Stack direction="row">
                      <Button
                        sx={{ width: "100%" }}
                        variant="text"
                        disabled={disableSignUp || userState?.email !== ""}
                        style={{ textTransform: "none" }}
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </Button>
                      <CustomButton
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ backgroundColor: "#6C63FF" }}
                      >
                        {loading ? <CircularProgress /> : "Sign In"}
                      </CustomButton>
                    </Stack>
                  </React.Fragment>
                );
              }}
            </Formik>

            <Formik
              initialValues={{
                resetPasswordMail: "",
              }}
              validationSchema={Yup.object().shape({
                resetPasswordMail: Yup.string()
                  .required()
                  .email()
                  .label("e-mail Address")
                  .min(3)
                  .max(36),
              })}
              onSubmit={(values) => {
                sendForgotPasswordEmail(values);
              }}
            >
              {(formikProps) => {
                const { errors, handleSubmit, handleChange, touched } =
                  formikProps;
                return (
                  <React.Fragment>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogContent>
                        <DialogContentText>
                          Please Enter your email here to reset password
                        </DialogContentText>

                        <TextField
                          autoFocus
                          margin="dense"
                          id="resetPasswordMail"
                          label="E-mail"
                          type="email"
                          fullWidth
                          variant="standard"
                          error={
                            errors.resetPasswordMail &&
                            touched.resetPasswordMail
                          }
                          helperText={
                            touched.resetPasswordMail
                              ? errors.resetPasswordMail
                              : ""
                          }
                          onChange={(event) =>
                            handleChange("resetPasswordMail")(event)
                          }
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress /> : "Continue"}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Stack>

          <HeightBox height={15} />
        </div>
      </Paper>
    </div>
  );
}
