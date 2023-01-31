import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  token: sessionStorage.getItem("heedAccessToken") || null,
  isLoading: false,
  navLoading: false,
  error: null,
  updatedUser: null,
  resetUser: null,
  refreshApiKey: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNavLoading: (state, action) => {
      state.navLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUpdatedUser: (state, action) => {
      state.updatedUser = action.payload;
    },
    setResetPasswordUser: (state, action) => {
      state.resetUser = action.payload;
    },
    setRefreshApiKey: (state, action) => {
      state.refreshApiKey = action.payload;
    },
  },
});

export const {
  setNavLoading,
  setToken,
  setUser,
  setError,
  setUpdatedUser,
  setResetPasswordUser,
  setRefreshApiKey,
} = userSlice.actions;

export default userSlice.reducer;
