import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./searchBar/SearchBar";
import "./searchSection.css";
const SearchSection = () => {
  return (
    <Flex
      className="search-section"
      justify={"center"}
      align={"center"}
      direction="column"
    >
      <Box w={"60%"} alignItems={"flex-start"}>
        <Heading as={"h2"}>Welcome</Heading>
        <Heading as={"h4"}>
          Milions of movies, TV shows and people to discover.Explore now .
        </Heading>
      </Box>

      <SearchBar />
    </Flex>
  );
};

export default SearchSection;
