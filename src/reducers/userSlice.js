import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getSavedUser = createAsyncThunk(
  "user/getSavedUser",
  async () => {}
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const response = await api.user.signinUser(data);
  console.log("Response is: ", response);

  if (response?.data?.status === 200) {
    // User logging success
    const user = response?.data?.data?.user;
    console.log("In here", response);
    try {
      const localResponse = await api.local_user.sendUserDetails({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: "Bearer " + response?.data?.data?.token,
        role: user?.role,
      });
      console.log("Local response is: ", localResponse);
    } catch (error) {
      console.log("Error occured: ", error);
    }
    return response?.data?.data?.user;
  }
  throw new Error("Login error!");
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const response = await api.user.registerUser(data);
    console.log(response);
    if (response?.data?.status === 201) {
      // User Registration success

      return response?.data?.data?.user;
    }
    throw new Error("Registration error!");
  }
);

const initialState = {
  auth: false,
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  systemId: "",
  dataStatus: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      return { ...initialState };
    },
    updateSystemStatus: (state, { payload }) => {
      return { ...state, CCTV_System: { ...payload } };
    },
  },
  extraReducers: (builder) => {
    // For local login user
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      return { ...state, dataStatus: "success", auth: true, ...payload };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return { ...state, dataStatus: "error", auth: false };
    });

    // For checking already logged in user
    builder.addCase(getSavedUser.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(getSavedUser.fulfilled, (state, { payload }) => {
      return { ...state, dataStatus: "success", ...payload, auth: true };
    });
    builder.addCase(getSavedUser.rejected, (state, { payload }) => {
      return { ...state, dataStatus: "" };
    });

    // For registering user
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      return { ...state, dataStatus: "success", ...payload, auth: true };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return { ...state, dataStatus: "error" };
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, updateSystemStatus } = userSlice.actions;

export default userSlice.reducer;
