import axios from "axios";
import { useEffect, useState } from "react";

const useMockAuthAndReadSentiment = (id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    const data =
      "grant_type=password&username=tochibedford.work%40gmail.com&password=12345678&scope=&client_id=&client_secret=";
    axios.post("http://scrybe.hng.tech:5000/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(`http://scrybe.hng.tech:5000/audios/${id}/sentiment`, { headers })
        .then((newRes) => {
          setSentimentData(newRes.data);
        });
    });
  }, []);

  return sentimentData;
};

export { useMockAuthAndReadSentiment };
