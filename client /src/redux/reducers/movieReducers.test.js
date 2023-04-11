import {
  setMovies,
  movieSlice,
  setSearchResults,
  setWishlist,
  setWachedlist,
  addToWishlist,
  addToWatchedlist,
} from "./movieReducers";

test("Testing the initial state ", () => {
  expect(movieSlice.getInitialState()).toEqual({
    movies: [],
    searchResult: [],
    wishlist: [],
    watchedlist: [],
  });
});
test("Testing the setMovies ", () => {
  expect(setMovies([{ m: "movie1" }, { m: "movie2" }]).payload).toEqual([
    { m: "movie1" },
    { m: "movie2" },
  ]);
});
test("Testing the setSearchResult ", () => {
  expect(setSearchResults([{ m: "movie1" }, { m: "movie2" }]).payload).toEqual([
    { m: "movie1" },
    { m: "movie2" },
  ]);
});
test("Testing the set  wishlist ", () => {
  expect(setWishlist([{ m: "movie1" }, { m: "movie2" }]).payload).toEqual([
    { m: "movie1" },
    { m: "movie2" },
  ]);
});
test("Testing the set watchedlist ", () => {
  expect(setWachedlist([{ m: "movie1" }, { m: "movie2" }]).payload).toEqual([
    { m: "movie1" },
    { m: "movie2" },
  ]);
});
test("Testing add to wishlist", () => {
  expect(addToWishlist({ addMovie: "movie" }).payload).toEqual({
    addMovie: "movie",
  });
});
test("Testing add to watchedlist", () => {
  expect(addToWatchedlist({ addMovie: "movie" }).payload).toEqual({
    addMovie: "movie",
  });
});
