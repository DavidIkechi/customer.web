import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderboard: null,
  totalAgentAnalysis: null,
  agent: null,
  agentDetails: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setLeaderBoard: (state, action) => {
      state.leaderboard = action.payload;
    },
    setTotalAgentAnaylsis: (state, action) => {
      state.totalAgentAnalysis = action.payload;
    },
    setAgent: (state, action) => {
      state.agent = action.payload;
    },
    setAgentDetails: (state, action) => {
      state.agentDetails = action.payload;
    },
  },
});

export const {
  setLeaderBoard,
  setTotalAgentAnaylsis,
  setAgent,
  setAgentDetails,
} = agentSlice.actions;

export default agentSlice.reducer;
