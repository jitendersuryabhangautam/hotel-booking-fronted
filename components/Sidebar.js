// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Home,
//   Calendar,
//   CreditCard,
//   Building,
//   Users,
//   LogOut,
// } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../lib/slices/usersSlice";

// // Test each icon individually
// const icons = {
//   Home: Home,
//   Calendar: Calendar,
//   CreditCard: CreditCard,
//   Building: Building,
//   Users: Users,
//   LogOut: LogOut,
// };

// console.log(
//   "Available icons:",
//   Object.keys(icons).map((key) => ({
//     name: key,
//     component: icons[key],
//     isUndefined: icons[key] === undefined,
//   }))
// );

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", iconKey: "Home" },
//   { name: "Bookings", href: "/bookings", iconKey: "Calendar" },
//   { name: "Payments", href: "/payments", iconKey: "CreditCard" },
//   { name: "Rooms", href: "/rooms", iconKey: "Building" },
//   { name: "Users", href: "/users", iconKey: "Users" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(setCurrentUser(null));
//     router.push("/");
//   };

//   return (
//     <div className="w-64 bg-white shadow-lg flex flex-col">
//       <div className="p-6 flex-shrink-0">
//         <h1 className="text-2xl font-bold text-primary-600">Hotel Manager</h1>
//       </div>

//       <nav className="mt-6 flex-1">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href;
//           const IconComponent = icons[item.iconKey];

//           console.log(`Rendering ${item.name}:`, {
//             iconKey: item.iconKey,
//             component: IconComponent,
//             isUndefined: IconComponent === undefined,
//           });

//           if (!IconComponent) {
//             console.error(`Icon not found: ${item.iconKey}`);
//             return null;
//           }

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
//                 isActive
//                   ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
//                   : "text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               <IconComponent className="w-5 h-5 mr-3" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t">
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//         >
//           <LogOut className="w-5 h-5 mr-3" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// components/Sidebar.js (Updated - remove logout button)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, CreditCard, Building, Users } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Rooms", href: "/rooms", icon: Building },
  { name: "Users", href: "/users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col min-h-screen">
      {/* Remove the logout button from here since it's in navbar now */}
      <div className="p-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary-600">Hotel Manager</h1>
      </div>

      <nav className="mt-6 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
