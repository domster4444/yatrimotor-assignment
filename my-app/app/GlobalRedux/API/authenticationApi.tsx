import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { globalConstant } from '@/constant/constant';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/`,
  }),
  endpoints: (builder) => ({
    postUserLogin: builder.mutation({
      query: (body) => {
        return {
          url: `api/v1/login`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

export const { usePostUserLoginMutation } = authenticationApi;
