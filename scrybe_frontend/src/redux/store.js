import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "./baseEndpoints";
import userReducer from "./user/userSlice";

// import userReducer from "./user/userSlice";
const store = configureStore({
  reducer: {
    auth: userReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

// setupListeners(store.dispatch);
export default store;
