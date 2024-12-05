import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { ICard } from "@/types";

const cardSlice = createSlice({
  name: "card",
  initialState,

  reducers: {
    setLikes(state, action: PayloadAction<number>) {
      if (state.likes.includes(action.payload)) {
        state.likes = state.likes.filter((id) => id !== Number(action.payload));
      } else {
        state.likes = [...state.likes, Number(action.payload)];
      }
    },

    setDelete(state, action: PayloadAction<string>) {
      state.likes = state.likes.filter((id) => id !== Number(action.payload));
      state.deletes = [...state.deletes, Number(action.payload)];
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setTotalFiltered(state, action: PayloadAction<ICard[] | []>) {
      state.arrayTotalFiltered = action.payload;
    },

    setArrayPagination(state, action: PayloadAction<ICard[] | []>) {
      state.arrayPagination = action.payload;
    },

    setArrayCreated(state, action: PayloadAction<ICard>) {
      state.arrayCreated = [...state.arrayCreated, action.payload];
    },

    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const {
  setLikes,
  setDelete,
  setTotalFiltered,
  setArrayPagination,
  setArrayCreated,
  setPage,
  setFilter,
} = cardSlice.actions;
export default cardSlice.reducer;
