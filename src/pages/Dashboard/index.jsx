import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainListItems from "./listItems";
import { Button } from "@mui/material";
import { DASHBOARD_ROUTES } from "../../constants";
import CameraSection from "./sections/camera";
import IntrusionSection from "./sections/intrusion";
import Settings from "./sections/settings";
import ProcessedVideo from "./sections/processedVideo";
import { logOutUser } from "../../reducers/userSlice";
import { getCameras } from "../../reducers/cameraSlice";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const cameraState = useSelector((state) => state.camera);
  const disptach = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [openPane, setOpenPane] = React.useState(<CameraSection />);
  const location = useLocation();

  console.log("Camera state is: ", cameraState);

  React.useEffect(() => {
    if (!userState?.auth) {
      navigate("/");
    } else {
      if (userState) {
        console.log("User state", userState);
        disptach(
          getCameras({
            systemId: userState?.CCTV_System?.id,
            token: userState?.token,
          })
        );
      }
    }
  }, [userState]);

  React.useEffect(() => {
    const params = location.pathname.split("/");

    if (params.length === 3) {
      const subComponent = params[2];
      switch (subComponent) {
        case DASHBOARD_ROUTES.CAMERA:
          setOpenPane(<CameraSection />);
          break;
        case DASHBOARD_ROUTES.INTRUSIONS:
          setOpenPane(<IntrusionSection />);
          break;
        case DASHBOARD_ROUTES.SETTINGS:
          setOpenPane(<Settings />);
          break;
        case DASHBOARD_ROUTES.PROCESSEDVIDEOS:
          setOpenPane(<ProcessedVideo />);
          break;
        default:
          break;
      }
    }
  }, [location]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon color="inherit" />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ textTransform: "none" }}
            onClick={() => {
              disptach(logOutUser());
            }}
            data-testid="toggleBtn"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon color="secondary" />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {openPane}
      </Box>
    </Box>
  );
}
