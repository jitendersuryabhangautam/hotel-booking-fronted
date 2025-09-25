import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const mockPayments = [
  {
    id: 1,
    booking_id: 1,
    amount: 450.0,
    payment_method: "credit_card",
    transaction_id: "txn_123456",
    status: "completed",
    card_last4: "4242",
    card_brand: "visa",
    receipt_url: "https://example.com/receipt/1",
    processed_at: "2024-01-10T10:30:00Z",
    created_at: "2024-01-10T10:30:00Z",
  },
  {
    id: 2,
    booking_id: 2,
    amount: 300.0,
    payment_method: "paypal",
    transaction_id: "txn_789012",
    status: "pending",
    card_last4: null,
    card_brand: null,
    receipt_url: null,
    processed_at: null,
    created_at: "2024-01-12T14:30:00Z",
  },
];

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPayments: (state, action) => {
      state.loading = false;
      state.payments = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    updatePayment: (state, action) => {
      const index = state.payments.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
  },
});

export const { setLoading, setPayments, setError, addPayment, updatePayment } =
  paymentsSlice.actions;

export const fetchPayments = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    setTimeout(() => {
      dispatch(setPayments(mockPayments));
    }, 1000);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default paymentsSlice.reducer;
