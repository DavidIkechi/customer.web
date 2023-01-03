import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recordAPI = createApi({
  reducerPath: "recordAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.heed.cx/",
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
    fetchUserRecordings: builder.query({
      query: () => "audios/list-audios-by-user",
    }),
    deleteRecording: builder.mutation({
      query: (id) => ({
        url: `audios/delete?audios=${id}`,
        method: "DELETE",
      }),
      // us to refetch the recordings after deleting one
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            recordAPI.util.updateQueryData(
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
  useFetchUserRecordingsQuery,
  useDeleteRecordingMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = recordAPI;
