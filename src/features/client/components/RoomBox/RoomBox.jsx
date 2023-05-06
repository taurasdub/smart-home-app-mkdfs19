import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { ThemeContext } from "../../../../App";

function RoomBox({ room, children }) {
  const handleRoomClick = (e, roomId) => {
    e.stopPropagation();
    navigate(`${roomId}`);
  };

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [hoveredBox, setHoveredBox] = useState(null);

  return (
    <>
      {room.id && (
        <Box
          bg={theme === "light" ? "#edf2f7" : "blackAlpha.500"}
          height="350px"
          width="350px"
          key={room.id}
          onClick={(e) => handleRoomClick(e, room.id)}
          borderRadius="10px"
          transform={hoveredBox === room.id ? "scale(1.05)" : ""}
          transition="transform 0.2s"
          onMouseEnter={() => setHoveredBox(room.id)}
          onMouseLeave={() => setHoveredBox(null)}
          cursor="pointer"
          overflow="hidden"
          mr={4}
          mb={4}
        >
          <Heading textAlign="center" p="5px">
            {room.name}
          </Heading>
          {children}
        </Box>
      )}
    </>
  );
}

export default RoomBox;
