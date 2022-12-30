import { userAPI } from "./index";

export const authApiSlice = userAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "users/account",
      keepUnusedDataFor: 5,
      // providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useFetchUserQuery, useLoginUserMutation } = authApiSlice;
