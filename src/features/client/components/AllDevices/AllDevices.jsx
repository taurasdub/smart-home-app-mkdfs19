import React from "react";
import { UserAuth } from "../../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { useEffect } from "react";

import { getRooms } from "../../../../store/reducers/roomSlice";

import DeviceDetails from "../DeviceDetails/DeviceDetails";

function AllDevices() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevices(user));
    dispatch(getRooms(user));
  }, [user]);

  const devices = useSelector((state) => state.device.devices);
  const rooms = useSelector((state) => state.room.rooms);

  return (
    <DeviceDetails
      heading="All Devices"
      devices={devices}
      rooms={rooms}
      currentUser={user}
    />
  );
}

export default AllDevices;
