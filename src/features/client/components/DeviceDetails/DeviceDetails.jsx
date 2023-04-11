import React from "react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import {
  Badge,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDevice,
  updateDevice,
} from "../../../../store/reducers/deviceSlice";
import DeviceControl from "../DeviceControl/DeviceControl";
import { useSelector } from "react-redux";
import { deviceHideAlert } from "../../../../store/reducers/deviceSlice";
import AddDevice from "../AddDevice/AddDevice";

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
  const { register, handleSubmit, reset } = useForm();
  const [deviceId, setDeviceId] = useState(null);
  const [isSensor, setIsSensor] = useState(false);
  const dispatch = useDispatch();
  const cancelRef = React.useRef();

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

  const onSubmit = async (data) => {
    const currentDevice = devices.find((device) => device.id === deviceId);
    const updatedDevice = {
      deviceName:
        data.deviceName !== "" ? data.deviceName : currentDevice.deviceName,
      room: data.room || currentDevice.room,
      ...(isSensor && {
        unit: data.unit || currentDevice.unit,
        maxValue: data.maxValue || currentDevice.maxValue,
      }),
    };
    if (
      updatedDevice.deviceName === currentDevice.deviceName &&
      updatedDevice.room === currentDevice.room &&
      (!isSensor ||
        (updatedDevice.unit === currentDevice.unit &&
          updatedDevice.maxValue === currentDevice.maxValue))
    ) {
      onEditClose();
      return;
    }
    dispatch(
      updateDevice({ currentUser, deviceId, isSensor, data: updatedDevice })
    ).then(() => {
      setTimeout(() => dispatch(deviceHideAlert()), 4000);
      reset();
    });
    onEditClose();
  };

  const handleConfirmDelete = async () => {
    dispatch(deleteDevice({ currentUser, deviceId })).then(() => {
      setTimeout(() => dispatch(deviceHideAlert()), 4000);
    });
    onDeleteClose();
  };

  return (
    <MainContent height="750px">
      <React.Fragment>
        <Heading color="white">{heading}</Heading>
        {devices.length > 0 ? (
          <TableContainer color="white">
            <Table variant="simple" colorScheme="blue.800">
              <Thead>
                <Tr>
                  <Th color="white">Type</Th>
                  <Th
                    color="white"
                    position="sticky"
                    overflowX="auto"
                    maxW="100%"
                    left="0"
                    zIndex={1}
                    backgroundColor="blackAlpha.500"
                    backdropFilter="auto"
                    backdropBlur="1px"
                  >
                    Room
                  </Th>
                  <Th
                    color="white"
                    position="sticky"
                    overflowX="auto"
                    maxW="100%"
                    left={"88px"}
                    zIndex={1}
                    backgroundColor="blackAlpha.500"
                    backdropFilter="auto"
                    backdropBlur="1px"
                  >
                    Name
                  </Th>
                  <Th color="white">Current Value/State</Th>
                  <Th color="white">MQTT Topic</Th>
                  <Th isNumeric color="white">
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
                      backgroundColor="blackAlpha.300"
                      backdropFilter="auto"
                      backdropBlur="1px"
                    >
                      {device.room}
                    </Td>
                    <Td
                      color="white"
                      position="sticky"
                      overflowX="auto"
                      maxW="100%"
                      left={"88px"}
                      zIndex={1}
                      backgroundColor="blackAlpha.300"
                      backdropFilter="auto"
                      backdropBlur="1px"
                    >
                      {device.deviceName}
                    </Td>
                    <Td>
                      {device.type === "sensor" &&
                        device.maxValue + device.unit}
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
            <AddDevice></AddDevice>
          </Flex>
        )}
        <Modal
          isOpen={isEditOpen}
          onClose={() => {
            onEditClose();
            reset();
          }}
        >
          <ModalOverlay />
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <ModalContent maxW="90%">
              <ModalHeader>Edit Device</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormLabel>Device name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter new widget name"
                  {...register("deviceName")}
                />
                <FormLabel>Device location</FormLabel>
                {rooms.length > 0 ? (
                  <RadioGroup>
                    <HStack>
                      {rooms.map((room) => (
                        <Radio
                          key={room.id}
                          value={room.name}
                          {...register("room")}
                        >
                          {room.name.charAt(0).toUpperCase() +
                            room.name.slice(1)}
                        </Radio>
                      ))}
                      <Radio value={"none"} {...register("room")}>
                        None
                      </Radio>
                    </HStack>
                  </RadioGroup>
                ) : (
                  <Text>Currently there are no rooms in the floor plan.</Text>
                )}
                {isSensor && (
                  <React.Fragment>
                    <FormLabel>Units</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter units"
                      {...register("unit")}
                    />
                    <FormLabel>Max value</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter max value"
                      {...register("maxValue")}
                    />
                  </React.Fragment>
                )}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onEditClose}>
                  Cancel
                </Button>
                <Button variant="ghost" type="submit">
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete device
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        {updatedDeviceSuccessAlert && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100%"
            bg="green.400"
            textAlign="center"
            p={3}
            className="drop-down"
          >
            Device was updated{" "}
            <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
          </Box>
        )}
        {deletedDeviceSuccessAlert && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100%"
            bg="green.400"
            textAlign="center"
            p={3}
            className="drop-down"
          >
            Device was deleted{" "}
            <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
          </Box>
        )}
      </React.Fragment>
    </MainContent>
  );
}
export default DeviceDetails;
