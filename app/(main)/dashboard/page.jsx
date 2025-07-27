"use client";
import { useUser } from "@/app/provider";
import CreateOptions from "@/components/CreateOptions";
import LatestInterviewsList from "@/components/LatestInterviewsList";
import WelcomeContainer from "@/components/WelcomContainer";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
};

export default Dashboard;
