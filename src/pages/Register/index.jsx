import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import REGISTER_IMAGE from "../../assets/images/register.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import "@fontsource/inter";

const CustomTextField = styled(TextField)({
  width: 375,
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
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string()
    .required()
    .email("Must be a valid email")
    .label("email")
    .min(3)
    .max(36),
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
  //   const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      <BlackHorizontalBar phrase="Ninety Camera" />
      <HeightBox height={40} />
      <Stack direction="row" spacing={15}>
        <div style={{ padding: 100 }}>
          <img src={REGISTER_IMAGE} alt="" style={{ width: "40vw" }} />
        </div>
        <div style={{ paddingLeft: "100px", paddingTop: 50 }}>
          <h2 style={{ fontSize: 48, fontFamily: "Inter", margin: 0 }}>
            Register With Us
          </h2>
          <HeightBox height={30} />
          <Stack direction="column" spacing={2}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                const data = {
                  email: values.email,
                  password: values.password,
                };
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
                      variant="outlined"
                      error={errors.firstName && touched.firstName}
                      helperText={errors.firstName || ""}
                      onChange={(event) => handleChange("firstName")(event)}
                    />

                    <CustomTextField
                      label="Last Name"
                      variant="outlined"
                      error={errors.lastName && touched.lastName}
                      helperText={errors.lastName || ""}
                      onChange={(event) => handleChange("lastName")(event)}
                    />

                    <CustomTextField
                      label="email"
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={errors.email || ""}
                      onChange={(event) => handleChange("email")(event)}
                    />

                    <CustomTextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      error={errors.password && touched.password}
                      helperText={errors.password || ""}
                      onChange={(event) => handleChange("password")(event)}
                    />

                    <CustomTextField
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={errors.confirmPassword || ""}
                      onChange={(event) =>
                        handleChange("confirmPassword")(event)
                      }
                    />

                    <CustomButton
                      type="submit"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      // onClick={()=> navigate("/dashboard")} //should remove later
                      disabled={loading}
                      sx={{ backgroundColor: "#6C63FF" }}
                    >
                      {loading ? <CircularProgress /> : "Sign Up"}
                    </CustomButton>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Stack>

          <HeightBox height={15} />
          <div style={{ fontSize: 15, width: 350 }}>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <p style={{ margin: 0 }}>Already have an account?</p>
              <Link href="/" underline="hover" color="black">
                Login
              </Link>
            </Stack>
          </div>
          <HeightBox height={15} />
        </div>
      </Stack>
    </div>
  );
}
