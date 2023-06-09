import React, { useContext } from "react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import {
  Badge,
  Button,
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeviceControl from "../DeviceControl/DeviceControl";
import { useSelector } from "react-redux";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import AddDevice from "../AddDevice/AddDevice";
import DeleteDeviceAlert from "../DeleteDeviceAlert/DeleteDeviceAlert";
import SuccessAlertBox from "../SuccessAlertBox/SuccessAlertBox";
import EditDeviceModal from "../EditDeviceModal/EditDeviceModal";
import { ThemeContext } from "../../../../App";

function DeviceDetails({ heading, devices, rooms, currentUser }) {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [deviceId, setDeviceId] = useState(null);
  const [isSensor, setIsSensor] = useState(false);
  const dispatch = useDispatch();
  const cancelRef = React.useRef();
  const { theme } = useContext(ThemeContext);

  const updatedDeviceSuccessAlert = useSelector(
    (state) => state.device.updatedDeviceSuccessAlert
  );

  const deletedDeviceSuccessAlert = useSelector(
    (state) => state.device.deletedDeviceSuccessAlert
  );

  const handleOpen = (device) => {
    setDeviceId(device.id);
    setIsSensor(device.type === "sensor");
    onEditOpen();
  };

  const handleDelete = (device) => {
    setDeviceId(device.id);
    onDeleteOpen();
  };

  const handleAddedDevice = () => {
    dispatch(getDevices(currentUser));
  };

  return (
    <MainContent>
      <Heading color={theme === "dark" ? "white" : "black"}>{heading}</Heading>
      {devices.length > 0 ? (
        <TableContainer color={theme === "dark" ? "white" : "black"}>
          <Table variant="simple" colorScheme="blue.800">
            <Thead>
              <Tr>
                <Th color={theme === "dark" ? "white" : "black"}>Type</Th>
                <Th
                  color={theme === "dark" ? "white" : "black"}
                  position="sticky"
                  overflowX="auto"
                  maxW="100%"
                  left="0"
                  zIndex={1}
                  backgroundColor={
                    theme === "light" ? "whiteAlpha.500" : "blackAlpha.500"
                  }
                  backdropFilter="auto"
                  backdropBlur="1px"
                >
                  Room
                </Th>
                <Th
                  color={theme === "dark" ? "white" : "black"}
                  position="sticky"
                  overflowX="auto"
                  maxW="100%"
                  left={"88px"}
                  zIndex={1}
                  backgroundColor={
                    theme === "light" ? "whiteAlpha.500" : "blackAlpha.500"
                  }
                  backdropFilter="auto"
                  backdropBlur="1px"
                >
                  Name
                </Th>
                <Th color={theme === "dark" ? "white" : "black"}>
                  Current Value/State
                </Th>
                <Th color={theme === "dark" ? "white" : "black"}>MQTT Topic</Th>
                <Th isNumeric color={theme === "dark" ? "white" : "black"}>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {devices.map((device) => (
                <Tr key={device.id}>
                  <Td>
                    <Badge>{device.type}</Badge>
                  </Td>
                  <Td
                    position="sticky"
                    overflowX="auto"
                    maxW="100%"
                    left="0"
                    zIndex={1}
                    backgroundColor={
                      theme === "light" ? "whiteAlpha.300" : "blackAlpha.300"
                    }
                    backdropFilter="auto"
                    backdropBlur="1px"
                  >
                    {device.room}
                  </Td>
                  <Td
                    color={theme === "dark" ? "white" : "black"}
                    position="sticky"
                    overflowX="auto"
                    maxW="100%"
                    left={"88px"}
                    zIndex={1}
                    backgroundColor={
                      theme === "light" ? "whiteAlpha.300" : "blackAlpha.300"
                    }
                    backdropFilter="auto"
                    backdropBlur="1px"
                  >
                    {device.deviceName}
                  </Td>
                  <Td>
                    {device.type === "sensor" && device.maxValue + device.unit}
                    {device.type === "switch" && (
                      <DeviceControl mqttDevice={device.mqttTopic} />
                    )}
                  </Td>
                  <Td>{device.mqttTopic}</Td>
                  <Td isNumeric>
                    <Flex justifyContent="flex-end" gap="10px">
                      <Button onClick={() => handleOpen(device)}>
                        <EditIcon color="black" />
                      </Button>
                      <Button onClick={() => handleDelete(device)}>
                        <CloseIcon color="black" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          gap="10px"
        >
          <Text color="white" textAlign="center">
            There are currently no devices added!
          </Text>
          <AddDevice onDeviceAdded={handleAddedDevice} />
        </Flex>
      )}
      <EditDeviceModal
        isEditOpen={isEditOpen}
        onEditClose={onEditClose}
        deviceId={deviceId}
        currentUser={currentUser}
        isSensor={isSensor}
        rooms={rooms}
        devices={devices}
      />
      <DeleteDeviceAlert
        isDeleteOpen={isDeleteOpen}
        cancelRef={cancelRef}
        onDeleteClose={onDeleteClose}
        currentUser={currentUser}
        deviceId={deviceId}
      />
      {updatedDeviceSuccessAlert && (
        <SuccessAlertBox alertText={"Device was updated"} />
      )}
      {deletedDeviceSuccessAlert && (
        <SuccessAlertBox alertText={"Device was deleted"} />
      )}
    </MainContent>
  );
}
export default DeviceDetails;
