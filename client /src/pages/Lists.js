import { Flex, Box } from "@chakra-ui/react";
import Footer from "../components /Footer/Footer";
import Header from "../components /Header/Header";
import ListItemCard from "../components /listsPageSections/ListItemCard";
import { useEffect, useState } from "react";
const Lists = () => {
  const [wishlist, setWishlist] = useState();
  const [watched, setWatched] = useState();
  const fetchLists = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("http://localhost:3001/api/wishlist", requestOptions)
      .then((response) => response.json())
      .then((result) => setWishlist(result))
      .catch((error) => console.log("error", error));
    fetch("http://localhost:3001/api/watched", requestOptions)
      .then((response) => response.json())
      .then((result) => setWatched(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    console.log("called");
    fetchLists();
  }, []);

  return (
    <Box align="center">
      <Header />
      <Box
        hight={"100px"}
        padding={"20px"}
        boxShadow={"base"}
        bg={"white"}
        w={"40%"}
        textAlign="center"
        borderRadius={"30"}
      >
        <h2> Watched</h2>
      </Box>
      <Flex>
        {watched?.map((movie) => (
          <ListItemCard movie={movie} key={movie.id} />
        ))}
      </Flex>
      <Box
        hight={"100px"}
        padding={"20px"}
        boxShadow={"base"}
        bg={"white"}
        w={"40%"}
        textAlign="center"
        borderRadius={"30"}
      >
        <h2> Liked</h2>
      </Box>
      <Flex marginBottom={"10"}>
        {wishlist &&
          wishlist.map((movie) => (
            <ListItemCard movie={movie} key={movie.id} />
          ))}
      </Flex>
      <Footer />
    </Box>
  );
};

export default Lists;
