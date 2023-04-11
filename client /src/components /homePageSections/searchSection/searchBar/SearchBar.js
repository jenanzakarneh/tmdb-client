import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  // const searchMovie = (e) => {
  //   e.preventDefault();
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `https://api.themoviedb.org/3/search/keyword?query=${searchKey}&api_key=73f3fbb4d30b35ce1ba9815a1c098b4c`,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <Flex
      borderRadius={"30"}
      justify="center"
      color={"black"}
      align={"center"}
      width="60%"
    >
      <Input
        width={"100%"}
        h={"30"}
        borderRadius={"30"}
        placeholder="Search for a movie, TV show , a person....."
        type="text"
        onChange={(e) => setSearchKey(e.target.value)}
        border="none"
        paddingTop={"10"}
        paddingLeft={"20"}
        paddingBottom="10"
        outline={"none"}
      />

      <Button
        w={"600"}
        h={"50"}
        p="20"
        marginLeft={"-70"}
        borderRadius={"30"}
        color={"white"}
        bg={"rgb(25, 160, 52)"}
        border="none"
        onClick={() => navigate(`/search/${searchKey}`)}
      >
        Search
      </Button>
    </Flex>
  );
};
export default SearchBar;
