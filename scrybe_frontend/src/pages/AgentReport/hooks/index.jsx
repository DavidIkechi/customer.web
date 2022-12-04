import axios from "axios";
import { useEffect, useState } from "react";

const useAgentReport = () => {
  const [recentReport, setRecentReports] = useState({});

  useEffect(() => {
    const data =
      "grant_type=&username=rambeybello%40gmail.com&password=aaaaaaaa&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("https://api.heed.hng.tech/recent-recordings?skip=0&limit=5", {
          headers,
        })
        .then((newRes) => {
          // console.log(newRes);
          setRecentReports(newRes.data);
        });
    });
  }, []);

  return recentReport;
};
export { useAgentReport };
