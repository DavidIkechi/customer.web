import AgentService from "../../axios/apis/agent";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import { setAgent, setLeaderBoard, setTotalAgentAnaylsis } from "./agentSlice";

export const LeaderBoard = () => async () => {
  try {
    const res = await AgentService.LeaderBoard();
    dispatch(setLeaderBoard(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const TotalAgentAnalysis = () => async () => {
  try {
    const res = await AgentService.TotalAgentAnalysis();
    dispatch(setTotalAgentAnaylsis(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const CreateAgent = (data) => async () => {
  try {
    const res = await AgentService.Create(data);
    dispatch(setAgent(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAgentDetails = (id) => async () => {
  try {
    const res = await AgentService.AgentDetails(id);
    dispatch(setAgent(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
