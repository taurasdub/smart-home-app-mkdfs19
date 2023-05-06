import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const getRooms = createAsyncThunk("room/getRoom", async (user) => {
  try {
    const roomsCollectionRef = collection(db, "users", user.uid, "rooms");
    const roomsData = await getDocs(roomsCollectionRef);
    const rooms = roomsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { rooms };
  } catch (error) {
    throw error;
  }
});

export const addFloorPlan = createAsyncThunk(
  "room/addFloorPlan",
  async ({ user, data }) => {
    try {
      const roomsCollectionRef = collection(db, "users", user.uid, "rooms");
      await addDoc(roomsCollectionRef, {
        name: data.name,
      });
      return { data };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteFloorPlan = createAsyncThunk(
  "room/deleteFloorPlan",
  async (user) => {
    try {
      const roomsCollectionRef = collection(db, "users", user.uid, "rooms");
      const snapshot = await getDocs(roomsCollectionRef);

      for (const doc of snapshot.docs) {
        const roomName = doc.data().name;
        const devicesCollectionRef = collection(
          db,
          "users",
          user.uid,
          "devices"
        );
        const q = query(devicesCollectionRef, where("room", "==", roomName));
        const devicesQuerySnapshot = await getDocs(q);

        for (const deviceDoc of devicesQuerySnapshot.docs) {
          await updateDoc(deviceDoc.ref, { room: "none" });
        }
        await deleteDoc(doc.ref);
      }
      return;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  rooms: [],
  deletedFloorPlanSuccessAlert: false,
  addedFloorPlanSuccessAlert: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomHideAlert(state) {
      state.deletedFloorPlanSuccessAlert = false;
      state.addedFloorPlanSuccessAlert = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.rooms = action.payload.rooms;
    }),
      builder.addCase(addFloorPlan.fulfilled, (state, action) => {
        state.rooms.push(action.payload.data);
        state.addedFloorPlanSuccessAlert = true;
      }),
      builder.addCase(deleteFloorPlan.fulfilled, (state) => {
        state.rooms = [];
        state.deletedFloorPlanSuccessAlert = true;
      });
  },
});

export const { roomHideAlert } = roomSlice.actions;
export default roomSlice.reducer;
