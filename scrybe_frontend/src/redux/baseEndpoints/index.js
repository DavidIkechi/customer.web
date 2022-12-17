import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.heed.hng.tech/",
    // add your tagTypes here used in the `queryFulfilled`;
    tagTypes: ["User", "Recording"],
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
      // this will trigger the `queryFulfilled` action with the `User` tagType, to handle refetching the user
      providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "create_users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    fetchUserRecordings: builder.query({
      query: () => "list-audios-by-user",
    }),
    deleteRecording: builder.mutation({
      query: (id) => ({
        url: `audios/delete?audios=${[id]}`,
        method: "DELETE",
      }),
      // us to refetch the recordings after deleting one
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            baseAPI.util.updateQueryData(
              "fetchUserRecordings",
              undefined,
              (draft) => {
                return draft.filter((recording) => recording.id !== args);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserRecordingsQuery,
  useDeleteRecordingMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = baseAPI;
