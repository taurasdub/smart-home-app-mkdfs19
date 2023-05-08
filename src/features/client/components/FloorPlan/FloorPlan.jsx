import React, { useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { UserAuth } from "../../../../context/AuthContext";
import AddFloorPlan from "../AddFloorPlan/AddFloorPlan";
import DeviceControl from "../DeviceControl/DeviceControl";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import RoomBox from "../RoomBox/RoomBox";
import DeviceBox from "../DeviceBox/DeviceBox";

function FloorPlan() {
  const dispatch = useDispatch();
  const { user } = UserAuth();

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const handleOnFloorPlanAdded = () => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  };

  return (
    <MainContent
      display="flex"
      justifyContent={rooms.length > 0 ? "flex-start" : "center"}
      alignItems={rooms.length > 0 ? "normal" : "center"}
      flexWrap="wrap"
      paddingLeft={{ base: "60px", sm: "80px", md: "60px" }}
    >
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomBox room={room}>
            <Flex flexWrap="wrap" justifyContent="flex-start" gap="10px">
              {devices.length > 0 &&
                devices
                  .filter((device) => device.room === room.name)
                  .map((device) => (
                    <DeviceBox device={device}>
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
                    </DeviceBox>
                  ))}
            </Flex>
          </RoomBox>
        ))
      ) : (
        <AddFloorPlan type="button" onFloorPlanAdded={handleOnFloorPlanAdded} />
      )}
    </MainContent>
  );
}

export default FloorPlan;
