import axios from "axios";
import { useEffect, useState } from "react";
import { agentData } from "../components/Data";

const useAgentReport = () => {
  // const [recentReport, setRecentReports] = useState({});

  // testing
  const [recentReport, setRecentReports] = useState([]);

  const getDetails = async () => {
    try {
      await axios
        .get("https://638b959081df38ab346c7d6e.mockapi.io/details")
        .then((res) => {
          setRecentReports(res.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getDetails();
  }, []);

  // testing

  // useEffect(() => {
  //   const data =
  //     "grant_type=&username=rambeybello%40gmail.com&password=aaaaaaaa&scope=&client_id=&client_secret=";
  //   axios.post("https://api.heed.hng.tech/login", data)
  //   .then((res) => {
  //     const headers = {
  //       Authorization: `Bearer ${res.data.access_token}`,
  //     };
  //     axios
  //       .get("api url", {
  //         headers,
  //       })
  //       .then((newRes) => {
  //         // console.log(newRes);
  //         setRecentReports(newRes.data);
  //       });
  //   });
  // }, []);

  return recentReport;
};
export { useAgentReport };

const useAgentDetails = () => {
  const [agentDets, setAgentDets] = useState({});

  // useEffect(() => {
  //   const data =
  //     "grant_type=&username=rambeybello%40gmail.com&password=aaaaaaaa&scope=&client_id=&client_secret=";
  //   axios.post("https://api.heed.hng.tech/login", data).then((res) => {
  //     const headers = {
  //       Authorization: `Bearer ${res.data.access_token}`,
  //     };
  //     axios
  //       .get("api url", {
  //         headers,
  //       })
  //       .then((newRes) => {
  //         // console.log(newRes);
  //         setAgentDets(newRes.data);
  //       });
  //   });
  // }, []);

  return agentDets;
};

export { useAgentDetails };
