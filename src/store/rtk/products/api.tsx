import { api } from "@/store/service/api";
import { IResponse } from "@/types";
import store from "@/store";

export const products = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products?limit=10",
      }),

      transformResponse: (response: IResponse) => {
        return {
          ...response,
          products: [
            ...response.products.map((item) => {
              const { id, title, images, description, price, brand } = item;
              return {
                id,
                title,
                images,
                description,
                price,
                like: false,
                brand,
              };
            }),
            ...store.getState().card.addArrayCard,
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
