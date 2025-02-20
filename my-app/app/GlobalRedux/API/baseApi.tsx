import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { globalConstant } from '@/constant/constant';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: () => ({}),
});
