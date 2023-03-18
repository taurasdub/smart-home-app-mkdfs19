import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Link, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "./index.scss";

function Header() {
  let currentHour = new Date().getHours();

  return (
    <Flex
      flexDir="column"
      bg="#2A3F74"
      borderRadius="10px"
      padding="20px"
      flexGrow="1"
    >
      <Heading height="50%" color="white">
        Good
        {currentHour >= 3 && currentHour <= 11
          ? " morning ☕"
          : currentHour >= 12 && currentHour <= 17
          ? " afternoon 🌤️"
          : currentHour >= 18 && currentHour <= 21
          ? " evening 🌇"
          : " night 🌙"}
      </Heading>
      <Box className="buttons">
        <Link to="/">
          <Button>Floor plan</Button>
        </Link>
        <Link to="/all-devices">
          <Button>All devices</Button>
        </Link>
        <Link to="/lights">
          <Button>Lights</Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Header;
