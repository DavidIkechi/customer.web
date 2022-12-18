import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { headers } from "../.././helpers/axioshelp";
import authServices from "./service";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
  status: null,
  error: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = null;
        state.userData = null;
        state.status = "failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.userData = null;
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.userData = null;
      });
    // [getUser.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [getUser.fulfilled]: (state, action) => {
    //   state.status = "success";
    //   state.userData = action.payload;
    // },
    // [getUser.rejected]: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // },
  },
});

// export const { loginUser, registerUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
