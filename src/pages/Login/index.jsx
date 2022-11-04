import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import LOGIN_IMAGE from "../../assets/images/loginBG.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import "@fontsource/inter";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

const CustomTextField = styled(TextField)({
  width: "100%",
  height: "5%",
});

const CustomButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText([500]),
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
  email: Yup.string()
    .required()
    .email("Must be a valid email")
    .label("email")
    .min(3)
    .max(36),
  password: Yup.string().required().min(8).max(15).label("Password"),
});

const user = [{ username: "user@gmail.com", password: "1234" }];

export default function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [resetPWMail, setResetPWMail] = useState("");

  function signInUser(data) {
    navigate("/dashboard/camera");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = () => {
    if (user[0].username === resetPWMail) {
      handleClose();
      alert("An email has sent to your given email address!");
    } else {
      alert("Invalid email address!");
    }
  };

  return (
    <div
      style={{
        overflow: "hidden",
        background: "6C63FF",
        backgroundImage: `url(${LOGIN_IMAGE})`,
        // backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: 675,
        width: 1550,
      }}
    >
      {/* <BlackHorizontalBar
        title="Ninety Camera"
        buttonText="Register"
        buttonAction={() => navigate("/register")}
      /> */}
      <div></div>
      <Paper
        variant="outlined"
        sx={{
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

                    <Dialog open={open} onClose={handleClose}>
                      <DialogContent>
                        <DialogContentText>
                          Please Enter your email here to reset password
                        </DialogContentText>

                        <TextField
                          autoFocus
                          margin="dense"
                          id="resetPWMail"
                          label="e-mail Address"
                          type="email"
                          fullWidth
                          variant="standard"
                          onChange={(e) => setResetPWMail(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCheck}>Continue</Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Stack>

          <HeightBox height={15} />
          <div style={{ fontSize: 15, width: 350 }}>
            <Stack direction="row" justifyContent="center" spacing={1}>
              {/* <p style={{ margin: 0 }}>Don't have an account?</p> */}
              {/* <Link href="/forgetPassword" underline="hover" color="black">
                Forget Password?
              </Link> */}
            </Stack>
          </div>
          <HeightBox height={15} />
        </div>
      </Paper>
    </div>
  );
}
