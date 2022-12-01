import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = "https://heedapi.herokuapp.com";
const useMockAuthAndReadSentiment = (id) => {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    const data =
      "grant_type=password&username=tochieatsbeats%40gmail.com&password=12345678&scope=&client_id=&client_secret=";
    axios.post(baseURL + "/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(baseURL + `/audios/${id}/sentiment`, { headers })
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

const useMockEnd = (amount) => {
  const [sentimentData, setSentimentData] = useState([]);
  useEffect(() => {
    axios
      .get("https://mockend.com/tochibedford/MockendData/Audios")
      .then((res) => {
        setSentimentData(res.data.slice(0, amount));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return sentimentData;
};

export { useMockAuthAndReadSentiment, useMockEnd };
