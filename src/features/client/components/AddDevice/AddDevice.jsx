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
import { useEffect } from "react";
import { addDevice } from "../../../../store/reducers/deviceSlice";
import { useDispatch } from "react-redux";
import { typeMock } from "../../mocks/typeMock";
import { UserAuth } from "../../../../context/AuthContext";
import { useSelector } from "react-redux";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { deviceHideAlert } from "../../../../store/reducers/deviceSlice";
import { Box } from "@chakra-ui/react";
import "./AddDevice.css";

function AddDevice() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceType, setDeviceType] = useState("switch");
  const { register, handleSubmit, reset } = useForm();
  const { user } = UserAuth();
  const addedDeviceSuccessAlert = useSelector(
    (state) => state.device.addedDeviceSuccessAlert
  );

  useEffect(() => {
    dispatch(getRooms(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);

  const onSubmit = async (data) => {
    dispatch(
      addDevice({
        user,
        deviceType,
        data: {
          mqttTopic: data.mqttTopic,
          room: data.room || "",
          deviceName: data.deviceName,
          type: deviceType || "",
          ...(deviceType === "sensor" && {
            unit: data.unit,
            maxValue: data.maxValue,
          }),
        },
      })
    ).then(() => {
      setTimeout(() => dispatch(deviceHideAlert()), 4000);
      reset();
    });
    onClose();
  };

  const handleDeviceChange = (type) => {
    setDeviceType(type.name);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <React.Fragment>
      <Button onClick={onOpen} mr={"10px"}>
        Add Device
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <ModalContent maxW="90%">
            <ModalHeader>Add Device Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Choose a room</FormLabel>
              {rooms.length > 0 ? (
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
              ) : (
                <Box>Currently there are no rooms in the floor plan.</Box>
              )}
              <FormLabel>Choose device type</FormLabel>
              <RadioGroup defaultValue="switch">
                <HStack>
                  {typeMock.types.map((type) => (
                    <Radio
                      key={type.name}
                      value={type.name}
                      {...register("type")}
                      onChange={() => handleDeviceChange(type)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </HStack>
              </RadioGroup>
              <FormLabel>
                Widget Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter widget name"
                required
                {...register("deviceName")}
              />
              <FormLabel>
                MQTT Topic Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                required
                placeholder="Enter target MQTT topic"
                {...register("mqttTopic")}
              />
              {deviceType === "sensor" && (
                <React.Fragment>
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
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      {addedDeviceSuccessAlert && (
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
          Device was added{" "}
          <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
        </Box>
      )}
    </React.Fragment>
  );
}

export default AddDevice;
