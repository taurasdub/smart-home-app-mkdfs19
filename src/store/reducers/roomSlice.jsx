import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
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
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.rooms = action.payload.rooms;
    }),
      builder.addCase(addFloorPlan.fulfilled, (state, action) => {
        state.rooms.push(action.payload.data);
      }),
      builder.addCase(deleteFloorPlan.fulfilled, (state) => {
        state.rooms = [];
      });
  },
});

export default roomSlice.reducer;
