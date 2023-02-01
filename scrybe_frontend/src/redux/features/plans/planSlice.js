import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [],
  plan: {},
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { setPlans, setPlan } = planSlice.actions;

export default planSlice.reducer;
