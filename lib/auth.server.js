"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getCurrentUserServer() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const session = await supabase.auth.getSession();
  console.log("aww", session);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("user is ", user);

  if (error) {
    console.log(error);

    console.log("Error getting user:", error.message);
    return null;
  }

  return user;
}

export async function isAuthenticatedServer() {
  const user = await getCurrentUserServer();
  return !!user;
}
