import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopularCard from "./PopularCard";
import { API_URL, API_KEY } from "../../../utility";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../../redux/reducers/movieReducers";

const Popular = () => {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  console.log("movies", movies);
  const [trending, setTrending] = useState("day");
  const navigate = useNavigate();
  const today = useRef();
  const thisWeek = useRef();

  const fetchMovies = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      ` ${API_URL}/trending/movie/${trending}?api_key=${API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //  setMovies(result["results"]);
        dispatch(setMovies(result["results"]));
      })
      .catch((error) => console.log("error", error));
  };
  //on reload call the fetch function
  useEffect(() => {
    fetchMovies();
  }, [trending]);

  const renderMovies = () =>
    movies?.map((movie) => <PopularCard key={movie?.id} movie={movie} />);

  const setToday = () => {
    setTrending("day");
    today.current.style.backgroundColor = "#002242";
    thisWeek.current.style.backgroundColor = "white";
  };
  const setThisWeek = () => {
    setTrending("week");
    thisWeek.current.style.backgroundColor = "#002242";
    today.current.style.backgroundColor = "white";
  };
  return (
    <Flex direction={"column"} padding={"10%"} h={"700"}>
      <Box>
        <Text fontSize={"24px"} display={"inline"}>
          Trending{" "}
        </Text>

        <Button
          color={"#1ed5a9"}
          bg="#002242"
          w={"15%"}
          h={"50"}
          borderRadius="30"
          ref={today}
          onClick={() => setToday()}
          textAlign={"start"}
        >
          Today
        </Button>
        <Button
          color={"#1ed5a9"}
          bg="#white"
          w={"15%"}
          h={"50"}
          ref={thisWeek}
          marginLeft={"-3%"}
          borderRadius="30"
          onClick={() => setThisWeek()}
        >
          This Week
        </Button>

        <Button
          color={"#1ed5a9"}
          bg="#white"
          w={"20%"}
          h={"50"}
          borderRadius="30"
          left="40%"
          onClick={() => navigate("/myLists")}
        >
          My Lists
        </Button>
      </Box>

      <Flex padding={"15"} marginTop={"15"} width="700" overflowX={"scroll"}>
        {renderMovies()}
      </Flex>
    </Flex>
  );
};

export default Popular;
