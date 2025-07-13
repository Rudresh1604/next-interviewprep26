import SideBar, { AppSidebar } from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "@/components/WelcomContainer";
import React from "react";

const DashBoardProvider = ({ children }) => {
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
