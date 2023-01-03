import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./uploadedRecodings/recordSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    recordAPI: recordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

export default store;
