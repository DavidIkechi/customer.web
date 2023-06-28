import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transcipt: null,
  transcription: {},
};

const transciptionSlice = createSlice({
  name: "transciption",
  initialState,
  reducers: {
    setTranscript: (state, action) => {
      state.transcipt = action.payload;
    },
    setTranscription: (state, action) => {
      state.transcription = action.payload;
    },
  },
});

export const { setTranscript, setTranscription } = transciptionSlice.actions;

export default transciptionSlice.reducer;
