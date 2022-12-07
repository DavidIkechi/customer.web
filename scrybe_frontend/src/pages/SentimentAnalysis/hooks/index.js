import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = "https://api.heed.hng.tech";

const useReadSentiment = (id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
      },
    };
    axios
      .get(baseURL + `/transcription/${id}`, config)
      .then((newRes) => {
        console.log(newRes.data.sentiment_result);
        setSentimentData(newRes.data.sentiment_result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return sentimentData;
};

const useMockEnd = (id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    axios
      .get("https://mockend.com/tochibedford/MockendData/Audios")
      .then((res) => {
        //transforming data to look like heed api return data
        const mainData = res.data[id];
        const scores = JSON.parse(mainData.sentiment_score);
        mainData.positivity_score = scores[0];
        mainData.neutrality_score = scores[1];
        mainData.negativity_score = scores[2];
        mainData.transcript = mainData.transcription;
        mainData.positiveTags = JSON.parse(mainData.positiveTags);
        mainData.negativeTags = JSON.parse(mainData.negativeTags);
        setSentimentData(mainData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return sentimentData;
};

export { useReadSentiment, useMockEnd };
