import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { ThemeContext } from "../../../../App";

function DeviceBox({ device, children }) {
  const handleDeviceClick = (e) => {
    e.stopPropagation();
  };

  const { theme } = useContext(ThemeContext);
  return (
    <Box
      key={device.id}
      bg={theme === "dark" ? "#393053" : "white"}
      width="55px"
      borderRadius="10px"
      onClick={handleDeviceClick}
      padding="5px"
      marginLeft="5px"
      textAlign="center"
      color={theme === "dark" ? "white" : "black"}
    >
      {children}
    </Box>
  );
}

export default DeviceBox;
