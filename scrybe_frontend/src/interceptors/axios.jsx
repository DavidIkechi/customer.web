import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://api.heed.hng.tech/";

// handle token refresh
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");
//       return axios
//         .post("refresh", {
//       data: {},
//      config: { withCredentials: true },
//  })
//         .then((res) => {
//           if (res.status === 201) {
//             localStorage.setItem("theedAccessTken", res.data.token);
//             localStorage.setItem("heedRefreshToken", res.data.refreshToken);
//             axios.defaults.headers.common[
//               "Authorization "
//             ] = `Bearer ${res.data.token}`;
//             return axios(originalRequest);
//           }
//         })
//         .catch((err) => {
//           console.log(`send backend refresh token request failed, the errror: ${err}`);
//         });
//     }
//     return Promise.reject(error);
//   }
// );

axios.interceptors.request.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      const newBEREsponse = await axios.post("refresh", {
        data: {},
        config: { withCredentials: true },
      });
      if (newBEREsponse.status === 201) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newBEREsponse.data.token}`;
        localStorage.setItem("heedAccessToken", newBEREsponse.data.token);
        localStorage.setItem(
          "heedRefreshToken",
          newBEREsponse.data.refreshToken
        );
        Cookies.set("heedAccessToken", newBEREsponse.data.token);
        return axios(originalRequest);
      }
    }
    return Promise.reject(err);
  }
);
