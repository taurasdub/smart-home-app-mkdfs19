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
  RadioGroup,
  HStack,
  Radio,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { devicesMock } from "../../mocks/devicesMock";

function AddDevice() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceType, setDeviceType] = useState("sensor");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };
  return (
    <React.Fragment>
      <Button onClick={onOpen}>Add Device</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent maxW="90%">
            <ModalHeader>Add Device Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Choose a room</FormLabel>
              <RadioGroup>
                <HStack>
                  {devicesMock.rooms.map((room) => (
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
              <Button
                onClick={() => setDeviceType("sensor")}
                bg={deviceType === "sensor" && "green.100"}
              >
                Sensor
              </Button>
              <Button
                onClick={() => setDeviceType("switch")}
                bg={deviceType === "switch" && "green.100"}
              >
                Switch
              </Button>
              <FormLabel>Widget Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter widget name"
                {...register("widgetName")}
              />
              <FormLabel>MQTT Topic Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter target MQTT topic"
                {...register("mqttTopic")}
              />
              {deviceType === "sensor" ? (
                <React.Fragment>
                  <FormLabel>Initial value</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter a numeric value only"
                    {...register("initValue")}
                  />
                  <FormLabel>Unit</FormLabel>
                  <Input
                    type="text"
                    placeholder="C,F,K,lux"
                    {...register("unit")}
                  />
                  <FormLabel>Max value</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter max allowable value"
                    {...register("maxValue")}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FormLabel>Initial Value</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter a value from 0 to 1 only"
                    {...register("initValue")}
                  />
                  <FormLabel>ON Text</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter ON text"
                    {...register("onText")}
                  />
                  <FormLabel>OFF Text</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter OFF text"
                    {...register("offText")}
                  />
                </React.Fragment>
              )}
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

export default AddDevice;
