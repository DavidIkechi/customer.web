import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.heed.cx/",
    credentials: 'include',
    tagTypes: ["User"],
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "users/account",
      providesTags: ["User"],
    }),
  }),
});

// send refresh token to get new; 
const refreshTokenQuery = async (args, api, extraOptions) => {
  let result = await userAPI(args, api, extraOptions);

  if (result?.error?.originalStatus === 403 && (result?.error?.originalStatus === 401)){
    console.log('sending new request for refresh token');
  }
}

export const { useFetchUserQuery } = userAPI;
