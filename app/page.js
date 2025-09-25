"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../lib/slices/usersSlice";
import { useRouter } from "next/navigation";
import {
  Hotel,
  Star,
  Users,
  Shield,
  Wifi,
  Utensils,
  Car,
  Heart,
} from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleDemoLogin = () => {
    dispatch(loginUser({ email: "demo@hotel.com", password: "demo" }));
    router.push("/dashboard");
  };

  const features = [
    {
      icon: Hotel,
      title: "Luxurious Rooms",
      description: "Elegant accommodations with premium amenities",
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Exceptional hospitality and personalized care",
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary internet access throughout",
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      description: "Exquisite culinary experiences",
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "Convenient and secure parking services",
    },
    {
      icon: Heart,
      title: "Wellness Center",
      description: "Spa and fitness facilities",
    },
  ];
  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Hotel className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Grand Hotel
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToLogin}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Login
              </button>
              <button
                onClick={navigateToRegister}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary-600">Grand Hotel</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience luxury and comfort like never before. Our 5-star hotel
              offers world-class amenities, exceptional service, and
              unforgettable memories.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDemoLogin}
                className="btn-primary text-lg px-8 py-3"
              >
                View Demo Dashboard
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                Book a Stay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Grand Hotel?
            </h2>
            <p className="text-lg text-gray-600">
              Discover the perfect blend of luxury, comfort, and exceptional
              service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-primary-200">Luxury Rooms</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-200">Guest Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-primary-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hotel Management System
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience our powerful hotel management dashboard. Manage
              bookings, payments, rooms, and guests with our intuitive
              interface.
            </p>
            <button
              onClick={handleDemoLogin}
              className="btn-primary text-lg px-8 py-3"
            >
              Try Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Hotel className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">Grand Hotel</span>
              </div>
              <p className="text-gray-400">
                Luxury redefined. Comfort guaranteed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">123 Luxury Avenue</p>
              <p className="text-gray-400">Hotel District, City 10001</p>
              <p className="text-gray-400">info@grandhotel.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dining
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Spa
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>• FB
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>• TW
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>• IG
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Grand Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
