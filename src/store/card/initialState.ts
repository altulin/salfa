import { ICard } from "@/types";
import { filterPath as filter } from "@/paths";

interface IInitialState {
  likes: number[] | [];
  deletes: number[] | [];
  // isWishFilter: boolean;
  // arrayCard: ICard[] | [];
  filter: typeof filter.all | typeof filter.like;
  // addArrayCard: ICard[] | [];

  arrayTotal: ICard[] | [];
  arrayTotalFiltered: ICard[] | [];
  arrayCreated: ICard[] | [];
  arrayPagination: ICard[] | [];
  page: number;
}

export const initialState: IInitialState = {
  likes: [],
  deletes: [],
  // isWishFilter: false,
  // arrayCard: [],
  filter: filter.all,
  // addArrayCard: [],

  arrayTotal: [],
  arrayCreated: [],
  arrayTotalFiltered: [],
  arrayPagination: [],
  page: 1,
};
