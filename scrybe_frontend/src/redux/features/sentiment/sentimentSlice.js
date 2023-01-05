import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentiment: null,
  totalAnalysis: null,
  newAnalysis: null,
};

const sentimentSlice = createSlice({
  name: "sentiment",
  initialState,
  reducers: {
    setSentiment: (state, action) => {
      state.sentiment = action.payload;
    },
    setTotalAnaylsis: (state, action) => {
      state.totalAnalysis = action.payload;
    },
    setNewAnalysis: (state, action) => {
      state.newAnalysis = action.payload;
    },
  },
});

export const { setNewAnalysis, setSentiment, setTotalAnaylsis } =
  sentimentSlice.actions;

export default sentimentSlice.reducer;
