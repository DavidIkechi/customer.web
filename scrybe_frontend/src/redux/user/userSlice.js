import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./service";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
  status: null,
  error: null,
  getUser: null,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUser = "loading";
        state.status = "loading";
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null;
        state.getUser = "success";
        state.status = "success";
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.userData = null;
        state.getUser = "failed";
        state.status = "failed";
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.getUser = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "success";
        state.error = null;
        state.getUser = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.userData = null;
        state.status = "failed";
        state.getUser = null;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.getUser = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.status = "success";
        state.error = null;
        state.getUser = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.userData = null;
        state.getUser = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.getUser = null;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.status = null;
        state.error = null;
        state.getUser = null;
        state.isLoading = false;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.userData = null;
        state.getUser = null;
        state.isLoading = false;
      });
  },
});

export const { resetUser } = userSlice.actions;

export const selectUserState = (state) => state.auth;

export default userSlice.reducer;
