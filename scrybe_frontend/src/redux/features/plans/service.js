import {
  changePlanApi,
  deletePlanApi,
  getAllPlansApi,
  getPlanByIdApi,
  viewUserCurrentPlanApi,
} from "../../axios/apis/plans";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse, setLoading } from "../../utils/UtilSlice";
import { setPlan, setPlans } from "./planSlice";

export const changePlan = (data) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await changePlanApi(data);
    dispatch(createResponse(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const viewUserCurrentPlan = () => async () => {
  dispatch(setLoading(true));
  try {
    const res = await viewUserCurrentPlanApi();
    dispatch(setPlan(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const getAllPlans = (skip, limit) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await getAllPlansApi(skip, limit);
    dispatch(setPlans(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const getPlanById = (id) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await getPlanByIdApi(id);
    dispatch(setPlan(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const deletePlan = (id) => async () => {
  dispatch(setLoading(true));
  try {
    await deletePlanApi(id);
    dispatch(
      createResponse({ type: "success", message: "Plan deleted successfully" })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};
