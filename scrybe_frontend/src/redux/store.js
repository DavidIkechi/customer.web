import { configureStore } from "@reduxjs/toolkit";
import { recordAPI } from "./uploadedRecodings/rtkquery";
import userReducer from "./user/userSlice";
import leaderboardReducer from "./leaderboard/leaderboardSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    leaderboard: leaderboardReducer,
    [recordAPI.reducerPath]: recordAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordAPI.middleware),
  devTools: true,
});

export default store;
