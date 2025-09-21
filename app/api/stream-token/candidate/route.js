import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_STREAM_API_KEY;
const apiSecret = process.env.NEXT_STREAM_SECRET_KEY;

const streamClient = new StreamClient(apiKey, apiSecret);

export async function POST(req) {
  try {
    const { roomId } = await req.json();

    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    // Generate token for candidate (guest user)
    const userId = `candidate-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const streamToken = streamClient.generateUserToken({
      user_id: userId,
      iat: Math.floor(Date.now() / 1000) - 60,
    });

    return NextResponse.json({
      token: streamToken,
      apiKey,
      userId,
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
