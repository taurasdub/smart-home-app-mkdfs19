import React from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import DeviceControl from "../DeviceControl/DeviceControl";
import { Text, Box, Heading, Flex, Badge } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { UserAuth } from "../../../../context/AuthContext";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";

function RoomDetails() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const { id } = useParams();
  const room = rooms.find((room) => room.id == id);
  const [value, setValue] = useState(0);

  const handleDeviceClick = (e) => {
    e.stopPropagation();
  };

  const roomDevices = devices.filter((device) => device.room === room.name);

  return (
    <MainContent>
      {room ? (
        <>
          <Heading color="white">{room.name.toUpperCase()}</Heading>
          <TableContainer color="white">
            <Table variant="simple" colorScheme="blue.800">
              <Thead>
                <Tr>
                  <Th color="white">Type</Th>
                  <Th color="white">Name</Th>
                  <Th color="white">Current Value</Th>
                  <Th isNumeric color="white">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {roomDevices.map((device) => (
                  <Tr>
                    <Td>
                      <Badge>{device.type}</Badge>
                    </Td>
                    <Td>{device.deviceName}</Td>
                    <Td>{device.maxValue}</Td>
                    <Td isNumeric>
                      <Flex justifyContent="flex-end" gap="10px">
                        <Button>
                          <EditIcon color="black" />
                        </Button>
                        <Button>
                          <CloseIcon color="black" />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h2>Room not found!</h2>
      )}
    </MainContent>
  );
}

export default RoomDetails;
