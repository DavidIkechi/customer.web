import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.heed.hng.tech/",
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
      query: () => "account",
    }),
    fetchUserRecordings: builder.query({
      query: () => "list-audios-by-user",
    }),
    deleteRecording: builder.mutation({
      query: (id) => ({
        url: `audios/delete?audios=${[id]}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserRecordingsQuery,
  useDeleteRecordingMutation,
} = baseAPI;
