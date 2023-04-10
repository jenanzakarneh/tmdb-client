import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  searchResult: [],
  wishlist: [],
  watchedlist: [],
};
export const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    // movieReducer,
    setMovies: (state, action) => {
      console.log("state from reducer" + state);
      state.movies = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResult = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    addToWatchedlist: (state, action) => {
      state.watchedlist.push(action.payload);
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setWachedlist: (state, action) => {
      state.watchedlist = action.payload;
    },
  },
});
export const {
  setMovies,
  setSearchResults,
  addToWishlist,
  addToWatchedlist,
  setWishlist,
  setWachedlist,
} = movieSlice.actions;
//export const slice = movieSlice;
export default movieSlice.reducer;
