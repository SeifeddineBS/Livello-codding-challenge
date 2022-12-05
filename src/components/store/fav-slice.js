import { createSlice } from "@reduxjs/toolkit";
const favSlice = createSlice({
  name: "fav",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showFavs: false,
  },
  reducers: {
    addToFavs(state, action) {
      const newItem = action.payload;
      const isItemExist = state.itemsList.find(
        (item) => item.imdbID === newItem.imdbID
      );
      if (!isItemExist) {
        state.itemsList.push({
          imdbID: newItem.imdbID,
          Title: newItem.Title,
          Year: newItem.Year,
          Poster: newItem.Poster,
          Favs: true,
        });
        state.totalQuantity++;
      } else {
        console.log("already exist");
      }
    },
    removeFromFavs(state, action) {
      const imdbID = action.payload.imdbID;
      const isItemExist = state.itemsList.find(
        (item) => item.imdbID === imdbID
      );
      if (isItemExist) {
        state.itemsList = state.itemsList.filter(
          (item) => item.imdbID !== imdbID
        );
        state.totalQuantity--;
      }
    },
    setShowFavs(state, action) {
      state.showFavs = action.payload;
    },
  },
});
export const favActions = favSlice.actions;
export default favSlice;
