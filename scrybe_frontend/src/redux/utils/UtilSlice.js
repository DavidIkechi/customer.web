import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: {
    message: "",
    type: "",
  },
  isLoading: false,
  searchQuery: "",
};

const UtilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    createResponse: (state, action) => {
      state.response = {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setLoading, createResponse, setSearchQuery } = UtilSlice.actions;

export default UtilSlice.reducer;
