import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { UserAuth } from "../../../../context/AuthContext";

import DeviceDetails from "../DeviceDetails/DeviceDetails";

function Sensors() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const sensorDevices = devices.filter((device) => device.type === "sensor");

  return (
    <DeviceDetails
      heading="Sensors"
      devices={sensorDevices}
      rooms={rooms}
      currentUser={user}
    />
  );
}

export default Sensors;
