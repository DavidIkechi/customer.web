import {
  DownloadApi,
  GetAnaylsisApi,
  TotalAnalysisApi,
} from "../../axios/apis/sentiment";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";

export const Download = (id) => async () => {
  try {
    const res = await DownloadApi(id);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const TotalAnalysis = () => async () => {
  try {
    const res = await TotalAnalysisApi();
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const NewAnalysis = (id) => async () => {
  try {
    const res = await GetAnaylsisApi(id);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
