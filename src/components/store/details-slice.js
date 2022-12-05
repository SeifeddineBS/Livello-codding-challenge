import { createSlice } from "@reduxjs/toolkit";
const DetailsSlice = createSlice({
  name: "details",
  initialState: {
    movie: {}, // store the movie clicked
    showDetails: false, // if the movie clicked or not (boolean)
  },
  reducers: {
    showDetails(state, action) {
      // change movie state
      state.movie = action.payload;
    },

    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
  },
});
export const detailsActions = DetailsSlice.actions;
export default DetailsSlice;
