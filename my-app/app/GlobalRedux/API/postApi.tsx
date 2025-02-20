import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { globalConstant } from '@/constant/constant';

interface PostFormData {
  [key: string]: string | number | boolean | File | null;
}

interface PostPayload {
  id: string;
  formData?: PostFormData;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD RECORD
    postAddRecord: builder.mutation<void, PostFormData>({
      query: (formData) => ({
        url: 'post/create',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),

    // * GET ALL RECORD FOR SPECIFIC User
    getAllRecordForSpecificUser: builder.mutation<void, void>({
      query: () => {
        return {
          url: `post/get-all-for-user`,
          method: 'POST',
          formData: true,
        };
      },
    }),

    //* DELETE RECORD
    deleteRecord: builder.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `post/delete/${id}`,
          method: 'DELETE',
        };
      },
    }),

    // /post/getSinglePost/:id
    getSinglePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `post/getSinglePost/${id}`,
          method: 'POST',
        };
      },
    }),

    //* PATCH RECORD
    patchUpdateRecord: builder.mutation<void, PostPayload>({
      query: ({ id, formData }) => {
        return {
          url: `post/update/${id}`,
          method: 'PATCH',
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetSinglePostMutation,
  usePostAddRecordMutation,
  useGetAllRecordForSpecificUserMutation,
  useDeleteRecordMutation,
  usePatchUpdateRecordMutation,
} = postApi;
