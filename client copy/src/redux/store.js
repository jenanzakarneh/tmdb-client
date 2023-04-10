import movieSlice from "./reducers/movieReducers";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: movieSlice,
});
export default store;
