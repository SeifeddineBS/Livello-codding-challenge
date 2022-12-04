import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./fav-slice";

const store = configureStore({
  reducer: {
    fav: favSlice.reducer,
  },
});
export default store;
