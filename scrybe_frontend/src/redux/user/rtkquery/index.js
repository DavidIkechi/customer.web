import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.heed.cx/",
    tagTypes: ["User"],
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("heedAccessToken");
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

export const { useFetchUserQuery } = userAPI;
