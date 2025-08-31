"use client";
import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  Crown,
  Home,
  Lightbulb,
  MapPin,
  Phone,
  Puzzle,
  Rows3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center lg:grid lg:grid-cols-2 fixed top-0 border-b z-10 border-gray-400 bg-gray-200 text-lg lg:text-xl justify-between w-full px-4 lg:px-6 py-2">
      {/* Logo */}
      <div className="flex items-center px-2">
        <Image
          src="/logo1.png"
          className="w-20 md:w-24 h-16 lg:w-32"
          alt="MockMate Logo"
          width={90}
          height={90}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6 font-medium">
        <Link
          href="/"
          className="border-b-2  hover:bg-gray-100 rounded-lg w-full"
        >
          <span className="flex items-center text-primary gap-2">
            <Home /> Home
          </span>
        </Link>
        <Link
          href="#"
          className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
        >
          <span className="flex items-center hover:text-primary gap-2">
            <Lightbulb /> Features
          </span>
        </Link>
        <Link
          href="#"
          className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
        >
          <span className="flex items-center hover:text-primary gap-2">
            <Puzzle /> Solutions
          </span>
        </Link>
        <Link
          href="#"
          className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
        >
          <span className="flex items-center hover:text-primary gap-2">
            <Crown /> Pricing
          </span>
        </Link>
        <Link
          href="#"
          className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
        >
          <span className="flex items-center hover:text-primary gap-1">
            <Phone /> Contact Us
          </span>
        </Link>
      </div>

      {/* Hamburger (Visible on md and below) */}
      <Rows3
        className="lg:hidden cursor-pointer"
        onClick={() => setIsVisible((prev) => !prev)}
      />

      {/* Mobile / Tablet Menu */}
      {isVisible && (
        <div className="lg:hidden absolute top-[65px] right-4 border rounded-xl shadow-md bg-white w-48 p-4">
          <div className="flex flex-col items-start gap-4 font-medium">
            <Link
              href="/"
              className="border-b-2  hover:bg-gray-100 rounded-lg w-full"
              onClick={() => setIsVisible(false)}
            >
              <span className="flex items-center text-primary gap-2">
                <Home /> Home
              </span>
            </Link>
            <Link
              href="#"
              className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
              onClick={() => setIsVisible(false)}
            >
              <span className="flex items-center hover:text-primary gap-2">
                <Lightbulb /> Features
              </span>
            </Link>
            <Link
              href="#"
              className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
              onClick={() => setIsVisible(false)}
            >
              <span className="flex items-center hover:text-primary gap-2">
                <Puzzle /> Solutions
              </span>
            </Link>
            <Link
              href="#"
              className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
              onClick={() => setIsVisible(false)}
            >
              <span className="flex items-center hover:text-primary gap-2">
                <Crown /> Pricing
              </span>
            </Link>
            <Link
              href="#"
              className="border-b-2 hover:bg-gray-100 rounded-lg w-full"
              onClick={() => setIsVisible(false)}
            >
              <span className="flex items-center hover:text-primary gap-2">
                <Phone /> Contact Us
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
