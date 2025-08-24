import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils/auth.ts
export function isUserLoggedIn() {
  if (typeof window === "undefined") {
    // Server-side (Next.js SSR) → can't check localStorage
    return false;
  }

  const allKeys = Object.keys(localStorage);
  const supabaseAuthKey = allKeys.find((key) => key.includes("auth-token"));

  if (!supabaseAuthKey) return false;

  const sessionStr = localStorage.getItem(supabaseAuthKey);
  if (!sessionStr) return false;

  try {
    const session = JSON.parse(sessionStr);
    console.log("session is ", session);

    // Depending on version of supabase-js:
    return !!session?.currentSession?.user || !!session?.user;
  } catch (err) {
    console.error("Error parsing session:", err);
    return false;
  }
}
