"use client";

import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = isUserLoggedIn();
    setIsAuthenticated(loggedIn);
    setLoading(false);

    if (loggedIn) {
      redirect("/dashboard");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return <div className="flex flex-col h-screen">{children}</div>;
}
