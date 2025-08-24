"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

// Signup
export async function signup({ name, email, password }) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { success: false, message: error.message };
  return {
    success: true,
    message: "Account created. Please check your email.",
  };
}

// Sign in
export async function signIn({ email, password }) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { success: false, message: error.message };
  return { success: true, message: "Signed in successfully." };
}

// Get current user (in server actions only)
export async function getCurrentUser() {
  const supabase = await createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
