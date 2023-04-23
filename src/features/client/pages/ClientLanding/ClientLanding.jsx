import React from "react";
import Header from "../../layouts/HeaderLayout/Header";
import Weather from "../../layouts/WeatherLayout/Weather";
import { Navigate, Route, Routes } from "react-router-dom";
import FloorPlan from "../../components/FloorPlan/FloorPlan";
import AllDevices from "../../components/AllDevices/AllDevices";
import Lights from "../../components/Lights/Lights";
import { Container, Flex } from "@chakra-ui/react";
import RoomDetails from "../../components/RoomDetails/RoomDetails";
import SignUp from "../SignUpPage/SignUp";
import { UserAuth } from "../../../../context/AuthContext";
import SignIn from "../SignInPage/SignIn";
import ProtectedRoute from "../../../../config/ProtectedRoute";
import Switches from "../../components/Switches/Switches";
import Sensors from "../../components/Sensors/Sensors";
import UserSettings from "../../components/UserSettings/UserSettings";
import Features from "../../components/Features/Features";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

function ClientLanding() {
  const { user } = UserAuth();
  const deletedFloorPlanSuccessAlert = useSelector(
    (state) => state.room.deletedFloorPlanSuccessAlert
  );
  const addedFloorPlanSuccessAlert = useSelector(
    (state) => state.room.addedFloorPlanSuccessAlert
  );

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Container maxW="1240px">
      {user && (
        <Flex
          flexDir={isLargerThan500 ? "row" : "column"}
          mt={5}
          mb={5}
          gap={5}
        >
          <Header />
          <Weather />
        </Flex>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <FloorPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-devices"
          element={
            <ProtectedRoute>
              <AllDevices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/switches"
          element={
            <ProtectedRoute>
              <Switches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sensors"
          element={
            <ProtectedRoute>
              <Sensors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <ProtectedRoute>
              <RoomDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/features" element={<Features />} />
      </Routes>
      {deletedFloorPlanSuccessAlert && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100%"
          bg="green.400"
          textAlign="center"
          p={3}
          className="drop-down"
        >
          Floor plan was deleted{" "}
          <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
        </Box>
      )}
      {addedFloorPlanSuccessAlert && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100%"
          bg="green.400"
          textAlign="center"
          p={3}
          className="drop-down"
        >
          Floor plan was added{" "}
          <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
        </Box>
      )}
    </Container>
  );
}

export default ClientLanding;
