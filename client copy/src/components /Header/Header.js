import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Flex
      className="header"
      bg="#002242"
      h="64px"
      color="white"
      align="center"
      justify="space-around"
      wrap="wrap"
    >
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        width="164px"
        hight="20px"
        onClick={() => navigate("/home")}
      />
      <Flex justify="space-between">
        <Box borderRadius="3px">EN</Box>
        <Spacer />
        <img
          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
          width="28px"
          hight="26px"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
