import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useMockAuthAndGetRecording = () => {
  const [recentRecording, setRecentRecordings] = useState({});
  const [token, setToken] = useState();

  const getToken = useCallback(() => {
    const data =
      "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";

    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      setToken(`${res.data.token_type} ${res.data.access_token}`);
    });
  }, []);

  const getRecentRecordings = useCallback(() => {
    const headers = {
      Authorization: token,
    };
    axios
      .get("https://api.heed.hng.tech/recent-recordings?skip=0&limit=5", {
        headers,
      })
      .then((res) => {
        console.log(res);
        setRecentRecordings(res.data);
      });
  }, [token]);

  useEffect(() => {
    getToken();
    if (token !== undefined) {
      getRecentRecordings();
    }
  }, [token, getToken, getRecentRecordings]);
  return recentRecording;
};

export { useMockAuthAndGetRecording };
