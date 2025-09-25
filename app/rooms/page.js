"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../lib/slices/roomsSlice";
import {
  Building,
  Users,
  DollarSign,
  MapPin,
  Wifi,
  Tv,
  Snowflake,
} from "lucide-react";

export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "tv":
        return <Tv className="w-4 h-4" />;
      case "ac":
        return <Snowflake className="w-4 h-4" />;
      default:
        return <span>•</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
        <button className="btn-primary flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Room {room.room_number}
                </h3>
                <p className="text-sm text-gray-600 capitalize">
                  {room.room_type}
                </p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  room.is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {room.is_available ? "Available" : "Occupied"}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{room.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />${room.price_per_night}
                /night
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {room.capacity} guests
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                Floor {room.floor}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
