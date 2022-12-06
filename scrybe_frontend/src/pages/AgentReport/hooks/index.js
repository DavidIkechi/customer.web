import axios from "axios";
import { useEffect, useState } from "react";
import ApiService from "../../../helpers/axioshelp/apis";

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

const useAgentReport = () => {
  const [recentAgentReport, setAgentRecentReports] = useState([]);

  const [id, setId] = useState("13");
  useEffect(() => {
    const data =
      "grant_type=&username=abbyfade10%40gmail.com&password=string123&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(`https://api.heed.hng.tech/AgentDetails?agent_id=${id}`, {
          headers,
        })
        .then((res) => {
          setAgentRecentReports(res.data.Agent_Performance_Report);
        });
    });
  }, []);

  return recentAgentReport;
};
export { useAgentReport };

const useAgentAnalysis = () => {
  const [agentAnalysis, setAnalysis] = useState({});
  const [data_id, setData_id] = useState("13");

  useEffect(() => {
    const data = `grant_type=&username=abbyfade10%40gmail.com&password=string123&scope=&client_id=&client_secret=`;
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(
          `https://api.heed.hng.tech/total-agent-analysis?agent_id=${data_id}`,
          {
            headers,
          }
        )
        .then((res) => {
          setAnalysis(res.data);
        });
    });
  }, []);
  return agentAnalysis;
};

export { useAgentAnalysis };
