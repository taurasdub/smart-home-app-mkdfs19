import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const addDevice = createAsyncThunk(
  "device/addDevice",
  async ({ user, deviceType, data }) => {
    const devicesCollectionRef = collection(db, "users", user.uid, "devices");
    await addDoc(devicesCollectionRef, {
      mqttTopic: data.mqttTopic,
      room: data.room,
      deviceName: data.deviceName,
      type: deviceType,
      ...(deviceType === "sensor" && {
        unit: data.unit,
        maxValue: data.maxValue,
      }),
    });

    return { data };
  }
);

export const getDevices = createAsyncThunk("device/getDevice", async (user) => {
  const devicesCollectionRef = collection(db, "users", user.uid, "devices");
  const devicesData = await getDocs(devicesCollectionRef);
  const devices = devicesData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return { devices };
});

export const updateDevice = createAsyncThunk(
  "device/updateDevice",
  async ({ currentUser, deviceId, data, isSensor }) => {
    try {
      const devicesDocRef = doc(
        db,
        "users",
        currentUser.uid,
        "devices",
        deviceId
      );
      await updateDoc(devicesDocRef, {
        deviceName: data.deviceName,
        room: data.room,
        ...(isSensor && { unit: data.unit, maxValue: data.maxValue }),
      });
    } catch (error) {
      throw error;
    }

    return { deviceId, data };
  }
);

export const deleteDevice = createAsyncThunk(
  "device/deleteDevice",
  async ({ currentUser, deviceId }) => {
    try {
      const devicesDocRef = doc(
        db,
        "users",
        currentUser.uid,
        "devices",
        deviceId
      );
      await deleteDoc(devicesDocRef);
    } catch (error) {
      throw error;
    }
    return { deviceId };
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
      }),
      builder.addCase(updateDevice.fulfilled, (state, action) => {
        const { deviceId, data } = action.payload;

        const deviceIndex = state.devices.findIndex(
          (device) => device.id === deviceId
        );

        if (deviceIndex !== -1) {
          state.devices[deviceIndex] = {
            ...state.devices[deviceIndex],
            ...data,
          };
        }
      }),
      builder.addCase(deleteDevice.fulfilled, (state, action) => {
        const { deviceId } = action.payload;
        state.devices = state.devices.filter(
          (device) => device.id !== deviceId
        );
      });
  },
});

export default deviceSlice.reducer;
