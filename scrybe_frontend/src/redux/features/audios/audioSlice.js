import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audios: [],
  audioError: null,
  uploadedAudios: [],
  audioSentiment: null,
  recentRecordings: [],
  totalRecordings: [],
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudios: (state, action) => {
      state.audios = action.payload;
    },
    setUploadedAudios: (state, action) => {
      state.uploadedAudios = action.payload;
    },
    setAudioSentiment: (state, action) => {
      state.audioSentiment = action.payload;
    },
    setRecentRecordings: (state, action) => {
      state.recentRecordings = action.payload;
    },
    setTotalRecordings: (state, action) => {
      state.totalRecordings = action.payload;
    },
    setAudiosError: (state, action) => {
      state.audioError = action.payload;
    },
  },
});

export const {
  setAudios,
  setAudiosError,
  setUploadedAudios,
  setAudioSentiment,
  setRecentRecordings,
  setTotalRecordings,
} = audioSlice.actions;

export default audioSlice.reducer;
