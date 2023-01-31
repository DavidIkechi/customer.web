import api from "../axios";

export const changePlanApi = (data) => {
  return api.patch(`plans/change_plan`, { plan: data });
};

export const viewUserCurrentPlanApi = () => {
  return api.get(`plans/view_plan`);
};

export const getAllPlansApi = (skip, limit) => {
  return api.get(`plans/get_all_plans?skip=${skip}&limit=${limit}`);
};

export const getPlanByIdApi = (id) => {
  return api.get(`plans/get_plan_id/${id}`);
};

export const deletePlanApi = (id) => {
  return api.delete(`plans/delete_plan_id/${id}`);
};
