// // "use client";

// // import { Inter } from "next/font/google";
// // import { Provider } from "react-redux";
// // import { store } from "../lib/store";
// // import { usePathname } from "next/navigation";
// // import Sidebar from "../components/Sidebar";
// // import "./globals.css";

// // const inter = Inter({ subsets: ["latin"] });

// // function AuthenticatedLayout({ children }) {
// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       <Sidebar />
// //       <main className="flex-1 overflow-auto">{children}</main>
// //     </div>
// //   );
// // }

// // function PublicLayout({ children }) {
// //   return <div className="min-h-screen bg-gray-50">{children}</div>;
// // }

// // export default function RootLayout({ children }) {
// //   const pathname = usePathname();
// //   const isAuthPage = pathname !== "/" && !pathname.startsWith("/login");

// //   return (
// //     <html lang="en">
// //       <body className={inter.className}>
// //         <Provider store={store}>
// //           {isAuthPage ? (
// //             <AuthenticatedLayout>{children}</AuthenticatedLayout>
// //           ) : (
// //             <PublicLayout>{children}</PublicLayout>
// //           )}
// //         </Provider>
// //       </body>
// //     </html>
// //   );
// // }
// // Update app/layout.js - improve the authentication logic
// "use client";

// import { Inter } from "next/font/google";
// import { Provider } from "react-redux";
// import { store } from "../lib/store";
// import { usePathname } from "next/navigation";
// import Sidebar from "../components/Sidebar";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// function AuthenticatedLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <main className="flex-1 overflow-auto">{children}</main>
//     </div>
//   );
// }

// function PublicLayout({ children }) {
//   return <div className="min-h-screen bg-gray-50">{children}</div>;
// }

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const publicRoutes = ["/", "/login", "/register"];
//   const isPublicRoute = publicRoutes.includes(pathname);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Provider store={store}>
//           {isPublicRoute ? (
//             <PublicLayout>{children}</PublicLayout>
//           ) : (
//             <AuthenticatedLayout>{children}</AuthenticatedLayout>
//           )}
//         </Provider>
//       </body>
//     </html>
//   );
// }
// app/layout.js
"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function AuthenticatedLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar />*/}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function PublicLayout({ children }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {isPublicRoute ? (
            <PublicLayout>{children}</PublicLayout>
          ) : (
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          )}
        </Provider>
      </body>
    </html>
  );
}
