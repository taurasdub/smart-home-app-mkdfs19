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

function FloorPlan() {
  const dispatch = useDispatch();
  const { user } = UserAuth();

  console.log(user);

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

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
    <MainContent>
      <Flex
        justifyContent={rooms.length > 0 ? "flex-start" : "center"}
        gap="15px"
        flexWrap="wrap"
        alignItems="center"
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
                      width="20%"
                      borderRadius="10px"
                      onClick={handleDeviceClick}
                      padding="5px"
                      marginLeft="5px"
                    >
                      <Text textAlign="center">
                        {device.deviceName.toUpperCase().slice(0, 4)}
                        <DeviceControl mqttDevice={device.mqttTopic} />
                      </Text>
                    </Box>
                  ))}
              </Flex>
            </Box>
          ))
        ) : (
          <AddFloorPlan />
        )}
      </Flex>
    </MainContent>
  );
}

export default FloorPlan;
