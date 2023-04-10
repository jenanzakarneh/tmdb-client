import { Flex, Image, Box, Heading } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../utility";
const SearchedMovieCard = ({ movie }) => {
  // const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  return (
    <Flex
      w={"80%"}
      m={"5%"}
      border={1}
      onClick={() => navigate(`/movieDetails/${movie.id}`)}
    >
      {movie.poster_path ? (
        <Image
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt="Poster isn't available!!"
          w={"150px"}
          h={"225px"}
          borderRadius={"15"}
        />
      ) : null}
      <Box
        m={"2.5%"}
        color={"gray"}
        p={"10px"}
        fontFamily={"Source Sans Pro', Arial, sans-serif"}
      >
        <Heading as={"h2"} color={"black"} fontSize="1em">
          {movie.title}
        </Heading>
        {movie.release_date}
        <Heading as="h3"> Overview</Heading>
        {movie.overview}
      </Box>
    </Flex>
  );
};

export default SearchedMovieCard;
