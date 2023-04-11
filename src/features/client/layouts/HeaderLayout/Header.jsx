import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { UserAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GridItem } from "@chakra-ui/react";
import AddDevice from "../../components/AddDevice/AddDevice";
import { useMediaQuery } from "@chakra-ui/react";

function Header() {
  let currentHour = new Date().getHours();
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const [isLargerThan975] = useMediaQuery("(min-width: 975px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {}
  };

  return (
    <Box bg="#2A3F74" borderRadius="10px" padding="20px" w="100%">
      {isLargerThan975 ? (
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
              <Button w="100px"> Settings</Button>
            </Link>
            <Button onClick={handleLogOut} w="100px" colorScheme="red">
              Log out
            </Button>
          </GridItem>
          <GridItem rowSpan={1} colSpan={7}>
            <Box className="buttons">
              <Link to="/">
                <Button w="100px">Floor plan</Button>
              </Link>
              <Link to="/all-devices">
                <Button w="100px">All devices</Button>
              </Link>
              <Link to="/switches">
                <Button w="100px">Switches</Button>
              </Link>
              <Link to="/sensors">
                <Button w="100px">Sensors</Button>
              </Link>
              <AddDevice />
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <React.Fragment>
          <Box display="flex" flexDir="column" gap="10px">
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
            <Box
              className="buttons"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              <Link to="/">
                <Button w="100px">Floor plan</Button>
              </Link>
              <Link to="/all-devices">
                <Button w="100px">All devices</Button>
              </Link>
              <Link to="/switches">
                <Button w="100px">Switches</Button>
              </Link>
              <Link to="/sensors">
                <Button w="100px">Sensors</Button>
              </Link>
              <AddDevice />

              <Link to="/settings">
                <Button w="100px"> Settings</Button>
              </Link>
              <Button onClick={handleLogOut} w="100px" colorScheme="red">
                Log out
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Header;
