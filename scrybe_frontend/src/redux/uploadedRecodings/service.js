import axios from "axios";
import { GetToken } from "../../helpers/getToken";
const token = GetToken();
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

// fetch user recordings
const fetchUserRecordings = async () => {
  const response = await axios.get(`audios/list-audios-by-user`, {
    headers,
  });
  return response.data?.detail;
};

// delete recording
const deleteRecording = async (id) => {
  const response = await axios.delete(`audios/delete?audios=${id}`, {
    headers,
  });
  return response.data;
};

const recordServices = {
  fetchUserRecordings,
  deleteRecording,
};

export default recordServices;
