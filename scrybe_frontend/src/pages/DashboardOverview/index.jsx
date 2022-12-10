import React from "react";
import LeaderBoard from "./components/LeaderBoard";
import RecentRecording from "./components/RecentRecording";
import TotalAnalysis from "./components/TotalAnalysis";
import TotalRecording from "./components/TotalRecording";
import styles from "./DashboardOverview.module.scss";
// import { LeaderboardData } from "./Data";
import { useDashBoardData } from "./hooks/index";

function DashboardOverview() {
  const { recentRecording, totalAnalysis, totalRecording, leaderboard } =
    useDashBoardData();

  return (
    <section className={styles.dashboard_overview}>
      <div className={styles.container}>
        <TotalRecording totalRecordingData={totalRecording} />
        <TotalAnalysis totalAnalysisData={totalAnalysis} />
        <LeaderBoard LeaderboardData={leaderboard} />
      </div>
      <RecentRecording recentRecording={recentRecording} />
    </section>
  );
}

export default DashboardOverview;
