import {
  AgentDetailsApi,
  CreateAgentApi,
  LeaderBoardApi,
  TotalAgentAnalysisApi,
} from "../../axios/apis/agent";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse, setLoading } from "../../utils/UtilSlice";
import {
  setAgent,
  setAgentDetails,
  setLeaderBoard,
  setTotalAgentAnaylsis,
} from "./agentSlice";

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

export const TotalAgentAnalysis = (id) => async () => {
  try {
    const res = await TotalAgentAnalysisApi(id);
    dispatch(setTotalAgentAnaylsis(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};

export const CreateAgent = (data) => async () => {
  try {
    const res = await CreateAgentApi(data);
    dispatch(setAgent(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAgentDetails = (id) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await AgentDetailsApi(id);
    dispatch(setAgentDetails(res.data.detail));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
    dispatch(setLoading(false));
  }
};
