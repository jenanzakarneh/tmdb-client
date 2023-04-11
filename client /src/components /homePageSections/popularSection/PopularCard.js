import { Box, Image, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DropDownList from "../../dropDown/DropDownList";
// import RatingChart from "../../RatingChart";
import { IMAGE_PATH } from "../../../utility";
const PopularCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Box marginLeft={"20"} marginRight={"10"}>
      <DropDownList movie={movie} />
      {movie.poster_path ? (
        <Image
          position={"relative"}
          top={"0"}
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt="Poster isn't available!!"
          width={"150px"}
          hight={"225px"}
          borderRadius={"15"}
          onClick={() => navigate(`/movieDetails/${movie.id}`)}
        />
      ) : null}
      {/* <RatingChart x={movie.vote_average} width={"10"} /> */}
      <Box padding={"5"} color={"gray"}>
        <Heading as={"h2"} color={"black"} fontSize="1em">
          {movie.title}
        </Heading>
        {movie.release_date}
      </Box>
    </Box>
  );
};

export default PopularCard;
