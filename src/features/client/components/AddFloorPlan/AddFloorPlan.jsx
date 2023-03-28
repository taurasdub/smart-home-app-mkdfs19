import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormLabel,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { addFloorPlan } from "../../../../store/reducers/roomSlice";
import { UserAuth } from "../../../../context/AuthContext";

function AddFloorPlan() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const [rooms, setRooms] = useState([{ name: "" }]);
  const { user } = UserAuth();

  const onSubmit = async () => {
    console.log(rooms);
    const newRooms = rooms.map((room) => ({ name: room.name }));
    newRooms.forEach((room) => dispatch(addFloorPlan({ user, data: room })));
    onClose();
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { name: "" }]);
  };

  const handleInputChange = (index, value) => {
    const newRooms = [...rooms];
    newRooms[index].name = value;
    setRooms(newRooms);
  };

  const handleDeleteField = (index) => {
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    setRooms(newRooms);
  };

  return (
    <React.Fragment>
      <Button onClick={onOpen} mr={"10px"}>
        Add Floor Plan
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent maxW="90%">
            <ModalHeader>Add Floor Plan Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Add room into the floor plan</FormLabel>
              <Button onClick={handleAddRoom}>Add room</Button>
              {rooms.map((room, index) => (
                <Box key={index}>
                  <FormLabel>Room #{index + 1}</FormLabel>
                  <Flex>
                    <Input
                      value={room.name}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Enter name for room ${index + 1}`}
                      {...register(`rooms.${index}.name`, {
                        onChange: (e) =>
                          handleInputChange(index, e.target.value),
                      })}
                    />
                    <Button onClick={() => handleDeleteField(index)}>-</Button>
                  </Flex>
                </Box>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default AddFloorPlan;
