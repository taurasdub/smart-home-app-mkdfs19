import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../../../store/reducers/roomSlice";
import { getDevices } from "../../../../store/reducers/deviceSlice";
import { UserAuth } from "../../../../context/AuthContext";
import DeviceDetails from "../DeviceDetails/DeviceDetails";

function Switches() {
  const { user } = UserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms(user));
    dispatch(getDevices(user));
  }, [user]);

  const rooms = useSelector((state) => state.room.rooms);
  const devices = useSelector((state) => state.device.devices);

  const switchDevices = devices.filter((device) => device.type === "switch");

  return (
    <DeviceDetails
      heading="Switches"
      devices={switchDevices}
      rooms={rooms}
      currentUser={user}
    />
  );
}

export default Switches;
