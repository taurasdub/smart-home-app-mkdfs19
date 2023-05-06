import React, { useState, useEffect, useContext } from "react";
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
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { typeMock } from "../../mocks/typeMock";
import { UserAuth } from "../../../../context/AuthContext";
import { getRooms } from "../../../../store/reducers/roomSlice";
import {
  deviceHideAlert,
  addDevice,
} from "../../../../store/reducers/deviceSlice";
import { useForm } from "react-hook-form";
import SuccessAlertBox from "../SuccessAlertBox/SuccessAlertBox";
import "./AddDevice.css";
import { ThemeContext } from "../../../../App";

function AddDevice({ onDeviceAdded }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceType, setDeviceType] = useState("switch");
  const { register, handleSubmit, reset } = useForm();
  const { user } = UserAuth();
  const { theme } = useContext(ThemeContext);
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
          room: data.room || "none",
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
      onDeviceAdded();
      reset();
    });
    onClose();
  };

  const handleDeviceChange = (type) => {
    setDeviceType(type.name);
  };

  const handleClose = () => {
    reset();
    setDeviceType("switch");
    onClose();
  };

  return (
    <React.Fragment>
      <Button
        onClick={onOpen}
        w="100px"
        marginRight="10px"
        colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
      >
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
        <SuccessAlertBox alertText={"Device was added"} />
      )}
    </React.Fragment>
  );
}

export default AddDevice;
