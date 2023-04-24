import React from "react";
import { Box } from "@chakra-ui/react";

function SuccessAlertBox({ alertText }) {
  return (
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
      {alertText}{" "}
      <strong style={{ padding: 0, margin: 0 }}>successfully</strong>!
    </Box>
  );
}

export default SuccessAlertBox;
