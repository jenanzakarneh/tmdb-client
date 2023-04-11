import React, { useEffect, useState } from "react";
import Header from "../components /Header/Header";
import Footer from "../components /Footer/Footer";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import SearchedMovieCard from "../components /searchPageSections/SearchedMovieCard";
import { setSearchResults } from "../redux/reducers/movieReducers";
import Filter from "../components /searchPageSections/Filter";
import { API_KEY, API_URL } from "../utility";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Search = () => {
  const movies = useSelector((state) => state.searchResult);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filter, setFilter] = useState({});
  const [movieDetails, setMovieDetail] = useState({});
  const searchMovies = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${API_URL}/search/movie?query=${query}&api_key=${API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => dispatch(setSearchResults(result.results))) //setMovies(result.results))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    searchMovies();
  }, []);

  const bringFilterFromChild = (f) => {
    setFilter(f);
    console.log("filters from my child = ", filter);
  };

  const filterSearchResult = () => {
    console.log("filter  =", filter);
    // var moviesByGenre = movies.filter((movie) =>
    //   filterByGenre(movie.genre_ids)
    // );
    var moviesByYear = movies.filter((movie) =>
      filterByYear(movie.release_date)
    );
  };
  const filterByGenre = (movieGenres) => {
    const filterGenres = filter.genre;
    console.log(
      "filtergenres = ",
      filterGenres,
      "movie Genres = ",
      movieGenres
    );

    for (let i = 0; i < filterGenres.lenght; i++) {
      console.log(filterGenres[i]);
      for (let j = 0; j < movieGenres.lenght; j++) {
        if (filterGenres[i].id == movieGenres[j]) return true;
      }
    }
    return false;
  };

  const filterByYear = (movieReleaseDate) => {
    const movieYear = new Date(movieReleaseDate).getFullYear();
    const filterYear = filter.year;

    // const year = release_date.slice(0, 4); //should use date functions instead of strings
    // for (let i = 0; i < myYears.lenght; i++)
    //   if (myYears[i] == year) return true;
    // return false;
  };
  const filterByRating = (myRatings, vote_average) => {
    const rating = Math.round(vote_average);

    for (let i = 0; i < myRatings.lenght; i++)
      if (myRatings[i] == rating) return true;
    return false;
  };
  const renderMovies = () =>
    movies?.map((movie) => <SearchedMovieCard key={movie.id} movie={movie} />);
  return (
    <Flex direction={"column"}>
      <Header />
      <Filter
        sendMyFilterToParent={bringFilterFromChild}
        onClickFunction={filterSearchResult}
      />
      {movies && renderMovies()}

      <Footer />
    </Flex>
  );
};
export default Search;
