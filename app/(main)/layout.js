import React from "react";
import DashBoardProvider from "./provider";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashBoardProvider>{children}</DashBoardProvider>
    </div>
  );
};

export default DashboardLayout;
