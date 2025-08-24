import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession(); // refresh cookies
  return res;
}

// export async function isAuthenticatedServer() {
//   const user = await getCurrentUserServer();
//   return !!user;
// }
