import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import REGISTER_IMAGE from "../../assets/images/loginBG.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import "@fontsource/inter";
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
  code: Yup.number().positive().required("Validation code is required."),
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

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState();
  const [requestNewCode, setRequestNeCode] = useState(false);

  function createTimer() {
    setTimeout(() => {
      setRequestNeCode(true);
    }, 1000 * 60 * 5);
  }

  useEffect(() => {
    createTimer();
  }, []);

  async function resendNewCode() {
    const data = { email: userData?.email };
    try {
      const response = await api.user.sendResetPasswordEmail(data);
      if (response?.data?.status === 200) {
        createTimer();
      }
    } catch (error) {}
  }

  const { state } = location;

  useEffect(() => {
    setUserData(state);
  }, [state]);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  async function resetPassword(data) {
    setLoading(true);
    const resetData = {
      token: data.code,
      userId: userData?.id,
      password: data.password,
    };

    try {
      const response = await api.user.resetUserPassword(resetData);
      if (response?.data?.status === 200) {
        setSnackMessage({ type: "success", message: response?.data?.data });
        setOpenSnackBar(true);
      } else {
        setSnackMessage({ type: "error", message: response?.data?.data });
        setOpenSnackBar(true);
      }
    } catch (error) {
      setSnackMessage({ type: "error", message: "An unknown error occured" });
      setOpenSnackBar(true);
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        overflow: "hidden",
        background: "6C63FF",
        backgroundImage: `url(${REGISTER_IMAGE})`,

        backgroundSize: "contain",
        height: 775,
        width: 1550,
      }}
    >
      <SnackBarComponent
        type={snackMessage.type}
        message={snackMessage.message}
        open={openSnackBar}
        setOpen={setOpenSnackBar}
      />
      <Stack direction="column">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Paper
            variant="outlined"
            sx={{
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
                  Reset Password
                </h2>
              </div>
              <HeightBox height={30} />
              <Stack direction="column" spacing={2}>
                <Formik
                  initialValues={{
                    code: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values) => {
                    resetPassword(values);
                  }}
                  validationSchema={validationSchema}
                >
                  {(formikProps) => {
                    const { errors, handleSubmit, handleChange, touched } =
                      formikProps;

                    return (
                      <React.Fragment>
                        <CustomTextField
                          label="Verification Code"
                          variant="outlined"
                          error={errors.code && touched.code}
                          helperText={
                            touched.code && errors.code ? errors.code : ""
                          }
                          onChange={(event) => handleChange("code")(event)}
                        />

                        <CustomTextField
                          label="Password"
                          variant="outlined"
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
                        <Stack directon="row">
                          <Button
                            sx={{ width: "100%" }}
                            variant="text"
                            disabled={!requestNewCode}
                            style={{ textTransform: "none" }}
                            onClick={resendNewCode}
                          >
                            Resend Validation Code
                          </Button>
                        </Stack>
                        <Stack direction="row">
                          <Button
                            sx={{ width: "100%" }}
                            variant="text"
                            style={{ textTransform: "none" }}
                            onClick={() => navigate("/")}
                          >
                            Cancel
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
                            {loading ? <CircularProgress /> : "Reset"}
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
