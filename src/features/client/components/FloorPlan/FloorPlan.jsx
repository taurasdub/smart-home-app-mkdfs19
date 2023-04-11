import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { useNavigate } from "react-router-dom";
import DeviceControl from "../DeviceControl/DeviceControl";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { getRooms } from "../../../../store/reducers/roomSlice";
import AddFloorPlan from "../AddFloorPlan/AddFloorPlan";
import { UserAuth } from "../../../../context/AuthContext";
import { useMediaQuery } from "@chakra-ui/react";

function FloorPlan() {
  const dispatch = useDispatch();
  const { user } = UserAuth();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  const navigate = useNavigate();

  const handleDeviceClick = (e) => {
    e.stopPropagation();
  };

  const handleRoomClick = (e, roomId) => {
    e.stopPropagation();
    navigate(`${roomId}`);
  };

  const [hoveredBox, setHoveredBox] = useState(null);

  return (
    <MainContent
      height={"79vh"}
      display="flex"
      justifyContent={rooms.length > 0 ? "flex-start" : "center"}
      alignItems={rooms.length > 0 ? "normal" : "center"}
      gap="15px"
      mb={5}
      mt={5}
    >
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <Box
            bg="#edf2f7"
            height="300px"
            width="300px"
            key={room.name}
            onClick={(e) => handleRoomClick(e, room.id)}
            borderRadius="10px"
            transform={hoveredBox === room.name ? "scale(1.05)" : ""}
            transition="transform 0.2s"
            onMouseEnter={() => setHoveredBox(room.name)}
            onMouseLeave={() => setHoveredBox(null)}
            cursor="pointer"
            overflow="hidden"
          >
            <Heading textAlign="center" p="5px">
              {room.name}
            </Heading>
            <Flex flexWrap="wrap" justifyContent="flex-start" gap="10px">
              {devices
                .filter((device) => device.room === room.name)
                .map((device) => (
                  <Box
                    key={device.deviceName}
                    bg="white"
                    width="55px"
                    borderRadius="10px"
                    onClick={handleDeviceClick}
                    padding="5px"
                    marginLeft="5px"
                    textAlign="center"
                  >
                    <Text textAlign="center">
                      {device.deviceName.toUpperCase().slice(0, 4)}
                    </Text>
                    {device.type === "switch" && (
                      <DeviceControl mqttDevice={device.mqttTopic} />
                    )}
                    <Text textAlign="center">
                      {device.type === "sensor" &&
                        device.maxValue + device.unit}
                    </Text>
                  </Box>
                ))}
            </Flex>
          </Box>
        ))
      ) : (
        <AddFloorPlan type="button" />
      )}
    </MainContent>
  );
}

export default FloorPlan;
