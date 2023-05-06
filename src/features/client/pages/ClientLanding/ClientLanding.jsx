import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container, Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { UserAuth } from "../../../../context/AuthContext";
import { useSelector } from "react-redux";
import AllDevices from "../../components/AllDevices/AllDevices";
import FloorPlan from "../../components/FloorPlan/FloorPlan";
import Features from "../../components/Features/Features";
import Header from "../../layouts/HeaderLayout/Header";
import ProtectedRoute from "../../../../config/ProtectedRoute";
import RoomDetails from "../../components/RoomDetails/RoomDetails";
import SignIn from "../SignInPage/SignIn";
import SignUp from "../SignUpPage/SignUp";
import Sensors from "../../components/Sensors/Sensors";
import SuccessAlertBox from "../../components/SuccessAlertBox/SuccessAlertBox";
import Switches from "../../components/Switches/Switches";
import UserSettings from "../../components/UserSettings/UserSettings";
import Weather from "../../layouts/WeatherLayout/Weather";

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
        <Flex flexDir={isLargerThan500 ? "row" : "column"} mb={5} gap={5}>
          <Header user={user} />
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
        <SuccessAlertBox alertText={"Floor plan was deleted"} />
      )}
      {addedFloorPlanSuccessAlert && (
        <SuccessAlertBox alertText={"Floor plan was added"} />
      )}
    </Container>
  );
}

export default ClientLanding;
