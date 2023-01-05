import { TryforFreeApi, UploadAudiosApi } from "../../axios/apis/analyze";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";

export const UploadAudio = (data) => async () => {
  try {
    const res = await UploadAudiosApi(data);
    console.log(res.data);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const TryforFree = (data) => async () => {
  try {
    const res = await TryforFreeApi(data);
    console.log(res.data);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
