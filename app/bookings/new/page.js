// // "use client";

// // import { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useRouter } from "next/navigation";
// // import { createBooking } from "../../../lib/slices/bookingsSlice";
// // import { fetchRooms } from "../../../lib/slices/roomsSlice";

// // export default function NewBookingPage() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   // Safe selectors with default values
// //   const roomsState = useSelector((state) => state.rooms) || {};
// //   const bookingsState = useSelector((state) => state.bookings) || {};
// //   const usersState = useSelector((state) => state.users) || {};

// //   const { rooms, loading: roomsLoading } = roomsState;
// //   const { loading } = bookingsState;
// //   const { currentUser } = usersState;

// //   const [calculatedAmount, setCalculatedAmount] = useState(0);
// //   const [nights, setNights] = useState(0);
// //   const [formData, setFormData] = useState({
// //     guestName: "",
// //     guestEmail: "",
// //     roomId: "",
// //     checkIn: "",
// //     checkOut: "",
// //     amount: 0,
// //     status: "confirmed",
// //   });

// //   // Redirect if not authenticated
// //   useEffect(() => {
// //     if (!currentUser) {
// //       router.push("/");
// //     }
// //   }, [currentUser, router]);

// //   // Calculate nights and amount when dates change
// //   useEffect(() => {
// //     if (formData.checkIn && formData.checkOut) {
// //       const checkInDate = new Date(formData.checkIn);
// //       const checkOutDate = new Date(formData.checkOut);
// //       const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
// //       const calculatedNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

// //       if (calculatedNights > 0) {
// //         setNights(calculatedNights);
// //         const selectedRoom = (rooms || []).find(
// //           (room) => room.id === formData.roomId
// //         );
// //         if (selectedRoom) {
// //           const amount = calculatedNights * selectedRoom.price;
// //           setCalculatedAmount(amount);
// //           setFormData((prev) => ({ ...prev, amount }));
// //         }
// //       }
// //     }
// //   }, [formData.checkIn, formData.checkOut, formData.roomId, rooms]);

// //   // Fetch rooms on component mount
// //   useEffect(() => {
// //     dispatch(fetchRooms());
// //   }, [dispatch]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!currentUser) {
// //       alert("Please log in to create a booking");
// //       return;
// //     }

// //     const bookingData = {
// //       ...formData,
// //       id: Date.now().toString(),
// //       createdAt: new Date().toISOString(),
// //       createdBy: currentUser.id,
// //     };

// //     dispatch(createBooking(bookingData))
// //       .unwrap()
// //       .then(() => {
// //         router.push("/bookings");
// //       })
// //       .catch((error) => {
// //         console.error("Failed to create booking:", error);
// //       });
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   if (!currentUser) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <h1 className="text-2xl font-bold text-gray-900">Redirecting...</h1>
// //         </div>
// //       </div>
// //     );
// //   }
// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="bg-white shadow rounded-lg">
// //           <div className="px-6 py-4 border-b border-gray-200">
// //             <h1 className="text-2xl font-bold text-gray-900">
// //               Create New Booking
// //             </h1>
// //           </div>

// //           <form onSubmit={handleSubmit} className="p-6 space-y-6">
// //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// //               <div>
// //                 <label
// //                   htmlFor="guestName"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Guest Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="guestName"
// //                   id="guestName"
// //                   required
// //                   value={formData.guestName}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="guestEmail"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Guest Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="guestEmail"
// //                   id="guestEmail"
// //                   required
// //                   value={formData.guestEmail}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="roomId"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Room
// //                 </label>
// //                 <select
// //                   name="roomId"
// //                   id="roomId"
// //                   required
// //                   value={formData.roomId}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 >
// //                   <option value="">Select a room</option>
// //                   {rooms.map((room) => (
// //                     <option key={room.id} value={room.id}>
// //                       {room.number} - {room.type} (${room.price}/night)
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="status"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Status
// //                 </label>
// //                 <select
// //                   name="status"
// //                   id="status"
// //                   value={formData.status}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 >
// //                   <option value="confirmed">Confirmed</option>
// //                   <option value="pending">Pending</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="checkIn"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Check-in Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   name="checkIn"
// //                   id="checkIn"
// //                   required
// //                   value={formData.checkIn}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="checkOut"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Check-out Date
// //                 </label>
// //                 <input
// //                   type="date"
// //                   name="checkOut"
// //                   id="checkOut"
// //                   required
// //                   value={formData.checkOut}
// //                   onChange={handleChange}
// //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
// //                 />
// //               </div>
// //             </div>

// //             {nights > 0 && (
// //               <div className="bg-gray-50 p-4 rounded-md">
// //                 <p className="text-sm text-gray-600">
// //                   Duration: {nights} night{nights !== 1 ? "s" : ""}
// //                 </p>
// //                 <p className="text-lg font-semibold text-gray-900">
// //                   Total Amount: ${calculatedAmount}
// //                 </p>
// //               </div>
// //             )}

// //             <div className="flex justify-end space-x-3">
// //               <button
// //                 type="button"
// //                 onClick={() => router.push("/bookings")}
// //                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
// //               >
// //                 {loading ? "Creating..." : "Create Booking"}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // app/bookings/new/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";

// export default function NewBookingPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Safe selectors with proper default values
//   const roomsState = useSelector((state) => state.rooms || {});
//   const bookingsState = useSelector((state) => state.bookings || {});
//   const usersState = useSelector((state) => state.users || {});

//   const { rooms = [], loading: roomsLoading = false } = roomsState;
//   const { loading: bookingsLoading = false } = bookingsState;
//   const { currentUser = null } = usersState;

//   const [calculatedAmount, setCalculatedAmount] = useState(0);
//   const [nights, setNights] = useState(0);
//   const [formData, setFormData] = useState({
//     guestName: "",
//     guestEmail: "",
//     roomId: "",
//     checkIn: "",
//     checkOut: "",
//     amount: 0,
//     status: "confirmed",
//   });

//   // Dynamically import the actions to avoid circular dependencies
//   useEffect(() => {
//     const loadActions = async () => {
//       const { createBooking } = await import(
//         "../../../lib/slices/bookingsSlice"
//       );
//       const { fetchRooms } = await import("../../../lib/slices/roomsSlice");

//       // Store the actions in component state or ref
//       window.createBookingAction = createBooking;
//       window.fetchRoomsAction = fetchRooms;

//       // Fetch rooms on component mount
//       dispatch(fetchRooms());
//     };

//     loadActions();
//   }, [dispatch]);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (currentUser === null) {
//       router.push("/");
//     }
//   }, [currentUser, router]);

//   // Calculate nights and amount when dates change
//   useEffect(() => {
//     if (formData.checkIn && formData.checkOut) {
//       const checkInDate = new Date(formData.checkIn);
//       const checkOutDate = new Date(formData.checkOut);

//       // Ensure check-out is after check-in
//       if (checkOutDate <= checkInDate) {
//         setNights(0);
//         setCalculatedAmount(0);
//         return;
//       }

//       const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
//       const calculatedNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

//       if (calculatedNights > 0) {
//         setNights(calculatedNights);
//         const selectedRoom = rooms.find((room) => room.id === formData.roomId);
//         if (selectedRoom) {
//           const amount = calculatedNights * selectedRoom.price;
//           setCalculatedAmount(amount);
//           setFormData((prev) => ({ ...prev, amount }));
//         }
//       }
//     }
//   }, [formData.checkIn, formData.checkOut, formData.roomId, rooms]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!currentUser) {
//       alert("Please log in to create a booking");
//       return;
//     }

//     if (!formData.roomId) {
//       alert("Please select a room");
//       return;
//     }

//     if (nights <= 0) {
//       alert("Please select valid check-in and check-out dates");
//       return;
//     }

//     try {
//       const { createBooking } = await import(
//         "../../../lib/slices/bookingsSlice"
//       );

//       const bookingData = {
//         ...formData,
//         id: Date.now().toString(),
//         createdAt: new Date().toISOString(),
//         createdBy: currentUser.id,
//       };

//       dispatch(createBooking(bookingData))
//         .unwrap()
//         .then(() => {
//           router.push("/bookings");
//         })
//         .catch((error) => {
//           console.error("Failed to create booking:", error);
//           alert("Failed to create booking. Please try again.");
//         });
//     } catch (error) {
//       console.error("Error importing createBooking:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Show loading state while checking authentication
//   if (currentUser === undefined) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
//         </div>
//       </div>
//     );
//   }

//   // Redirect if not authenticated (this will happen via useEffect)
//   if (!currentUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900">Redirecting...</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow rounded-lg">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Create New Booking
//             </h1>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="guestName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Guest Name
//                 </label>
//                 <input
//                   type="text"
//                   name="guestName"
//                   id="guestName"
//                   required
//                   value={formData.guestName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="guestEmail"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Guest Email
//                 </label>
//                 <input
//                   type="email"
//                   name="guestEmail"
//                   id="guestEmail"
//                   required
//                   value={formData.guestEmail}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="roomId"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Room
//                 </label>
//                 <select
//                   name="roomId"
//                   id="roomId"
//                   required
//                   value={formData.roomId}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 >
//                   <option value="">Select a room</option>
//                   {rooms.map((room) => (
//                     <option key={room.id} value={room.id}>
//                       {room.number} - {room.type} (${room.price}/night)
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label
//                   htmlFor="status"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   id="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 >
//                   <option value="confirmed">Confirmed</option>
//                   <option value="pending">Pending</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               <div>
//                 <label
//                   htmlFor="checkIn"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Check-in Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkIn"
//                   id="checkIn"
//                   required
//                   value={formData.checkIn}
//                   onChange={handleChange}
//                   min={new Date().toISOString().split("T")[0]}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="checkOut"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Check-out Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkOut"
//                   id="checkOut"
//                   required
//                   value={formData.checkOut}
//                   onChange={handleChange}
//                   min={
//                     formData.checkIn || new Date().toISOString().split("T")[0]
//                   }
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 />
//               </div>
//             </div>

//             {nights > 0 && (
//               <div className="bg-gray-50 p-4 rounded-md">
//                 <p className="text-sm text-gray-600">
//                   Duration: {nights} night{nights !== 1 ? "s" : ""}
//                 </p>
//                 <p className="text-lg font-semibold text-gray-900">
//                   Total Amount: ${calculatedAmount}
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => router.push("/bookings")}
//                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={bookingsLoading}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
//               >
//                 {bookingsLoading ? "Creating..." : "Create Booking"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/bookings/new/page.js
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createBooking } from "../../../lib/slices/bookingsSlice";
import { fetchRooms } from "../../../lib/slices/roomsSlice";

export default function NewBookingPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Safe selectors with proper default values
  const rooms = useSelector((state) => state.rooms?.rooms || []);
  console.log("these are the rooms", rooms);
  const loading = useSelector((state) => state.bookings?.loading || false);
  const currentUser = useSelector((state) => state.users?.currentUser);

  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [nights, setNights] = useState(0);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    amount: 0,
    status: "confirmed",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  // Fetch rooms on component mount
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Calculate nights and amount when dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);

      // Ensure check-out is after check-in
      if (checkOutDate <= checkInDate) {
        setNights(0);
        setCalculatedAmount(0);
        return;
      }

      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const calculatedNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (calculatedNights > 0) {
        setNights(calculatedNights);
        const selectedRoom = rooms.find((room) => room.id == formData.roomId);
        if (selectedRoom) {
          const amount = calculatedNights * selectedRoom.price_per_night;
          setCalculatedAmount(amount);
          setFormData((prev) => ({ ...prev, amount }));
        }
      }
    }
  }, [formData.checkIn, formData.checkOut, formData.roomId, rooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in to create a booking");
      return;
    }

    if (!formData.roomId) {
      alert("Please select a room");
      return;
    }

    if (nights <= 0) {
      alert("Please select valid check-in and check-out dates");
      return;
    }

    const bookingData = {
      ...formData,
      createdBy: currentUser.id,
    };

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();
      console.log("Booking created successfully:", result);
      router.push("/bookings");
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Redirecting...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Booking
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="guestName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Guest Name
                </label>
                <input
                  type="text"
                  name="guestName"
                  id="guestName"
                  required
                  value={formData.guestName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="guestEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Guest Email
                </label>
                <input
                  type="email"
                  name="guestEmail"
                  id="guestEmail"
                  required
                  value={formData.guestEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room
                </label>
                <select
                  name="roomId"
                  id="roomId"
                  required
                  value={formData.roomId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.room_number} - {room.room_type} ($
                      {room.price_per_night}
                      /night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="checkIn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  id="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="checkOut"
                  className="block text-sm font-medium text-gray-700"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  id="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={
                    formData.checkIn || new Date().toISOString().split("T")[0]
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            {nights > 0 && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Duration: {nights} night{nights !== 1 ? "s" : ""}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Total Amount: ${calculatedAmount}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/bookings")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
