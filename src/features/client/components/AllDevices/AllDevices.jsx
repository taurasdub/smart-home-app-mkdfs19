import { Box } from "@chakra-ui/react";
import React from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { devicesMock } from "../../mocks/devicesMock";

function AllDevices() {
  return (
    <MainContent>
      <div>All Devices Component</div>
      {devicesMock.rooms.map(
        (room) =>
          room.devices && room.devices.map((item) => <li>{item.name}</li>)
      )}
    </MainContent>
  );
}

export default AllDevices;
