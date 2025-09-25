"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../lib/slices/bookingsSlice";
import { BarChart3, Users, DollarSign, Building } from "lucide-react";

const stats = [
  { name: "Total Bookings", value: "24", icon: BarChart3, change: "+12%" },
  { name: "Active Guests", value: "18", icon: Users, change: "+5%" },
  { name: "Revenue", value: "$12,340", icon: DollarSign, change: "+8%" },
  { name: "Available Rooms", value: "12/25", icon: Building, change: "-2%" },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="w-8 h-8 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <span className="text-green-600 text-sm ml-2">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Booking ID</th>
                <th className="table-header">Guest</th>
                <th className="table-header">Dates</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id}>
                  <td className="table-cell">#{booking.id}</td>
                  <td className="table-cell">User {booking.user_id}</td>
                  <td className="table-cell">
                    {booking.check_in_date} to {booking.check_out_date}
                  </td>
                  <td className="table-cell">${booking.total_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
