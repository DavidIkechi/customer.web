import { useEffect, useState } from "react";
import ApiService from "../../../helpers/axioshelp/apis";

const useDashBoardData = () => {
  const [recentRecording, setRecentRecordings] = useState({});
  const [totalAnalysis, setTotalAnalysis] = useState(null);
  const [totalRecording, setTotalRecording] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});

  useEffect(() => {
    const GetData = async () => {
      //Get Recent Recordings
      const res = await ApiService.RecentRecordings();
      setRecentRecordings(res.data);

      //Get Total Anaylsis
      const res1 = await ApiService.TotalAnalysis();
      setTotalAnalysis(res1.data);

      //Get TotalUserRecordings
      const res2 = await ApiService.GetTotalUserRecordings();
      setTotalRecording(res2.data);

      // Get Leaderboard
      const res3 = await ApiService.Leaderboard();
      setLeaderboard(res3.data);
    };
    GetData();
  }, []);

  return { recentRecording, totalAnalysis, totalRecording, leaderboard };
};
export { useDashBoardData };
