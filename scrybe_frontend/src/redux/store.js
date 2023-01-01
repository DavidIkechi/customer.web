import { configureStore } from "@reduxjs/toolkit";
import { recordAPI } from "./uploadedRecodings/rtkquery";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [recordAPI.reducerPath]: recordAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordAPI.middleware),
  devTools: true,
});

export default store;
