import React from "react";
import { Box, Container } from "@chakra-ui/react";

function MainContent({ children, height, ...props }) {
  return (
    <Box
      bg="#2A3F74"
      borderRadius="10px"
      className="container"
      minH={height}
      maxW="1240px"
      padding="25px"
      mb={5}
      {...props}
    >
      {children}
    </Box>
  );
}

export default MainContent;
