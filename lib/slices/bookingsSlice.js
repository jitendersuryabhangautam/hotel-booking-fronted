// lib/slices/bookingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const mockBookings = [
  {
    id: 1,
    user_id: 1,
    room_id: 1,
    check_in_date: "2024-01-15",
    check_out_date: "2024-01-18",
    adults: 2,
    children: 1,
    total_amount: 450.0,
    status: "confirmed",
    payment_status: "paid",
    special_requests: "Early check-in requested",
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 2,
    user_id: 2,
    room_id: 3,
    check_in_date: "2024-01-20",
    check_out_date: "2024-01-22",
    adults: 1,
    children: 0,
    total_amount: 300.0,
    status: "pending",
    payment_status: "pending",
    special_requests: null,
    created_at: "2024-01-12T14:30:00Z",
    updated_at: "2024-01-12T14:30:00Z",
  },
];

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setBookings: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
  },
});

// Thunk actions
export const fetchBookings = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(setBookings(mockBookings));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createBooking = (bookingData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: Math.max(...mockBookings.map((b) => b.id)) + 1,
          user_id: bookingData.createdBy || 1,
          room_id: parseInt(bookingData.roomId),
          check_in_date: bookingData.checkIn,
          check_out_date: bookingData.checkOut,
          adults: 2, // Default values
          children: 0,
          total_amount: bookingData.amount,
          status: bookingData.status || "confirmed",
          payment_status: "pending",
          special_requests: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          guestName: bookingData.guestName,
          guestEmail: bookingData.guestEmail,
        };

        dispatch(addBooking(newBooking));
        dispatch(setError(null));
        resolve(newBooking);
      }, 1000);
    });
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const updateBooking = (bookingData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(bookingsSlice.actions.updateBooking(bookingData));
      dispatch(setError(null));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(bookingsSlice.actions.deleteBooking(bookingId));
      dispatch(setError(null));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const {
  setLoading,
  setBookings,
  setError,
  addBooking,
  updateBooking: updateBookingAction,
  deleteBooking: deleteBookingAction,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
