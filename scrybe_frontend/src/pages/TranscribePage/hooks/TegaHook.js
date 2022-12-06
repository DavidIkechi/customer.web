import axios from "axios";
import { useEffect, useState } from "react";

const useMockAuthAndReadSentiment = (transcript_id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    const data =
      "grant_type=password&username=arcteggzz%40gmail.com&password=123456789&scope=&client_id=&client_secret=";
    axios.post("http://heed.hng.tech:5000/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(`https://api.heed.hng.tech/transcription/${transcript_id}`, {
          headers,
        })
        .then((newRes) => {
          setSentimentData(newRes.data);
        });
    });
  }, []);

  return sentimentData;
};

export { useMockAuthAndReadSentiment };
