import { Image, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components /Footer/Footer";
import Header from "../components /Header/Header";
import DropDownList from "../components /dropDown/DropDownList";
// import WatchedList from "../components/watchOptions/WatchedList";
import { API_KEY, API_URL, IMAGE_PATH } from "../utility";
const MovieDetails = () => {
  const [movieDetails, setMovieDetail] = useState({});

  const { id } = useParams();
  useEffect(() => fetchMovieDetails(), []);
  const fetchMovieDetails = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMovieDetail(result);
      })
      .catch((error) => console.log("error", error));
  };
  const renderGenres = () =>
    movieDetails.genres
      ? movieDetails.genres.map((genre) => <span>{genre.name}</span>)
      : null;
  return (
    <Flex direction={"column"} justify={"space-between"}>
      <Header />
      <Flex
        align={"center"}
        padding={"100px"}
        // bgImage={`url(${IMAGE_PATH}${movieDetails.backdrop_path})`}
        // bgRepeat="no-repeat"
        color={"black"}
      >
        <Image
          flex={".5"}
          src={`${IMAGE_PATH}${movieDetails.poster_path}`}
          w={"30%"}
          h={"10%"}
          borderRadius={"15"}
        />{" "}
        <DropDownList x={movieDetails.vote_average} />
        <Flex
          flex={"1"}
          w={"30%"}
          h={"10%"}
          direction={"column"}
          marginLeft={"5%"}
        >
          <Text fontSize="50px">
            {movieDetails.title}{" "}
            <span>
              {" "}
              (
              {movieDetails.release_date
                ? movieDetails.release_date.slice(0, 4)
                : null}
              )
            </span>
          </Text>
          <Text fontSize={"40px"}>{renderGenres()}</Text>
          <Flex direction={"column"}>
            <Text fontSize={"35px"}>Overview</Text>
            <Text fontSize={"30px"}>{movieDetails.overview}</Text>
          </Flex>
        </Flex>
        {/* <WatchedList
          id={id}
          title={movieDetails.title}
          poster={movieDetails.poster_path}
        /> */}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MovieDetails;
