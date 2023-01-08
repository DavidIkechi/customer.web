import React from "react";
import LeaderBoard from "./components/LeaderBoard";
import RecentRecording from "./components/RecentRecording";
import TotalAnalysis from "./components/TotalAnalysis";
import TotalRecording from "./components/TotalRecording";
import styles from "./DashboardOverview.module.scss";
import { useDashBoardData } from "./hooks/index";
import { useSelector } from "react-redux";
import IsLoadingSkeleton from "../../components/LoadingSkeleton";

function DashboardOverview() {
  const { recentRecording, totalAnalysis, totalRecording, leaderboard } =
    useDashBoardData();

  const { isLoading, searchQuery } = useSelector((state) => state.util);

  const searchDashboard = (search) => {
    return search.filter((item) =>
      item?.filename?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <section className={styles.dashboard_overview}>
      {isLoading ? (
        <IsLoadingSkeleton />
      ) : (
        <>
          <div className={styles.container}>
            <TotalRecording totalRecordingData={totalRecording} />
            <TotalAnalysis totalAnalysisData={totalAnalysis} />
            <LeaderBoard LeaderboardData={leaderboard} />
          </div>
          <RecentRecording
            recentRecording={recentRecording}
            searchDashboard={searchDashboard}
          />
        </>
      )}
    </section>
  );
}

export default DashboardOverview;
