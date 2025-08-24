"use client";
import SideBar, { AppSidebar } from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "@/components/WelcomContainer";
import { isUserLoggedIn } from "@/lib/utils";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const DashBoardProvider = ({ children }) => {
  useEffect(() => {
    const loggedIn = isUserLoggedIn();

    if (!loggedIn) {
      redirect("/signin");
    }
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <WelcomeContainer />

        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashBoardProvider;
