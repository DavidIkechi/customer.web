import apiSlice from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchUser: builder.query({
      query: () => "users/account",
      // providesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: {...credentials }
      })
    })
  }),
})