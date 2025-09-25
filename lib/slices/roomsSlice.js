import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

const mockRooms = [
  {
    id: 1,
    room_number: "101",
    room_type: "Deluxe",
    description: "Spacious deluxe room with king bed",
    price_per_night: 150.0,
    capacity: 2,
    floor: 1,
    amenities: ["WiFi", "TV", "AC", "Mini Bar"],
    is_available: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    room_number: "102",
    room_type: "Standard",
    description: "Comfortable standard room with queen bed",
    price_per_night: 100.0,
    capacity: 2,
    floor: 1,
    amenities: ["WiFi", "TV", "AC"],
    is_available: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    room_number: "201",
    room_type: "Suite",
    description: "Luxurious suite with living area",
    price_per_night: 250.0,
    capacity: 4,
    floor: 2,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Jacuzzi"],
    is_available: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setRooms: (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateRoom: (state, action) => {
      const index = state.rooms.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    deleteRoom: (state, action) => {
      state.rooms = state.rooms.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setRooms,
  setError,
  addRoom,
  updateRoom,
  deleteRoom,
} = roomsSlice.actions;

export const fetchRooms = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(setRooms(mockRooms));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default roomsSlice.reducer;
