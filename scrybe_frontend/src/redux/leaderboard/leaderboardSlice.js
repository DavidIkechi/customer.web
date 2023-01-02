import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaderboardService from "./axiosRequest";

const initialState = {
  leaderboardData: [],
  status: null,
  error: null,
  loading: null,
};

export const getLeaderboard = createAsyncThunk(
  "agentLeaderboard/get",
  async (thunkAPI) => {
    try {
      return await leaderboardService.getLeaderboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const leaderboadSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.leaderboardData = action.payload;
        state.loading = null;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.leaderboardData = null;
        state.loading = null;
      });
  },
});

export default leaderboadSlice.reducer;
