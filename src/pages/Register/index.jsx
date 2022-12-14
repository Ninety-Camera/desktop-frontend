import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import REGISTER_IMAGE from "../../assets/images/loginBG.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import "@fontsource/inter";
import { registerUser, updateSystemStatus } from "../../reducers/userSlice";
import { Helmet } from "react-helmet";
import api from "../../api";

const CustomTextField = styled(TextField)({
  width: "100%",
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
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("email").min(3).max(36),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .label("Password")
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
    ),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  async function createTheSystem() {
    if (!userState?.token) {
      return;
    }
    try {
      const response = await api.cctv.createSystem(
        { cameraCount: 0 },
        userState?.token
      );

      if (response?.data?.status === 201) {
        dispatch(updateSystemStatus(response?.data?.data));
        const systemResponse = await api.local_camera.sendSystemId(
          response?.data?.data?.CCTV_System?.id
        );
      } else {
        // error occured in creating the system
        setSnackMessage({
          type: "error",
          message: "Error occured while creating the system",
        });
        setOpenSnackBar(true);
      }
    } catch (error) {
      // Add a snack message saying that error occured
      setSnackMessage({ type: "error", message: "A network error occured" });
      setOpenSnackBar(true);
    }
  }

  useEffect(() => {
    if (userState?.email) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userState?.auth && !userState?.CCTV_System) {
      createTheSystem();
    } else if (userState?.auth && userState?.CCTV_System?.id) {
      setLoading(false);
      navigate("/dashboard/camera");
    } else if (userState?.dataStatus === "error") {
      // Error occured
      setLoading(false);
      setSnackMessage({ type: "error", message: "Error occured!" });
      setOpenSnackBar(true);
    }
  }, [userState]);

  function handleClick() {
    setLoading(true);
  }

  async function signUpUser(user) {
    if (userState?.email) {
      navigate("/");
    }
    setLoading(true);
    setTimeout(() => {
      setSnackMessage({ type: "error", message: "An unknown error occured!" });
      setOpenSnackBar(true);
      setLoading(false);
    }, 10000);
    try {
      dispatch(registerUser(user));
    } catch (error) {
      setLoading(false);
      setSnackMessage({ type: "error", message: error.message });
      setOpenSnackBar(true);
    }
  }

  return (
    <div>
      <Helmet>
        <style>
          {"body { background-image: " +
            `url(${REGISTER_IMAGE})` +
            "; overflow: hidden; background-repeat: no-repeat; background-size: cover}"}
        </style>
      </Helmet>
      <Stack direction="column">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Paper
            variant="outlined"
            sx={{
              minWidth: 400,
              width: "30%",
              position: "absolute",
              top: "10%",
              left: "35%",
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
                  Register With Us
                </h2>
                <SnackBarComponent
                  type={snackMessage.type}
                  message={snackMessage.message}
                  open={openSnackBar}
                  setOpen={setOpenSnackBar}
                />
              </div>
              <HeightBox height={30} />
              <Stack direction="column" spacing={2}>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values) => {
                    handleClick();
                    const user = {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                      password: values.password,
                    };
                    signUpUser(user);
                    console.log(user);
                  }}
                  validationSchema={validationSchema}
                >
                  {(formikProps) => {
                    const { errors, handleSubmit, handleChange, touched } =
                      formikProps;

                    return (
                      <React.Fragment>
                        <CustomTextField
                          label="First Name"
                          id="firstName"
                          variant="outlined"
                          error={errors.firstName && touched.firstName}
                          helperText={
                            touched.firstName && errors.firstName
                              ? errors.firstName
                              : ""
                          }
                          onChange={(event) => handleChange("firstName")(event)}
                        />

                        <CustomTextField
                          label="Last Name"
                          id="lastName"
                          variant="outlined"
                          error={errors.lastName && touched.lastName}
                          helperText={
                            touched.lastName && errors.lastName
                              ? errors.lastName
                              : ""
                          }
                          onChange={(event) => handleChange("lastName")(event)}
                        />

                        <CustomTextField
                          label="Email"
                          id="email"
                          variant="outlined"
                          error={errors.email && touched.email}
                          helperText={
                            touched.email && errors.email ? errors.email : ""
                          }
                          onChange={(event) => handleChange("email")(event)}
                        />

                        <CustomTextField
                          label="Password"
                          variant="outlined"
                          id="password"
                          type="password"
                          error={errors.password && touched.password}
                          helperText={
                            touched.password && errors.password
                              ? errors.password
                              : ""
                          }
                          onChange={(event) => handleChange("password")(event)}
                        />

                        <CustomTextField
                          label="Confirm Password"
                          variant="outlined"
                          id="confirmPassword"
                          type="password"
                          error={
                            errors.confirmPassword && touched.confirmPassword
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                              ? errors.confirmPassword
                              : ""
                          }
                          onChange={(event) =>
                            handleChange("confirmPassword")(event)
                          }
                        />

                        <Stack direction="row">
                          <Button
                            sx={{ width: "100%" }}
                            variant="text"
                            style={{ textTransform: "none" }}
                            onClick={() => navigate("/")}
                          >
                            Sign In
                          </Button>
                          <CustomButton
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            // onClick={()=> navigate("/dashboard")} //should remove later
                            disabled={loading}
                            sx={{ backgroundColor: "#6C63FF" }}
                          >
                            {loading ? <CircularProgress /> : "Register"}
                          </CustomButton>
                        </Stack>
                      </React.Fragment>
                    );
                  }}
                </Formik>
                <HeightBox height={15} />
              </Stack>
            </div>
          </Paper>
        </Stack>

        <HeightBox height={15} />
      </Stack>
    </div>
  );
}
