import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = "https://api.heed.hng.tech";
const useMockAuthAndReadSentiment = (id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    const data =
      "grant_type=&username=tochibedford.work%40gmail.com&password=123456789&scope=&client_id=&client_secret=";
    axios.post(baseURL + "/login", data).then((res) => {
      console.log(res)
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(baseURL + `/trascription/${id}`, { headers })
        .then((newRes) => {
          setSentimentData(newRes.data);
        })
        .catch((err) => {
          console.log(err);
        });
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

export { useMockAuthAndReadSentiment, useMockEnd };
