import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: sessionStorage.getItem("heedAccessToken") || null,
  response: {
    message: "",
    type: "",
  },
  isLoading: false,
  navLoading: false,
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
  },
});

export const { setNavLoading, setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
