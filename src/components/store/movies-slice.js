import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    showMovies: false,
  },
  reducers: {
    allMovies(state, action) {
      const data = action.payload;

      state.movies = data.Search;
    },
    setShowMovies(state, action) {
      state.showMovies = action.payload;
    },
  },
});
export const moviesActions = moviesSlice.actions;
export default moviesSlice;
