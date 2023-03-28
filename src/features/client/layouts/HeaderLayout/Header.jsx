import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "./index.scss";
import { UserAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddDevice from "../../components/AddDevice/AddDevice";

function Header() {
  let currentHour = new Date().getHours();
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {}
  };

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
        <AddDevice />
        <Button onClick={handleLogOut}>Log out</Button>
      </Box>
    </Flex>
  );
}

export default Header;
