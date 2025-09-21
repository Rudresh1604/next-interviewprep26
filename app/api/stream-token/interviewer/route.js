import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";
import { supabase } from "@/services/supabaseClient";

const apiKey = process.env.NEXT_STREAM_API_KEY;
const apiSecret = process.env.NEXT_STREAM_SECRET_KEY;

const streamClient = new StreamClient(apiKey, apiSecret);

export async function POST(req) {
  try {
    const { roomId } = await req.json();
    console.log("interviewer called !");

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Invalid !");

      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.log(authHeader);

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // Generate token for interviewer
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
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
