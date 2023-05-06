import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  GridItem,
  useMediaQuery,
  Box,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import AddDevice from "../../components/AddDevice/AddDevice";
import "./index.scss";
import { ThemeContext } from "../../../../App";

function Header({ user }) {
  let currentHour = new Date().getHours();
  const { logout } = UserAuth();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLargerThan975] = useMediaQuery("(min-width: 975px)");

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {}
  };

  const handleAddedDevice = () => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  };

  console.log(theme);

  return (
    <Box
      borderRadius="10px"
      padding="20px"
      w="100%"
      marginTop="20px"
      className="header-container"
    >
      {isLargerThan975 ? (
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={4}
          h="100%"
        >
          <GridItem rowSpan={1} colSpan={7}>
            <Heading>
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
              <Button
                w="100px"
                colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
              >
                {" "}
                Settings
              </Button>
            </Link>
            <Button onClick={handleLogOut} w="100px" colorScheme="red">
              Log out
            </Button>
          </GridItem>
          <GridItem rowSpan={1} colSpan={7}>
            <Box className="buttons">
              <Link to="/">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Floor plan
                </Button>
              </Link>
              <Link to="/all-devices">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  All devices
                </Button>
              </Link>
              <Link to="/switches">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Switches
                </Button>
              </Link>
              <Link to="/sensors">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Sensors
                </Button>
              </Link>
              <AddDevice onDeviceAdded={handleAddedDevice} />
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <React.Fragment>
          <Box display="flex" flexDir="column" gap="10px">
            <Heading>
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
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Floor plan
                </Button>
              </Link>
              <Link to="/all-devices">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  All devices
                </Button>
              </Link>
              <Link to="/switches">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Switches
                </Button>
              </Link>
              <Link to="/sensors">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  Sensors
                </Button>
              </Link>
              <AddDevice onDeviceAdded={handleAddedDevice} />
              <Link to="/settings">
                <Button
                  w="100px"
                  colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
                >
                  {" "}
                  Settings
                </Button>
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
