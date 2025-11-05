"use client";

import { useEffect, useState } from "react";
import { isUserLoggedIn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isUserLoggedIn();
      setIsAuthenticated(loggedIn);
      setLoading(false);

      if (loggedIn) {
        router.push("/dashboard"); // Use router.push instead of redirect
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only show children if user is NOT authenticated
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return <div className="flex flex-col h-screen">{children}</div>;
}
