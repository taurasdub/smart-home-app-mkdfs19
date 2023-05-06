import React, { useContext } from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { UserAuth } from "../../../../context/AuthContext";
import { Button, Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  deleteFloorPlan,
  roomHideAlert,
} from "../../../../store/reducers/roomSlice";
import { ThemeContext } from "../../../../App";

function UserSettings() {
  const { user } = UserAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    dispatch(deleteFloorPlan(user)).then(() => {
      setTimeout(() => dispatch(roomHideAlert()), 4000);
    });
    onClose();
  };
  return (
    <MainContent height="750px">
      <Heading color={theme === "dark" ? "white" : "black"}>
        Account Information
      </Heading>
      <Text color={theme === "dark" ? "white" : "black"} mt={2} mb={2}>
        Email: {user.email}
      </Text>
      <Divider orientation="horizontal" color="white" mb={3} mt={3} />
      <Heading color={theme === "dark" ? "white" : "black"}>
        Account Actions
      </Heading>
      <Button
        onClick={onOpen}
        mt={2}
        width="200px"
        colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
        mr={2}
      >
        Delete Current Floor Plan
      </Button>
      <Button
        mt={2}
        colorScheme={theme === "dark" ? "blackAlpha" : "gray"}
        onClick={toggleTheme}
      >
        Use {theme === "light" ? "dark" : "light"} theme
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete current floor plan
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </MainContent>
  );
}

export default UserSettings;
