import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getCameras = createAsyncThunk("user/getCameras", async (data) => {
  const cameraResponse = await api.camera.getCameras(data.systemId, data.token);
  if (cameraResponse?.data?.status === 200) {
    return cameraResponse?.data?.data?.cameras;
  }
  throw new Error("Camera getting error!");
});

export const deleteCamera = createAsyncThunk(
  "user/deleteCamera",
  async (data) => {
    const cameraResponse = await api.camera.deleteCamera(
      data.camId,
      data.token
    );
    if (cameraResponse?.data?.status === 200) {
      const localResponse = await api.local_camera.deleteCamera(data.camId);
      return data.camId;
    }
    throw new Error("Camera getting error!");
  }
);

const initialState = {
  cameras: [],
  dataStatus: "",
};

export const cameraSclice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    clearCamera: (state) => {
      return { ...initialState };
    },
    addCamera: (state, { payload }) => {
      return { cameras: [...state.cameras, payload] };
    },
  },
  extraReducers: (builder) => {
    // For getting the camers
    builder.addCase(getCameras.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(getCameras.fulfilled, (state, { payload }) => {
      return { ...state, dataStatus: "success", cameras: payload };
    });
    builder.addCase(getCameras.rejected, (state, action) => {
      return { ...state, dataStatus: "error" };
    });

    // For deleting the camers
    builder.addCase(deleteCamera.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(deleteCamera.fulfilled, (state, { payload }) => {
      return {
        ...state,
        dataStatus: "success",
        cameras: state.cameras.filter((item) => item.id !== payload),
      };
    });
    builder.addCase(deleteCamera.rejected, (state, action) => {
      return { ...state, dataStatus: "error" };
    });
  },
});

// Action creators are generated for each case reducer function
export const { addCamera, clearCamera } = cameraSclice.actions;

export default cameraSclice.reducer;
