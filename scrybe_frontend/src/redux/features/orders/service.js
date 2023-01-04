import OrderService from "../../axios/apis/orders";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";

export const CreateOrder = (data) => async () => {
  try {
    const res = await OrderService.Create(data);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const VerifyOrder = (data) => async () => {
  try {
    const res = await OrderService.VerifyOrder(data);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
