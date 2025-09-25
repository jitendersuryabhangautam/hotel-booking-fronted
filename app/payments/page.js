"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "../../lib/slices/paymentsSlice";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Payments() {
  const dispatch = useDispatch();
  const { payments, loading } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Booking ID</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Method</th>
                <th className="table-header">Transaction ID</th>
                <th className="table-header">Status</th>
                <th className="table-header">Processed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="table-cell">#{payment.id}</td>
                  <td className="table-cell">#{payment.booking_id}</td>
                  <td className="table-cell">${payment.amount}</td>
                  <td className="table-cell capitalize">
                    {payment.payment_method}
                  </td>
                  <td className="table-cell">
                    {payment.transaction_id || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payment.status)}
                      <span
                        className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    {payment.processed_at
                      ? new Date(payment.processed_at).toLocaleDateString()
                      : "Not processed"}
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
