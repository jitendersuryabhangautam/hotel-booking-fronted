import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "./slices/bookingsSlice";
import paymentsSlice from "./slices/paymentsSlice";
import roomsSlice from "./slices/roomsSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice,
    payments: paymentsSlice,
    rooms: roomsSlice,
    users: usersSlice,
  },
});
