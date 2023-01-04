import AnalyzeService from "../../axios/apis/analyze";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";

export const UploadAudio = (data) => async () => {
  try {
    const res = await AnalyzeService.UploadAudios(data);
    console.log(res.data);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const TryforFree = (data) => async () => {
  try {
    const res = await AnalyzeService.TryforFree(data);
    console.log(res.data);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
