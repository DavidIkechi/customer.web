import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetRecentRecordings,
  GetTotalRecordings,
} from "../../../redux/features/audios/service";
import { LeaderBoard } from "../../../redux/features/agents/service";
import { TotalAnalysis } from "../../../redux/features/sentiment/service";

const useDashBoardData = () => {
  const [recentRecording, setRecentRecordings] = useState([]);
  const [totalAnalysis, setTotalAnalysis] = useState(null);
  const [totalRecording, setTotalRecording] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const totalRecordingData = useSelector(
    (state) => state.audio.totalRecordings
  );
  const recentRecordingData = useSelector(
    (state) => state.audio.recentRecordings
  );
  const leaderboardData = useSelector((state) => state.agent.leaderboard);
  const totalAnalysisData = useSelector(
    (state) => state.sentiment.totalAnalysis
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const GetData = async () => {
      //Get Recent Recordings
      setRecentRecordings(recentRecordingData);

      //Get Total Anaylsis
      setTotalAnalysis(totalAnalysisData);

      //Get TotalUserRecordings
      setTotalRecording(totalRecordingData);

      // Get Leaderboard
      setLeaderboard(leaderboardData);
    };
    GetData();
  }, [
    totalRecordingData,
    recentRecordingData,
    leaderboardData,
    totalAnalysisData,
  ]);

  useEffect(() => {
    dispatch(GetTotalRecordings());
    dispatch(GetRecentRecordings());
    dispatch(LeaderBoard());
    dispatch(TotalAnalysis());
  }, [dispatch]);

  return { recentRecording, totalAnalysis, totalRecording, leaderboard };
};
export { useDashBoardData };
