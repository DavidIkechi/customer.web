import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetRecentRecordings,
  GetTotalRecordings,
} from "../../../redux/features/audios/service";
import { LeaderBoard } from "../../../redux/features/agents/service";

const useDashBoardData = () => {
  const [recentRecording, setRecentRecordings] = useState({});
  const [totalAnalysis, setTotalAnalysis] = useState(null);
  const [totalRecording, setTotalRecording] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});

  const totalRecordingData = useSelector(
    (state) => state.audio.totalRecordings
  );
  const recentRecordingData = useSelector(
    (state) => state.audio.recentRecordings
  );
  const leaderboardData = useSelector((state) => state.agent.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetData = async () => {
      //Get Recent Recordings
      setRecentRecordings(recentRecordingData);

      //Get Total Anaylsis
      // const res1 = await ApiService.TotalAnalysis();
      // setTotalAnalysis(res1.data);

      //Get TotalUserRecordings
      setTotalRecording(totalRecordingData);

      // Get Leaderboard
      setLeaderboard(leaderboardData);
    };
    GetData();
  }, [totalRecordingData, recentRecordingData, leaderboardData]);

  useEffect(() => {
    dispatch(GetTotalRecordings());
    dispatch(GetRecentRecordings());
    dispatch(LeaderBoard());
  }, [dispatch]);

  return { recentRecording, totalAnalysis, totalRecording, leaderboard };
};
export { useDashBoardData };
