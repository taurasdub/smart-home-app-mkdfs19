import React from "react";
import { Box } from "@chakra-ui/react";

function MainContent({ children, height, ...props }) {
  return (
    <Box
      borderRadius="10px"
      className="main-container"
      maxW="1240px"
      padding="25px"
      height={{ base: "47vh", sm: "70vh", md: "757px" }}
      overflow="auto"
      {...props}
    >
      {children}
    </Box>
  );
}

export default MainContent;
