"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center border border-gray-200 bg-white rounded-2xl p-5 mx-7">
      <div className="none">
        <h2 className="text-lg font-bold">Welcom Back, {user?.name} </h2>
        <h2 className="text-gray-500">AI-Driven Interview , Hassel - hard</h2>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="userImage"
          width={40}
          height={20}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default WelcomeContainer;
