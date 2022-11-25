import axios from "axios";
const useMockAuth = async () => {
  const data =
    "grant_type=password&username=tochibedford.work%40gmail.com&password=12345678&scope=&client_id=&client_secret=";

  return await axios.post("http://scrybe.hng.tech:5000/login", data);
};

const useReadSentiment = async (token, id) => {
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  console.log(headers);
  const res = await axios.get(
    `http://scrybe.hng.tech:5000/audios/${id}/sentiment`,
    headers
  );
  const data = await res.data;
  return await data;
};

const useNewAnalyse = async (token, fileP) => {
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const body = new FormData();
  body.append("first_name", "tochi");
  body.append("last_name", "bedford");
  body.append("file", fileP);
  const res = await axios({
    method: "post",
    url: "http://scrybe.hng.tech:5000/new_analyse",
    data: body,
    headers: headers,
  });
};

export { useMockAuth, useReadSentiment, useNewAnalyse };
