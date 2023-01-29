import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import IsLoadingSkeleton from "../../components/LoadingSkeleton";
import { GetAccount } from "../../redux/features/users/service";
import { dispatch } from "../../redux/store";
import LeaderBoard from "./components/LeaderBoard";
import RecentRecording from "./components/RecentRecording";
import TotalAnalysis from "./components/TotalAnalysis";
import TotalRecording from "./components/TotalRecording";
import styles from "./DashboardOverview.module.scss";
import { useDashBoardData } from "./hooks/index";

function DashboardOverview() {
  const { recentRecording, totalAnalysis, totalRecording, leaderboard } =
    useDashBoardData();

  const { isLoading, searchQuery } = useSelector((state) => state.util);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(GetAccount());
    }
  }, [token]);

  const searchDashboard = (search) => {
    return search.filter((item) =>
      item?.filename?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="keywords" content="heed Dashboard" />
      </Helmet>
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
    </>
  );
}

export default DashboardOverview;
