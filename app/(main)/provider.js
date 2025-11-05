"use client";
import SideBar, { AppSidebar } from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "@/components/WelcomContainer";
import { isUserLoggedIn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoardProvider = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isUserLoggedIn();

      if (!loggedIn) {
        router.push("/signin"); // Use router.push instead of redirect
      } else {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

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
