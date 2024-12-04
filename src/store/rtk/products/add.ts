import { api } from "@/store/service/api";
import { ICard } from "@/types";

export const productAdd = api.injectEndpoints({
  endpoints: (build) => ({
    add: build.mutation({
      query: (body) => {
        return {
          url: "/products/add",
          method: "POST",
          body,
        };
      },

      transformResponse: (response: ICard) => {
        return {
          ...response,
          like: false,
          images: [],
        };
      },
      // transformErrorResponse: () => {
      // console.log(response);
      // return;
      // },
    }),
  }),
  overrideExisting: false,
});

export const { useAddMutation } = productAdd;
