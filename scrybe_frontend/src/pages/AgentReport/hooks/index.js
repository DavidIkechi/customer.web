import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAgentDetails,
  TotalAgentAnalysis,
} from "../../../redux/features/agents/service";

const useAgentReport = (props) => {
  const [recentAgentReport, setAgentRecentReports] = useState([]);
  const getAgentDetailsData = useSelector((state) => state.agent.agentDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props?.controll) {
      dispatch(GetAgentDetails(props?.agent_id));
    }
  }, [props?.controll, dispatch, props?.agent_id]);

  useEffect(() => {
    const getData = () => {
      setAgentRecentReports(getAgentDetailsData);
    };
    getData();
  }, [getAgentDetailsData]);

  return recentAgentReport;
};
export { useAgentReport };

const useAgentAnalysis = (props) => {
  const [agentAnalysis, setAnalysis] = useState({});
  const getTotalAnalysis = useSelector(
    (state) => state.agent.totalAgentAnalysis
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (props?.controll) {
      dispatch(TotalAgentAnalysis(props?.agent_id));
    }
  }, [props?.controll, dispatch, props?.agent_id]);

  useEffect(() => {
    const getData = () => {
      setAnalysis(getTotalAnalysis);
    };
    getData();
  }, [getTotalAnalysis]);
  return agentAnalysis;
};

export { useAgentAnalysis };
