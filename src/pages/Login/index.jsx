import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import LOGIN_IMAGE from "../../assets/images/login.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import "@fontsource/inter";

const CustomTextField = styled(TextField)({
  width: 350,
});

const CustomButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText([500]),
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

export default function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  function signInUser(data) {
    navigate("/dashboard");
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <BlackHorizontalBar
        title="Ninety Camera"
        buttonText="Register"
        buttonAction={() => navigate("/register")}
      />
      <div>
        <Stack
          direction="row"
          spacing={15}
          justifyContent="center"
          alignItems="center"
        >
          <div style={{ paddingLeft: "100px", paddingTop: 50 }}>
            <h2 style={{ fontSize: 48, fontFamily: "Inter", margin: 0 }}>
              Welcome Back!
            </h2>
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
                      <Button variant="text" style={{ textTransform: "none" }}>
                        Forgot Password?
                      </Button>
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
          <div style={{ padding: 100 }}>
            <img src={LOGIN_IMAGE} alt="" style={{ width: "45vw" }} />
          </div>
        </Stack>
      </div>
    </div>
  );
}
