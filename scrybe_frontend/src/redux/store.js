import { configureStore } from "@reduxjs/toolkit";
import { recordAPI } from "./uploadedRecodings/rtkquery";
import authReducer from "./user/userSlice";
import agentReducer from "./features/agents/agentSlice";
import analyzeReducer from "./features/analyze/analyzeSlice";
import audioReducer from "./features/audios/audioSlice";
import orderReducer from "./features/orders/orderSlice";
import transcriptionReducer from "./features/transcriptions/transcriptionSlice";
import utilReducer from "./utils/UtilSlice";
import userReducer from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer,
    analyze: analyzeReducer,
    audio: audioReducer,
    order: orderReducer,
    transciption: transcriptionReducer,
    util: utilReducer,
    [recordAPI.reducerPath]: recordAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordAPI.middleware),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;
