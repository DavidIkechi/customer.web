import {
  createPaymentEndpointApi,
  verifyFluterwaveOrderApi,
  verifyStripeOrderApi,
} from "../../axios/apis/orders";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse, setLoading } from "../../utils/UtilSlice";
import { setOrder } from "./orderSlice";

export const createPaymentEndpoint = (url, data) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await createPaymentEndpointApi(url, data);
    console.log(res);
    if (res.data.detail?.payment_url)
      window.location.assign(res.data.detail?.payment_url);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const verifyStripeOrder = (ref_code) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await verifyStripeOrderApi(ref_code);
    console.log(res);
    dispatch(setOrder(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const verifyFluterwaveOrder = (ref_code) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await verifyFluterwaveOrderApi(ref_code);
    console.log(res);
    dispatch(setOrder(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};
