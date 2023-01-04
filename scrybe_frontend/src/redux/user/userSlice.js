import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./service";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
  loginStatus: null,
  registerStatus: null,
  getuserStatus: null,
  error: null,
  logoutStatus: null,
  isLoading: false,
  token: sessionStorage.getItem("heedAccessToken") || null,
};

// fech user data from backend
export const getUser = createAsyncThunk("user/getUser", async (thunkAPI) => {
  try {
    return await authServices.getuser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerDetails, thunkAPI) => {
    try {
      return await authServices.register(registerDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginDetails, thunkAPI) => {
    try {
      return await authServices.login(loginDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  return authServices.logout();
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.status = null;
      state.error = null;
      state.isLoading = false;
      state.loginStatus = null;
      state.registerStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getuserStatus = "loading";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null;
        state.getuserStatus = "success";
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.userData = null;
        state.getuserStatus = "failed";
        state.isLoading = false;
        state.token = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.registerStatus = "success";
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.userData = null;
        state.registerStatus = "failed";
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.loginStatus = "success";
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loginStatus = "failed";
        state.userData = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.logoutStatus = null;
        state.error = null;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.logoutStatus = "failed";
        state.userData = null;
        state.isLoading = false;
      });
  },
});

export const { resetUser } = userSlice.actions;

export const selectUserState = (state) => state.auth;
export const selectUserToken = (state) => state.auth.token;

export default userSlice.reducer;
