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

function ClientLanding() {
  const { user } = UserAuth();

  return (
    <Container maxW="1240px">
      {user && (
        <Flex
          justifyContent="space-between"
          height="17vh"
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
          path="/lights"
          element={
            <ProtectedRoute>
              <Lights />
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
      </Routes>
    </Container>
  );
}

export default ClientLanding;
