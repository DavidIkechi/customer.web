import {
  GetTransciptApi,
  GetTranscriptionApi,
} from "../../axios/apis/transciptions";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";

export const GetTranscipt = (id) => async () => {
  try {
    const res = await GetTransciptApi(id);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetTransciption = (id) => async () => {
  try {
    const res = await GetTranscriptionApi(id);
    console.log(res.data.sentiment_result);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
