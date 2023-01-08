import {
  DownloadApi,
  GetAnaylsisApi,
  TotalAnalysisApi,
} from "../../axios/apis/sentiment";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import { setTotalAnaylsis } from "./sentimentSlice";

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
    dispatch(setTotalAnaylsis(res.data.detail));
    // console.log(res.data);
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
