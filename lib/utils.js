import { supabase } from "@/services/supabaseClient";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils/auth.ts
export async function isUserLoggedIn() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Session check error:", error);
      return false;
    }

    if (!session) {
      return false;
    }

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at < now) {
      console.log("Token expired");
      await supabase.auth.signOut();
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error checking auth:", err);
    return false;
  }
}
