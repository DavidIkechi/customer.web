import axios from "axios";
import { useEffect, useState } from "react";

const useMockAuthAndGetRecording = () => {
  const [recentRecording, setRecentRecordings] = useState({});
  useEffect(() => {
    const data =
      "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";
    axios.post("http://scrybe.hng.tech:5000/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("http://scrybe.hng.tech:5000/recent-recordings?skip=0&limit=5", {
          headers,
        })

        .then((newRes) => {
          setRecentRecordings(newRes.data);
        });
    });
  }, []);

  return recentRecording;
};

export { useMockAuthAndGetRecording };
