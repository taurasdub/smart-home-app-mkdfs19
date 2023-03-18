import React from "react";
import { Container } from "@chakra-ui/react";

function MainContent({ children }) {
  return (
    <Container
      bg="#2A3F74"
      borderRadius="10px"
      height="75%"
      maxWidth="1240px"
      padding="50px"
    >
      {children}
    </Container>
  );
}

export default MainContent;
