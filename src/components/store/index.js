import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./fav-slice";
import DetailsSlice from "./details-slice";

const store = configureStore({
  reducer: {
    fav: favSlice.reducer,
    details: DetailsSlice.reducer,
    
  },
});
export default store;
  