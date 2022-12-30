import { userAPI } from "./index";

export const authApiSlice = userAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "users/account",
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (loginCredentials) => ({
        url: "users/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (registerCredentials) => ({
        url: "users/create_users",
        method: "POST",
        body: registerCredentials,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApiSlice;
