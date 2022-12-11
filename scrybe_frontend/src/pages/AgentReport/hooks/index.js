import axios from "axios";
import { useEffect, useState } from "react";
// import ApiService from "../../../helpers/axioshelp/apis";

// pass id as paraameteer

// const useAgentPerformanceData = async () => {
//   const [recentAgentReport, setAgentRecentReports] = useState([]);
//   const [agentAnalysis, setAnalysis] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       // get agent report
//       const agentReportResponse = await ApiService.getAgentReport()
//       setAgentRecentReports(agentReportResponse.data.Agent_Performance_Report);

//       // get agent aaalysis
//       const agentAnalysisResponse = await ApiService.getAgentAnalysis()
//       setAnalysis(agentAnalysisResponse.data);
//     }
//     getData()
//   }, [])

//   return { recentAgentReport, agentAnalysis }
// }

// export { useAgentPerformanceData }

const useAgentReport = (props) => {
  const [recentAgentReport, setAgentRecentReports] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("heedAccessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "Application/json",
      },
    };
    if (props?.controll) {
      axios
        .get(
          `https://api.heed.hng.tech/AgentDetails?agent_id=${props?.agent_id}`,
          config
        )
        .then((res) => {
          setAgentRecentReports(res.data.Agent_Performance_Report);
        });
    }
  }, [props]);

  return recentAgentReport;
};
export { useAgentReport };

const useAgentAnalysis = (props) => {
  const [agentAnalysis, setAnalysis] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("heedAccessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "Application/json",
      },
    };
    if (props?.controll) {
      axios
        .get(
          `https://api.heed.hng.tech/total-agent-analysis?agent_id=${props?.agent_id}`,
          config
        )
        .then((res) => {
          setAnalysis(res.data);
        });
    }
  }, [props]);
  return agentAnalysis;
};

export { useAgentAnalysis };
