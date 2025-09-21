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
    console.log(roomId);

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }
    const authHeader = req.headers.get("authorization");
    let userId, role;

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

      userId = user.id;
      role = "interviewer";
    } else {
      // Candidate flow
      userId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      role = "candidate";
    }
    console.log(userId);

    // Generate token with time buffer to avoid iat issues
    const streamToken = streamClient.generateUserToken({
      user_id: userId,
      iat: Math.floor(Date.now() / 1000) - 60, // Account for clock drift
    });

    return NextResponse.json({
      token: streamToken,
      apiKey,
      userId,
      role,
      roomId, // Return the same roomId to confirm
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
