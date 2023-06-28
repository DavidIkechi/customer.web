import {
  DeleteAudioApi,
  GetAudioSentimentApi,
  GetUploadedAudiosApi,
  RecentRecordingsApi,
  TotalRecordingsApi,
  UserAudiosApi,
} from "../../axios/apis/audio";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse, setLoading } from "../../utils/UtilSlice";
import {
  setAudios,
  setAudioSentiment,
  setAudiosError,
  setRecentRecordings,
  setTotalRecordings,
  setUploadedAudios,
} from "./audioSlice";

export const GetUserAudios = () => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserAudiosApi();
    dispatch(setAudios(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setAudiosError(error.response.data.detail));
    dispatch(setLoading(false));
  }
};

export const GetUploadedAudios = () => async () => {
  try {
    const res = await GetUploadedAudiosApi();
    dispatch(setUploadedAudios(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAudioSentiment = (id) => async () => {
  try {
    const res = await GetAudioSentimentApi(id);
    dispatch(setAudioSentiment(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetRecentRecordings = () => async () => {
  try {
    const res = await RecentRecordingsApi();
    dispatch(setRecentRecordings(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const GetTotalRecordings = () => async () => {
  try {
    const res = await TotalRecordingsApi();
    dispatch(setTotalRecordings(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const DeleteAudios = (ids) => async () => {
  try {
    await DeleteAudioApi(ids);
    dispatch(GetUserAudios());
    dispatch(
      createResponse({
        type: "Success",
        message: "Audio(s) deleted successfully",
      })
    );
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
