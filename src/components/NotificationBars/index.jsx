import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert sx={{ backgroundColor: "36C63FF" }} elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NotificationBars() {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Alert >
        This is an error message!
      </Alert>
      <Alert >This is a warning message!</Alert>
      <Alert >This is an information message!</Alert>
      <Alert >This is a success message!</Alert>
    </Stack>
  );
}
