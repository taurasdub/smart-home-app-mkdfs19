import React from "react";
import Header from "../../layouts/HeaderLayout/Header";
import Weather from "../../layouts/WeatherLayout/Weather";
import { Route, Routes } from "react-router-dom";
import FloorPlan from "../../components/FloorPlan/FloorPlan";
import AllDevices from "../../components/AllDevices/AllDevices";
import Lights from "../../components/Lights/Lights";
import { Box, Container, Flex } from "@chakra-ui/react";
import RoomDetails from "../../components/RoomDetails/RoomDetails";

function ClientLanding() {
  return (
    <Container maxW="1240px">
      <Flex justifyContent="space-between" height="17vh" mt={5} mb={5} gap={5}>
        <Header />
        <Weather />
      </Flex>
      <Routes>
        <Route path="/" element={<FloorPlan />} />
        <Route path="/all-devices" element={<AllDevices />} />
        <Route path="/lights" element={<Lights />} />
        <Route path=":id" element={<RoomDetails />} />
      </Routes>
    </Container>
  );
}

export default ClientLanding;
