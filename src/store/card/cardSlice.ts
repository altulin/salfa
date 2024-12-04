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
      // state.likes = state.likes.filter((id) => id !== Number(action.payload));
      state.deletes = [...state.deletes, Number(action.payload)];
    },

    setWishFilter(state, action: PayloadAction<boolean>) {
      state.isWishFilter = action.payload;
    },

    setArrayCard(state, action: PayloadAction<ICard[] | []>) {
      state.arrayCard = action.payload;
    },

    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },

    setAddArrCard(state, action: PayloadAction<ICard>) {
      state.addArrayCard = [...state.addArrayCard, action.payload];
    },
  },
});

export const {
  setLikes,
  setDelete,
  setWishFilter,
  setArrayCard,
  setFilter,
  setAddArrCard,
} = cardSlice.actions;
export default cardSlice.reducer;
