import axios from "axios";

const token = localStorage.getItem("heedAccessToken");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
export const fetchData = async (url) => {
  const { data } = await axios.get(url, headers);
  return data;
};

export const postData = async (url, data) => {
  const response = await axios.post(url, headers, data);
  return response;
};

export const putData = async (url, data) => {
  const response = await axios.put(url, headers, data);
  return response;
};

export const deleteData = async (url, data) => {
  const response = await axios.delete(url, headers, data);
  return response;
};
