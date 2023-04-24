import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { UserAuth } from "../../../../context/AuthContext";
import DeviceDetails from "../DeviceDetails/DeviceDetails";

function RoomDetails() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const { id } = useParams();
  const room = rooms.find((room) => room.id == id);

  const roomDevices = devices.filter((device) => device.room === room?.name);

  return (
    <DeviceDetails
      heading={room?.name}
      devices={roomDevices}
      rooms={rooms}
      currentUser={user}
    />
  );
}

export default RoomDetails;
