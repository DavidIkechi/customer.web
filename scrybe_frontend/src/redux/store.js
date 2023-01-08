import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import agentReducer from "./features/agents/agentSlice";
import analyzeReducer from "./features/analyze/analyzeSlice";
import audioReducer from "./features/audios/audioSlice";
import orderReducer from "./features/orders/orderSlice";
import transcriptionReducer from "./features/transcriptions/transcriptionSlice";
import utilReducer from "./utils/UtilSlice";
import sentimentReducer from "./features/sentiment/sentimentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer,
    analyze: analyzeReducer,
    audio: audioReducer,
    order: orderReducer,
    transcription: transcriptionReducer,
    util: utilReducer,
    sentiment: sentimentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;
