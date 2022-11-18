import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Form, Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LOGIN_IMAGE from "../../assets/images/loginBG.svg";
import { Stack, Typography } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import "@fontsource/inter";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { getLocalUser, loginUser, logOutUser } from "../../reducers/userSlice";
import { Helmet } from "react-helmet";

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

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getLocalUser());
  // }, []);

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
      // Not allowed to sign in
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

  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  async function signInUser(data) {
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
                handleClick();
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
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={touched.email ? errors.email : ""}
                      onChange={(event) => handleChange("email")(event)}
                    />

                    <CustomTextField
                      label="Password"
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
                        style={{ textTransform: "none" }}
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </Button>
                      <CustomButton
                        // loading={loading}
                        // loadingIndicator="Signing in..."
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ backgroundColor: "#6C63FF" }}
                      >
                        {/* Sign In */}
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
                // setResetPWMail(values.resetPasswordMail);
                console.log(values.resetPasswordMail);
                navigate("/resetPW");
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
                          label="e-mail Address"
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
                        <Button type="submit" onClick={handleSubmit}>
                          Continue
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
