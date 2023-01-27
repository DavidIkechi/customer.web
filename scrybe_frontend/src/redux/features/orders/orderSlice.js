import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  order: {},
  orderError: null,
  paymentUrl: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setOrderError: (state, action) => {
      state.orderError = action.payload;
    },
    setPaymentEndpoint: (state, action) => {
      state.paymentUrl = action.payload;
    },
  },
});

export const { setOrder, setOrderError, setOrders, setPaymentEndpoint } =
  orderSlice.actions;

export default orderSlice.reducer;
