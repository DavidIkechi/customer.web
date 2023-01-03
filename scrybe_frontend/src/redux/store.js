import { configureStore } from "@reduxjs/toolkit";
import { recordAPI } from "./uploadedRecodings/rtkquery";
import userReducer from "./user/userSlice";
import recordReducer from "./uploadedRecodings/recordSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    recordAPI: recordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordAPI.middleware),
  devTools: true,
});

export default store;
