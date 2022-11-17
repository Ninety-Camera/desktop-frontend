import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import camera from "./cameraSlice";

export const store = configureStore({
  reducer: {
    user,
    camera,
  },
});
