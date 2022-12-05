import { createSlice } from "@reduxjs/toolkit";
const DetailsSlice = createSlice({
  name: "details",
  initialState: {
    movie: {},
    totalQuantity: 0,
    showDetails: false,
  },
  reducers: {
    showDetails(state, action) {
      state.movie = action.payload;
    },

    setShowDetails(state, action) {
      state.showDetails = action.payload;
    },
  },
});
export const detailsActions = DetailsSlice.actions;
export default DetailsSlice;
