export const token = localStorage.getItem("heedAccessToken");

export const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};
