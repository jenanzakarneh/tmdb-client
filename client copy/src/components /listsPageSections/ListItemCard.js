import { Flex, Image, Box, Heading } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { IMAGE_PATH } from "../../utility";
const ListItemCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Flex
      marginLeft={"5%"}
      w={"200"}
      direction={"column"}
      border={1}
      justify="center"
      align={"center"}
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
        color={"gray"}
        w={"150"}
        p={"10px"}
        fontFamily={"Source Sans Pro', Arial, sans-serif"}
      >
        <Heading as={"h2"} color={"black"} fontSize="1em">
          {movie.title}
        </Heading>
        {movie.release_date}
      </Box>
    </Flex>
  );
};

export default ListItemCard;
