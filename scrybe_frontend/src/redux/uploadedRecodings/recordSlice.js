import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recordServices from "./service";

const initialState = {
  recordings: [],
  status: null,
  deleteStatus: null,
  error: null,
  isLoading: false,
};

export const fetchRecordings = createAsyncThunk(
  "recordings/fetchRecordings",
  async (thunkAPI) => {
    try {
      return await recordServices.fetchUserRecordings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.detail);
    }
  }
);

export const deleteRecording = createAsyncThunk(
  "recordings/deleteRecording",
  async (id, thunkAPI) => {
    try {
      return await recordServices.deleteRecording(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.detail);
    }
  }
);

export const recordSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    resetRecordings: (state) => {
      state.status = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecordings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecordings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.recordings = action.payload;
      })
      .addCase(fetchRecordings.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteRecording.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecording.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteStatus = "success";
        state.recordings = state.recordings.filter(
          (recording) => recording.id !== action.payload
        );
      })
      .addCase(deleteRecording.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetRecordings } = recordSlice.actions;

export const selectRecordingsState = (state) => state.recordAPI;

export default recordSlice.reducer;
