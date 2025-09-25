// lib/slices/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: { jitender: "jitender" },
};

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // Added password for login
    phone: "+1234567890",
    role: "customer",
    is_active: true,
    last_login: "2024-01-10T08:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // Added password for login
    phone: "+0987654321",
    role: "admin",
    is_active: true,
    last_login: "2024-01-10T09:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "password123", // Added password for login
    phone: "+1122334455",
    role: "staff",
    is_active: false,
    last_login: "2024-01-05T10:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setUsers: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Thunk actions
export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(setUsers(mockUsers));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );
      if (user) {
        dispatch(setCurrentUser(user));
        dispatch(setError(null));
      } else {
        dispatch(setError("Invalid email or password"));
      }
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      const newUser = {
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        ...userData,
        role: "customer",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      dispatch(addUser(newUser));
      dispatch(setCurrentUser(newUser));
      dispatch(setError(null));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const {
  setLoading,
  setUsers,
  setError,
  setCurrentUser,
  addUser,
  updateUser,
  deleteUser,
  logout,
} = usersSlice.actions;

export default usersSlice.reducer;
