import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  status: null,
  error: null,
  getUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.status = null;
      state.error = null;
      state.getUser = null;
      state.userData = null;
      state.token = null;
    },
    setCredentials: (state, action) => {
      const { access_token } = action.payload;
      state.token = access_token;
    },
    logoutuser: (state) => {
      state.status = null;
      state.error = null;
      state.getUser = null;
      state.userData = null;
      state.token = null;
    },
  },
});

export const { resetUser, setCredentials, logoutuser } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.Token;
