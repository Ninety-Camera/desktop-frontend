import React from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import BGIMAGE from "../../assets/images/systemBG.jpg";
import { Formik } from "formik";

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

export default function SystemConfigure() {
  const [cameraType, setCameraType] = React.useState("webCamera");
  const [cameraID, setCameraID] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [cameras, setCameras] = React.useState([
    {
      cameraID: "123",
      cameraType: "Web Camera",
    },
    {
      cameraID: "125",
      cameraType: "Web Camera",
    },
  ]);

  const handleChange = (event) => {
    setCameraType(event.target.value);
  };

  const handleIDChange = (event) => {
    setCameraID(event.target.value);
  };

  const handleAdd = () => {
    // this.newUsers.push({email: {email}, role: "additional"})
    setCameras((current) => [
      ...current,
      { cameraID: cameraID, cameraType: cameraType },
    ]);
    //addCamera(cameraID, cameraType)
    document.getElementById("cameraID").value = "";
  };

  return (
    <div
      style={{
        alignContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundImage: `url(${BGIMAGE})`,
        backgroundSize: "contain",
        height: 775,
        width: 1550,
      }}
    >
      <div
        style={{
          alignContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          left: "10%",
        }}
      >
        <h1>Add your cameras here...</h1>
      </div>
      <Stack direction="row" spacing={5}>
        <div style={{ width: "50%", alignContent: "center" }}>
          <form action="">
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

                {cameraType === "webCamera" ? (
                  <Formik
                    initialValues={{
                      cameraID: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {(formik) => (
                      <Stack direction="column" spacing={1}>
                        <Typography>Select camera</Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton>
                            <AddAPhotoIcon />
                          </IconButton>
                          <TextField
                            variant="standard"
                            id="cameraID"
                            label="id"
                            onChange={handleIDChange}
                          />
                        </Stack>
                        <HeightBox height={15} />

                        <div style={{ width: "50%" }}>
                          <Stack direction="row">
                            <CustomButton
                              // type="submit"
                              variant="contained"
                              size="large"
                              onClick={handleAdd}
                              disabled={loading}
                              sx={{ backgroundColor: "#6C63FF" }}
                            >
                              {/* {loading ? <CircularProgress /> : "Sign In"} */}
                              ADD
                            </CustomButton>
                            <Button
                              sx={{ width: "100%" }}
                              variant="text"
                              style={{ textTransform: "none" }}
                              // onClick={() => navigate("/register")}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </div>
                      </Stack>
                    )}
                  </Formik>
                ) : (
                  <Formik
                    initialValues={{
                      link: "",
                      username: "",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {(formik) => (
                      <Stack direction="column" spacing={1}>
                        
                        <TextField variant="standard" id="link" label="link" onChange={handleIDChange} />
                        <TextField
                          variant="standard"
                          id="username"
                          label="Username"
                        />
                        <TextField
                          variant="standard"
                          type="password"
                          id="password"
                          label="Password"
                        />
                        <HeightBox height={15} />
                        <div style={{ width: "50%" }}>
                          <Stack direction="row">
                            <CustomButton
                              
                              variant="contained"
                              size="large"
                              onClick={handleAdd}
                              disabled={loading}
                              sx={{ backgroundColor: "#6C63FF" }}
                            >
                              ADD
                            </CustomButton>
                            <Button
                              sx={{ width: "100%" }}
                              variant="text"
                              style={{ textTransform: "none" }}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </div>
                      </Stack>
                    )}
                  </Formik>
                )}
              </FormControl>
            </Stack>
          </form>
        </div>
        <div
          style={{
            width: "30%",
            position: "absolute",
            top: "20%",
            left: "45%",
            paddingLeft: "2%",
            borderLeft: "1px solid #6C63FF",
          }}
        >
          <h2> Total number of cameras {cameras.length}</h2>
          <TableContainer component={Paper} sx={{ padding: "5%" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Camera ID</TableCell>
                  <TableCell align="right">Camera Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cameras.map((camera) => (
                  <TableRow
                    key={camera.cameraID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {camera.cameraID}
                    </TableCell>

                    <TableCell align="right">{camera.cameraType}</TableCell>
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
