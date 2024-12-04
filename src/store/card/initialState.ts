import { ICard } from "@/types";
import { filterPath as filter } from "@/paths";

interface IInitialState {
  likes: number[] | [];
  deletes: number[] | [];
  isWishFilter: boolean;
  arrayCard: ICard[] | [];
  filter: typeof filter.all | typeof filter.like;
  addArrayCard: ICard[] | [];
}

export const initialState: IInitialState = {
  likes: [],
  deletes: [],
  isWishFilter: false,
  arrayCard: [],
  filter: filter.all,
  addArrayCard: [],
};
