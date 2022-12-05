import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./fav-slice";
import DetailsSlice from "./details-slice";
import moviesSlice from "./movies-slice";

const store = configureStore({
  reducer: {
    fav: favSlice.reducer,
    details: DetailsSlice.reducer,
    movies: moviesSlice.reducer,
  },
});
export default store;
