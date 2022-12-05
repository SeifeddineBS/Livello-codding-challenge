import { createSlice } from "@reduxjs/toolkit";
const favSlice = createSlice({
  name: "fav",
  initialState: {
    itemsList: [], // all favs lists
    total: 0, // total favs
    showFavs: false, // if favs button clicked
  },
  reducers: {
    addToFavs(state, action) {
      // add a movie to favs
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
        state.total++;
      } else {
        console.log("already exist");
      }
    },
    removeFromFavs(state, action) {
      // remove a movie from favs
      const imdbID = action.payload.imdbID;
      const isItemExist = state.itemsList.find(
        (item) => item.imdbID === imdbID
      );
      if (isItemExist) {
        state.itemsList = state.itemsList.filter(
          (item) => item.imdbID !== imdbID
        );
        state.total--;
      }
    },
    setShowFavs(state, action) {
      // change show favs state
      state.showFavs = action.payload;
    },
  },
});
export const favActions = favSlice.actions;
export default favSlice;
