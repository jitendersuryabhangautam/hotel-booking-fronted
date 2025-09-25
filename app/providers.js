// app/providers.js
"use client";

import { store } from "../lib/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {/* Navbar will conditionally render based on route */}
      {children}
    </Provider>
  );
}
