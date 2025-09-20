import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/services/supabaseClient";

const apiKey = process.env.NEXT_STREAM_API_KEY;
const apiSecret = process.env.NEXT_STREAM_SECRET_KEY;

const streamClient = new StreamClient(apiKey, apiSecret);

// export async function POST(req) {
//   const { userId } = await req.json();

//   console.log(apiKey, apiSecret);
//   console.log(userId);

//   console.log(streamClient);

//   const token = streamClient.generateUserToken({ user_id: userId });

//   return NextResponse.json({ token, apiKey });
// }

export async function POST(req) {
  try {
    const { roomId } = await req.json();
    const authHeader = req.headers.get("authorization");

    // Interviewer flow
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        return NextResponse.json(
          { error: "Invalid authentication token" },
          { status: 401 }
        );
      }

      // Generate token with time buffer
      const streamToken = streamClient.generateUserToken({
        user_id: user.id,
        iat: Math.floor(Date.now() / 1000) - 60,
      });

      return NextResponse.json({
        token: streamToken,
        apiKey,
        userId: user.id,
        role: "interviewer",
        roomId,
      });
    }

    // Candidate flow
    const guestId = `guest-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const streamToken = streamClient.generateUserToken({
      user_id: guestId,
      iat: Math.floor(Date.now() / 1000) - 60,
    });

    return NextResponse.json({
      token: streamToken,
      apiKey,
      userId: guestId,
      role: "candidate",
      roomId,
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
