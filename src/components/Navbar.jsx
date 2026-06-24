"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, ChevronDown, Bars, Xmark } from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    await signOut();
  };

  const isLoggedIn = session?.user;
  const user = {
    name: session?.user.name,
    email: session?.user.email,
    avatar:
      "https://i.ibb.co.com/DDQQ4C13/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  };

  return (
    <nav className="bg-[#EAE3DA] border-b border-[#DCD3C7] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo (Uses Car Icon from Gravity UI) */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-extrabold text-[#4A6761] tracking-tight"
            >
              <Plane className="w-6 h-6" />
              <span>TicketBari</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#2C2520] hover:text-[#4A6761] font-semibold transition"
            >
              Home
            </Link>
            <Link
              href="/tickets"
              className="text-[#2C2520] hover:text-[#4A6761] font-semibold transition"
            >
              All Tickets
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="text-[#2C2520] hover:text-[#4A6761] font-semibold transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side: Profile Dropdown / CTAs */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-full text-sm focus:outline-none hover:bg-[#DCD3C7]/60 transition group"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#4A6761]"
                    src={user.avatar}
                    alt="User Avatar"
                  />
                  <span className="text-[#2C2520] font-bold group-hover:text-[#4A6761] transition">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#2C2520]/60 transition-transform duration-200 group-hover:text-[#4A6761]" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-md py-1 bg-[#EAE3DA] border border-[#DCD3C7] z-50">
                    <div className="px-4 py-2 border-b border-[#DCD3C7]">
                      <p className="text-xs text-[#2C2520]/60">Signed in as</p>
                      <p className="text-sm font-bold text-[#2C2520] truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[#2C2520] hover:bg-[#F4EFEA] hover:text-[#4A6761] transition font-medium"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50/50 transition font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-[#2C2520] hover:text-[#4A6761] font-semibold transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#4A6761] text-[#F4EFEA] px-4 py-2 rounded-md font-bold shadow-sm hover:opacity-90 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2C2520] hover:text-[#4A6761] hover:bg-[#DCD3C7]/60 focus:outline-none transition"
            >
              {isOpen ? (
                <Xmark className="h-6 w-6" />
              ) : (
                <Bars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-[#EAE3DA] border-t border-[#DCD3C7] px-4 pt-2 pb-6 space-y-1 transition-all">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-bold text-[#2C2520] hover:bg-[#F4EFEA] hover:text-[#4A6761] transition"
          >
            Home
          </Link>
          <Link
            href="/tickets"
            className="block px-3 py-2 rounded-md text-base font-bold text-[#2C2520] hover:bg-[#F4EFEA] hover:text-[#4A6761] transition"
          >
            All Tickets
          </Link>
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-bold text-[#2C2520] hover:bg-[#F4EFEA] hover:text-[#4A6761] transition"
            >
              Dashboard
            </Link>
          )}

          <div className="pt-4 mt-4 border-t border-[#DCD3C7]">
            {isLoggedIn ? (
              <div className="space-y-1">
                <div className="flex items-center px-3 space-x-3 mb-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[#4A6761]"
                    src={user.avatar}
                    alt="User Avatar"
                  />
                  <div>
                    <div className="text-base font-extrabold text-[#2C2520]">
                      {user.name}
                    </div>
                    <div className="text-xs text-[#2C2520]/60">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#2C2520]/80 hover:bg-[#F4EFEA] hover:text-[#4A6761] transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-red-700 hover:bg-red-50/50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 px-2 pt-2">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 rounded-md text-base font-bold text-[#2C2520] bg-[#F4EFEA] hover:bg-[#EAE3DA] transition border border-[#DCD3C7]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 rounded-md text-base font-bold text-[#F4EFEA] bg-[#4A6761] hover:opacity-90 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
