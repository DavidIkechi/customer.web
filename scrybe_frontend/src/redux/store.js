import { configureStore } from "@reduxjs/toolkit";
import { recordAPI } from "./uploadedRecodings/rtkquery";
import { userAPI } from "./user/rtkquery";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [recordAPI.reducerPath]: recordAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, recordAPI.middleware),
  devTools: true,
});

export default store;
