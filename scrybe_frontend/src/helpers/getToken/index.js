export const GetToken = () => {
  const token = sessionStorage.getItem("heedAccessToken") || null;
  return token;
};
