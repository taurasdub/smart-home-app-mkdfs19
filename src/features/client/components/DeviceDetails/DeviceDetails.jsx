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
    dispatch(
      updateDevice({
        currentUser,
        deviceId,
        isSensor,
        data: {
          deviceName: data.deviceName,
          room: data.room || "",
          ...(isSensor && { unit: data.unit, maxValue: data.maxValue }),
        },
      })
    );
    onEditClose();
  };

  const handleConfirmDelete = async () => {
    dispatch(deleteDevice({ currentUser, deviceId }));
    onDeleteClose();
  };

  return (
    <MainContent>
      <React.Fragment>
        <Heading color="white">{heading}</Heading>
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
              {devices.map((device) => (
                <Tr key={device.deviceName}>
                  <Td>
                    <Badge>{device.type}</Badge>
                  </Td>
                  <Td>{device.deviceName}</Td>
                  <Td>{device.maxValue}</Td>
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
                {rooms.length > 0 && (
                  <RadioGroup>
                    <HStack>
                      {rooms.map((room) => (
                        <Radio
                          key={room.name}
                          value={room.name}
                          {...register("room")}
                        >
                          {room.name}
                        </Radio>
                      ))}
                    </HStack>
                  </RadioGroup>
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
      </React.Fragment>
    </MainContent>
  );
}
export default DeviceDetails;
