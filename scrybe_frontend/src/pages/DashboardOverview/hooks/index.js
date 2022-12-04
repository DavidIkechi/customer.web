import axios from "axios";
import { useEffect, useState } from "react";

const useMockAuthAndGetRecording = () => {
  const [recentRecording, setRecentRecordings] = useState({});
  useEffect(() => {
    const data =
      "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("https://api.heed.hng.tech/recent-recordings?skip=0&limit=5", {
          headers,
        })
        .then((newRes) => {
          console.log("newR", newRes);
          setRecentRecordings(newRes.data);
          console.log("Ndata", newRes.data);
        });
    });
  }, []);

  return recentRecording;
};
export { useMockAuthAndGetRecording };

const useMockAuthAndTotalAnalysis = () => {
  const [totalAnalysis, setTotalAnalysis] = useState({});

  useEffect(() => {
    const data =
      "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("https://api.heed.hng.tech/total-analysis", {
          headers,
        })
        .then((newRes) => {
          setTotalAnalysis(newRes.data);
        });
    });
  }, []);
  // console.log("total", totalAnalysis);
  return totalAnalysis;
};
export { useMockAuthAndTotalAnalysis };

const useMockAuthAndTotalRecording = () => {
  const [totalRecording, setTotalRecording] = useState({});

  useEffect(() => {
    const data =
      "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("https://api.heed.hng.tech/total-recordings-user", {
          headers,
        })
        .then((newRes) => {
          // console.log(newResTwo);
          setTotalRecording(newRes.data);
        });
    });
  }, []);
  return totalRecording;
};
export { useMockAuthAndTotalRecording };

// const useMockAuthAndGetRecording = () => {
//   const [recentRecording, setRecentRecordings] = useState({});
//   const [totalAnalysis, setTotalAnalysis] = useState({});
//   const [token, setToken] = useState();

//   const getToken = useCallback(() => {
//     const data =
//       "grant_type=&username=vickish1st%40gmail.com&password=passvic&scope=&client_id=&client_secret=";

//     axios.post("https://api.heed.hng.tech/login", data).then((res) => {
//       setToken(`${res.data.token_type} ${res.data.access_token}`);
//     });
//   }, []);

//   const getRecentRecordings = useCallback(() => {
//     const headers = {
//       Authorization: token,
//     };
//     axios
//       .get("https://api.heed.hng.tech/recent-recordings?skip=0&limit=5", {
//         headers,
//       })
//       .then((res) => {
//         console.log(res);
//         setRecentRecordings(res.data);
//       });
//   }, [token]);

//   useEffect(() => {
//     getToken();
//     if (token !== undefined) {
//       getRecentRecordings();
//     }
//   }, [token, getToken, getRecentRecordings]);
//   return recentRecording;

// };

// export { useMockAuthAndGetRecording };
