import { Box } from "@chakra-ui/react";
import React from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { devicesMock } from "../../mocks/devicesMock";

function Lights() {
  const lightDevices = devicesMock.rooms.flatMap(
    (room) => room.devices?.filter((device) => device.type === "light") || []
  );

  return (
    <MainContent>
      <div>Lights component</div>
      {lightDevices.map((light) => (
        <li key={light.name}>{light.name}</li>
      ))}
    </MainContent>
  );
}

export default Lights;
