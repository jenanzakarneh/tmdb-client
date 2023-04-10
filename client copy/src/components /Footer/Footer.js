import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex
      bg="#002242"
      h="322px"
      color="white"
      align="center"
      justify="space-around"
      position={"relative"}
      bottom={"0"}
      width={"100%"}
    >
      <Image
        w={"130"}
        h={"94"}
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
      />
    </Flex>
    // );
  );
};

export default Footer;
