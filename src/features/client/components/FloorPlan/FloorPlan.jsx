import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { devicesMock } from "../../mocks/devicesMock";
import { useNavigate } from "react-router-dom";
import DeviceControl from "../DeviceControl/DeviceControl";

function FloorPlan() {
  const navigate = useNavigate();

  const handleDeviceClick = (e) => {
    e.stopPropagation();
  };

  const handleRoomClick = (e, roomId) => {
    e.stopPropagation();
    navigate(`${roomId}`);
  };

  return (
    <MainContent>
      <Flex
        justifyContent="flex-start"
        gap="15px"
        flexWrap="wrap"
        alignItems="center"
      >
        {devicesMock.rooms.map((room) => (
          <Box
            bg="#edf2f7"
            height="300px"
            width="300px"
            key={room.name}
            onClick={(e) => handleRoomClick(e, room.id)}
            borderRadius="10px"
          >
            <Heading textAlign="center" p="5px">
              {room.name.toUpperCase()}
            </Heading>
            <Flex flexWrap="wrap" justifyContent="flex-start" gap="10px">
              {room.devices &&
                room.devices.map((device) => (
                  <Box
                    bg="white"
                    width="20%"
                    borderRadius="10px"
                    onClick={handleDeviceClick}
                    padding="5px"
                    marginLeft="5px"
                  >
                    <Text textAlign="center">
                      {device.name}
                      <DeviceControl mqttDevice={device.name} />
                    </Text>
                  </Box>
                ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    </MainContent>
  );
}

export default FloorPlan;
