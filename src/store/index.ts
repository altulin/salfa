import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modalSlice";
import cardSlice from "./card/cardSlice";

import { api } from "./service/api";
import { rtkQueryErrorLogger } from "./service/errorLogger";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    card: cardSlice,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, rtkQueryErrorLogger]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;