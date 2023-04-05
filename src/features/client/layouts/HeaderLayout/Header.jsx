import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { UserAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GridItem } from "@chakra-ui/react";
import AddDevice from "../../components/AddDevice/AddDevice";
import { SettingsIcon } from "@chakra-ui/icons";

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
    <Box bg="#2A3F74" borderRadius="10px" padding="20px" w="100%">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap={4}
        h="100%"
      >
        <GridItem rowSpan={1} colSpan={7}>
          <Heading color="white">
            Good
            {currentHour >= 3 && currentHour <= 11
              ? " morning ☕"
              : currentHour >= 12 && currentHour <= 17
              ? " afternoon 🌤️"
              : currentHour >= 18 && currentHour <= 21
              ? " evening 🌇"
              : " night 🌙"}
          </Heading>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={1}
          display="flex"
          justifyContent="space-evenly"
          flexDir="column"
        >
          <Link to="/settings">
            <Button w="100%"> Settings</Button>
          </Link>
          <Button onClick={handleLogOut} w="100%" colorScheme="red">
            Log out
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={7}>
          <Box className="buttons">
            <Link to="/">
              <Button>Floor plan</Button>
            </Link>
            <Link to="/all-devices">
              <Button>All devices</Button>
            </Link>
            <Link to="/switches">
              <Button>Switches</Button>
            </Link>
            <Link to="/sensors">
              <Button>Sensors</Button>
            </Link>
            <AddDevice />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Header;
