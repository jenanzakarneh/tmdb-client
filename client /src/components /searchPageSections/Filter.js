import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { API_KEY, API_URL } from "../../utility";

const Filter = ({ sendMyFilterToParent, onClickFunction }) => {
  const genre = useRef();
  const year = useRef();
  const rate = useRef();
  const [genres, setGenres] = useState();
  const [myFilter, setMyFilter] = useState({
    genre: [],
    year: [],
    rating: [],
  });
  const [filterby, setFilterBy] = useState();
  const fetchGenres = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${API_URL}/genre/movie/list?language=en&api_key=${API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setGenres(result.genres))
      .catch((error) => console.log("error", error));

    //  return genres;
  };

  useEffect(fetchGenres, []);

  const years = [
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
  ];
  const ratings = ["1", "2", "3", "4", "5", "7", "8", "9", "10"];
  const renderButtons = () => {
    var option;
    if (filterby == "genre") option = genres;
    else if (filterby == "year") option = years;
    else if (filterby == "rating") option = ratings;
    else return;
    return option.map((element, key) => (
      <Button
        w={"106"}
        h={"30"}
        className="joinBtn"
        color="#002242"
        bg={"white"}
        borderRadius="30"
        m={"5"}
        id={`${filterby}${key}`}
        onClick={() => {
          document.getElementById(`${filterby}${key}`).style.backgroundColor =
            "#002242";
          document.getElementById(`${filterby}${key}`).style.color = "white";
          myFilter[filterby].push(element);
          setMyFilter(myFilter);
          console.log("my filter after ", myFilter);
        }}
        // onClick={appendMyFilter}
        key={option.indexOf(element)}
      >
        {filterby == "genre" ? element.name : element}
      </Button>
    ));
  };

  const filterByGenre = () => {
    genre.current.style.backgroundColor = "#002242";
    genre.current.style.color = "white";
    year.current.style.backgroundColor = "white";
    year.current.style.color = "#002242";
    rate.current.style.backgroundColor = "white";
    rate.current.style.color = "#002242";
    setFilterBy("genre");
    //the rest of the body
  };
  const filterByYear = () => {
    year.current.style.backgroundColor = "#002242";
    year.current.style.color = "white";
    genre.current.style.backgroundColor = "white";
    genre.current.style.color = "#002242";
    rate.current.style.backgroundColor = "white";
    rate.current.style.color = "#002242";
    setFilterBy("year");
  };
  const filterByRating = () => {
    rate.current.style.backgroundColor = "#002242";
    rate.current.style.color = "white";
    year.current.style.backgroundColor = "white";
    year.current.style.color = "#002242";
    genre.current.style.backgroundColor = "white";
    genre.current.style.color = "#002242";
    setFilterBy("rating");
  };
  const applyFilter = () => {
    sendMyFilterToParent(myFilter);
    onClickFunction();
  };
  return (
    <Flex direction={"column"}>
      <Box h={"40"} padding={"20"}>
        Search by
        <Button
          w={"20%"}
          h={"40"}
          color="#002242"
          bg={"white"}
          borderRadius="30"
          marginLeft={"5%"}
          ref={genre}
          onClick={filterByGenre}
        >
          Genre
        </Button>
        <Button
          w={"20%"}
          h={"40"}
          color="#002242"
          bg={"white"}
          borderRadius="30"
          marginLeft={"5%"}
          ref={year}
          onClick={filterByYear}
        >
          Year
        </Button>
        <Button
          w={"20%"}
          h={"40"}
          color="#002242"
          bg={"white"}
          borderRadius="30"
          marginLeft={"5%"}
          ref={rate}
          onClick={filterByRating}
        >
          Rating
        </Button>
      </Box>
      <Flex wrap={"wrap"} margin="auto">
        {renderButtons()}
      </Flex>
      <Button
        w={"15%"}
        h={"40"}
        color="#002242"
        bg={"white"}
        borderRadius="30"
        margin={"auto"}
        onClick={applyFilter}
      >
        go
      </Button>
    </Flex>
  );
};

export default Filter;
