import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetUser, setCredentials } from "./apiSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.heed.cx/",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
})

// send refresh token to get new; 
const refreshTokenQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403 && (result?.error?.originalStatus === 401)){
    console.log('sending new request for refresh token');
    const refreshResult = await baseQuery('users/refresh-token', api, extraOptions);
    console.log('here is your refresh result', refreshResult);
    if (refreshResult?.data) {
      const userData = api.getState().auth.userData;
      //store the new token to state token
      api.dispatch(setCredentials(...refreshResult.data, userData));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetUser());
    }
  }
  return result;
}

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: refreshTokenQuery,
  endpoints: (builder) => ({})
});


export const { useFetchUserQuery } = userAPI;
