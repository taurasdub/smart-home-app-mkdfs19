import React from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { Flex, Badge } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { UserAuth } from "../../../../context/AuthContext";
import { Heading } from "@chakra-ui/react";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import DeviceDetails from "../DeviceDetails/DeviceDetails";

function Switches() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const switchDevices = devices.filter((device) => device.type === "switch");

  return (
    <DeviceDetails
      heading="Switches"
      devices={switchDevices}
      rooms={rooms}
      currentUser={user}
    />
  );
}

export default Switches;
