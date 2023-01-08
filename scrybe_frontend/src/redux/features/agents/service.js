import {
  AgentDetailsApi,
  CreateApi,
  LeaderBoardApi,
  TotalAgentAnalysisApi,
} from "../../axios/apis/agent";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse, setLoading } from "../../utils/UtilSlice";
import { setAgent, setLeaderBoard, setTotalAgentAnaylsis } from "./agentSlice";

export const LeaderBoard = () => async () => {
  dispatch(setLoading(true));
  try {
    const res = await LeaderBoardApi();
    dispatch(setLeaderBoard(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const TotalAgentAnalysis = () => async () => {
  try {
    const res = await TotalAgentAnalysisApi();
    dispatch(setTotalAgentAnaylsis(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const CreateAgent = (data) => async () => {
  try {
    const res = await CreateApi(data);
    dispatch(setAgent(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAgentDetails = (id) => async () => {
  try {
    const res = await AgentDetailsApi(id);
    dispatch(setAgent(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
