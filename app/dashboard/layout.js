// app/dashboard/layout.js
"use client";

import { Provider } from "react-redux";
import { store } from "../../lib/store";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </Provider>
  );
}
