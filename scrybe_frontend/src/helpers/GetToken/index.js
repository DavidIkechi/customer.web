export const getToken = () => {
  const token = sessionStorage.getItem("heedAccessToken");
  return token;
};
