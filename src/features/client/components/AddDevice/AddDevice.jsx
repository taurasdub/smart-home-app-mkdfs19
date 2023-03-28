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
import AddFloorPlan from "../AddFloorPlan/AddFloorPlan";

function AddDevice() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceType, setDeviceType] = useState("switch");
  const { register, handleSubmit } = useForm();
  const { user } = UserAuth();

  useEffect(() => {
    dispatch(getRooms(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);

  const onSubmit = async (data, type) => {
    dispatch(
      addDevice({
        user,
        data: {
          initValue: data.initValue,
          maxValue: data.maxValue,
          mqttTopic: data.mqttTopic,
          room: data.room,
          unit: data.unit,
          deviceName: data.deviceName,
          type: type,
          onText: data.onText,
          offText: data.offText,
        },
      })
    );
    onClose();
  };

  return (
    <React.Fragment>
      <Button onClick={onOpen} mr={"10px"}>
        Add Device
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit((data) => onSubmit(data, deviceType))}>
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
                <div>
                  You don't have a floor plan set up yet. If you want device to
                  be assigned to the room instantly, you should click "Add Floor
                  Plan" button below.
                  <AddFloorPlan />
                </div>
              )}
              <FormLabel>Choose device type</FormLabel>
              <RadioGroup>
                <HStack>
                  {typeMock.types.map((type) => (
                    <Radio
                      key={type.name}
                      value={type.name}
                      {...register("type")}
                      onChange={() => setDeviceType(type.name)}
                    >
                      {type.name}
                    </Radio>
                  ))}
                </HStack>
              </RadioGroup>
              <FormLabel>Widget Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter widget name"
                {...register("deviceName")}
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
