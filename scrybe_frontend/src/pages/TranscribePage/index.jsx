import React from "react";
import styles from "./TranscribePage.module.scss";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import Transcribe from "./Transcribe/Transcribe";

function TranscribePage() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  // const [transcribedText, setTranscribedText] = useState("");
  // const sentimentData = useMockAuthAndReadSentiment(1);

  // useEffect(() => {
  //   console.log("fired");
  //   setTranscribedText(sentimentData.transcript);
  //   console.log(sentimentData.transcript);
  // }, [sentimentData]);

  return (
    <div className={styles.TranscribePage}>
      <Transcribe />
    </div>
  );
}

export default TranscribePage;
