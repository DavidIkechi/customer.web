import {
  CreateOrderApi,
  CreatePaymentEndpointApi,
  VerifyOrderApi,
} from "../../axios/apis/orders";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import { setPaymentEndpoint } from "./orderSlice";

export const CreateOrder = (data) => async () => {
  try {
    const res = await CreateOrderApi(data);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const VerifyOrder = (data) => async () => {
  try {
    const res = await VerifyOrderApi(data);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const createPaymentEndpoint = (url, data) => async () => {
  try {
    const res = await CreatePaymentEndpointApi(url, data);
    dispatch(setPaymentEndpoint(res.data.detail));
    console.log(res);
    if (res.data.detail?.payment_url)
      // window.location.replace = res.data.detail?.payment_url;
      window.location.assign(res.data.detail?.payment_url);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
