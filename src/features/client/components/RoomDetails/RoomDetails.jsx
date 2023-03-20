import React from "react";
import { useParams } from "react-router-dom";
import { devicesMock } from "../../mocks/devicesMock";
import MainContent from "../../layouts/MainContentLayout/MainContent";

function RoomDetails() {
  const { id } = useParams();
  console.log(id);
  const room = devicesMock.rooms.find((room) => room.id == id);

  return (
    <MainContent>
      {room ? (
        <>
          <h2>Room Name: {room.name}</h2>
          <ul>
            {room.devices &&
              room.devices.map((device) => (
                <li key={device.name}>
                  Device Name: {device.name}, State: {device.state}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <h2>Room not found!</h2>
      )}
    </MainContent>
  );
}

export default RoomDetails;
