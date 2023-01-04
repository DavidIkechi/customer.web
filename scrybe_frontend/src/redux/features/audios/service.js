import AudioService from "../../axios/apis/audio";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import {
  setAudios,
  setAudioSentiment,
  setRecentRecordings,
  setTotalRecordings,
  setUploadedAudios,
} from "./audioSlice";

export const GetUserAudios = () => async () => {
  try {
    const res = await AudioService.UserAudios();
    dispatch(setAudios(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetUploadedAudios = () => async () => {
  try {
    const res = await AudioService.GetUploadedAudios();
    dispatch(setUploadedAudios(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAudioSentiment = (id) => async () => {
  try {
    const res = await AudioService.GetAudioSentiment(id);
    dispatch(setAudioSentiment(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetRecentRecordings = () => async () => {
  try {
    const res = await AudioService.RecentRecordings();
    dispatch(setRecentRecordings(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetTotalRecordings = () => async () => {
  try {
    const res = await AudioService.TotalRecordings();
    dispatch(setTotalRecordings(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const DeleteAudios = (ids) => async () => {
  try {
    const res = await AudioService.Delete(ids);
    console.log(res);
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
