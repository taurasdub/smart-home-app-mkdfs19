import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./reducers/roomSlice";
import deviceReducer from "./reducers/deviceSlice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
    device: deviceReducer,
  },
});
