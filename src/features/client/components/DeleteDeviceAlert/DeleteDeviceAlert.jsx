import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  deleteDevice,
  deviceHideAlert,
} from "../../../../store/reducers/deviceSlice";

function DeleteDeviceAlert({
  isDeleteOpen,
  cancelRef,
  onDeleteClose,
  currentUser,
  deviceId,
}) {
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    dispatch(deleteDevice({ currentUser, deviceId })).then(() => {
      setTimeout(() => dispatch(deviceHideAlert()), 4000);
    });
    onDeleteClose();
  };

  return (
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
  );
}

export default DeleteDeviceAlert;
