import React from "react";
import DashBoardProvider from "./provider";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-secondary">
      <DashBoardProvider>
        <div className="p-4 lg:p-10">{children}</div>
      </DashBoardProvider>
    </div>
  );
};

export default DashboardLayout;
