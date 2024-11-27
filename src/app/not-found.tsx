"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaUtensils, FaPhone } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6">
      <div className="text-center flex flex-col justify-center items-center max-w-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Oops! Hungry for something else?
        </h2>
        <p className="mb-6 text-base sm:text-lg text-gray-600">
          It looks like the page you’re looking for is off the menu!
        </p>

        <div className="mb-8">
          <Image
            src="/404.jpg"
            alt="Empty plate illustration"
            width={400}
            height={300}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>

        <p className="mb-6 text-gray-600 text-sm sm:text-base">
          The page you tried to access isn’t here. But don’t worry, there’s still a lot on our menu!
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={"/"}>
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto">
              <FaHome className="mr-2" />
              Return to Home
            </button>
          </Link>

          <Link href={"/menu"}>
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto">
              <FaUtensils className="mr-2" />
              View Our Menu
            </button>
          </Link>

          <Link href={"/contact"}>
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto">
              <FaPhone className="mr-2" />
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-gray-500 text-xs sm:text-sm text-center">
        Need help finding something?{" "}
        <Link href="/contact" className="text-blue-500 underline">
          Contact our team.
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
