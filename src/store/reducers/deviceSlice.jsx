import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const getDevices = createAsyncThunk("device/getDevice", async (user) => {
  const devicesCollectionRef = collection(db, "users", user.uid, "devices");
  const devicesData = await getDocs(devicesCollectionRef);
  const devices = devicesData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return { devices };
});

export const addDevice = createAsyncThunk(
  "device/addDevice",
  async ({ user, data }) => {
    const devicesCollectionRef = collection(db, "users", user.uid, "devices");
    await addDoc(devicesCollectionRef, {
      initValue: data.initValue,
      mqttTopic: data.mqttTopic,
      room: data.room,
      deviceName: data.deviceName,
      type: data.type,
      onText: data.onText,
      offText: data.offText,
      maxValue: data.maxValue,
      unit: data.unit,
    });

    console.log(data);

    return { data };
  }
);

const initialState = {
  devices: [],
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.devices = action.payload.devices;
    }),
      builder.addCase(addDevice.fulfilled, (state, action) => {
        state.devices.push(action.payload.data);
      });
  },
});

export default deviceSlice.reducer;
