import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getSavedUser = createAsyncThunk(
  "user/getSavedUser",
  async () => {}
);

export const logOutUser = createAsyncThunk("user/logout", async () => {
  // const deleteResponse = await api.local_user.deleteUserDetails();
  return;
});

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const response = await api.user.signinUser(data);

  if (response?.data?.status === 200) {
    const user = response?.data?.data?.user;
    if (user?.role === "OWNER") {
      try {
        const localResponse = await api.local_user.sendUserDetails({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token: "Bearer " + response?.data?.data?.token,
          role: user?.role,
        });
      } catch (error) {}
    }
    return {
      ...response?.data?.data?.user,
      token: "Bearer " + response?.data?.data?.token,
    };
  }
  throw new Error("Login error!");
});

export const getLocalUser = createAsyncThunk(
  "user/getLocalUser",
  async (data) => {
    const response = await api.local_user.getLoogedInUserDetails();
    if (response?.status === 200) {
      const validResponse = await api.user.checkUserToken(response.data?.token);
      if (validResponse?.status == 200) {
        const system = await api.user.getCCTVSystem(
          response?.data?.userId,
          response.data?.token
        );
        if (system?.data?.status === 200) {
          return {
            ...response.data,

            token: "Bearer " + response?.data?.data?.token,
          };
        }
      } else {
        const deleteResponse = await api.local_user.deleteUserDetails();
      }
    }
    throw new Error("Registration error!");
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const response = await api.user.registerUser(data);
    if (response?.data?.status === 201) {
      // User Registration success
      const user = response?.data?.data?.user;
      try {
        const localResponse = await api.local_user.sendUserDetails({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token: "Bearer " + response?.data?.data?.token,
          role: "OWNER",
        });
      } catch (error) {
        console.log("Error occured: ", error);
      }

      return {
        ...response?.data?.data?.user,
        token: "Bearer " + response?.data?.data?.token,
      };
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
  dataStatus: null,
  CCTV_System: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      return { ...initialState };
    },
    updateSystemStatus: (state, { payload }) => {
      return { ...state, CCTV_System: { ...payload }, role: "OWNER" };
    },
    updateSystemRunningState: (state, { payload }) => {
      console.log("Payload is: ", payload);
      return {
        ...state,
        CCTV_System: {
          ...state.CCTV_System,
          status: payload,
        },
      };
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

    // Getting the local user
    builder.addCase(getLocalUser.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(getLocalUser.fulfilled, (state, { payload }) => {
      return { ...state, dataStatus: "success", ...payload, auth: true };
    });
    builder.addCase(getLocalUser.rejected, (state, action) => {
      return { ...state, dataStatus: "", auth: false };
    });

    // Logout user
    builder.addCase(logOutUser.pending, (state, action) => {
      return { ...state, dataStatus: "loading" };
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      return { ...initialState, dataStatus: "success" };
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      return { ...initialState, auth: false, dataStatus: "error" };
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, updateSystemStatus, updateSystemRunningState } =
  userSlice.actions;

export default userSlice.reducer;
