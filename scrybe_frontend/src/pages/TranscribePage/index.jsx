import React from "react";
import styles from "./TranscribePage.module.scss";
import SideBar from "../../components/SideBar";
import Transcribe from "./Transcribe/Transcribe";

function TranscribePage() {
  // const [transcribedText, setTranscribedText] = useState("");
  // const sentimentData = useMockAuthAndReadSentiment(1);

  // useEffect(() => {
  //   console.log("fired");
  //   setTranscribedText(sentimentData.transcript);
  //   console.log(sentimentData.transcript);
  // }, [sentimentData]);

  return (
    <div className={styles.TranscribePage}>
      <SideBar>
        <Transcribe />
      </SideBar>
    </div>
  );
}

export default TranscribePage;
