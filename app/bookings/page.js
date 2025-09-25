"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, deleteBooking } from "../../lib/slices/bookingsSlice";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";

export default function Bookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <Link href="/bookings/new" className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </Link>
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">User</th>
                <th className="table-header">Room</th>
                <th className="table-header">Check-in</th>
                <th className="table-header">Check-out</th>
                <th className="table-header">Guests</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="table-cell">#{booking.id}</td>
                  <td className="table-cell">User {booking.user_id}</td>
                  <td className="table-cell">Room {booking.room_id}</td>
                  <td className="table-cell">{booking.check_in_date}</td>
                  <td className="table-cell">{booking.check_out_date}</td>
                  <td className="table-cell">
                    {booking.adults}A, {booking.children}C
                  </td>
                  <td className="table-cell">${booking.total_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(booking.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
