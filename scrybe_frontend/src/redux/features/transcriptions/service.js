import {
  GetTransciptApi,
  GetTranscriptionApi,
} from "../../axios/apis/transciptions";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import { setTranscript, setTranscription } from "./transcriptionSlice";

export const GetTranscript = (id) => async () => {
  try {
    const res = await GetTransciptApi(id);
    setTranscript(res.data.detail);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetTransciption = (id) => async () => {
  try {
    const res = await GetTranscriptionApi(id);
    dispatch(setTranscription(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
