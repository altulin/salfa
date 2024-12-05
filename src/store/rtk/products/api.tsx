import { api } from "@/store/service/api";
import { IResponse } from "@/types";

export const products = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products?limit=16",
      }),

      transformResponse: (response: IResponse) => {
        return {
          ...response,
          products: [
            ...response.products.map((item) => {
              const { id, title, thumbnail, description, price, brand } = item;
              return {
                id,
                title,
                thumbnail,
                description,
                price,
                like: false,
                brand,
              };
            }),
          ],
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

export const { useGetProductsQuery } = products;
