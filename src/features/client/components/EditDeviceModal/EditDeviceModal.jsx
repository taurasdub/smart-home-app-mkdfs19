import React from "react";
import { useForm } from "react-hook-form";
import {
  updateDevice,
  deviceHideAlert,
} from "../../../../store/reducers/deviceSlice";
import {
  Button,
  FormLabel,
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
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function EditDeviceModal({
  isEditOpen,
  onEditClose,
  deviceId,
  currentUser,
  isSensor,
  rooms,
  devices,
}) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

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

  return (
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
                      {room.name.charAt(0).toUpperCase() + room.name.slice(1)}
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
  );
}

export default EditDeviceModal;
