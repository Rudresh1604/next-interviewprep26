"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import { useParams } from "next/navigation";
import MeetingComponent from "@/components/meetings/RenderComponent";

export default function InterviewerMeeting() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const roomId = params.roomId;

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const accessToken = session?.access_token;

        const res = await axios.post(
          "/api/stream-token",
          { roomId },
          {
            headers: {
              "Content-Type": "application/json",
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
          }
        );

        const { token, apiKey, userId } = res.data;

        console.log("Interviewer joining room:", roomId, "with ID:", userId);

        const client = new StreamVideoClient({
          apiKey,
          user: { id: userId, name: "Interviewer" },
          token,
        });

        const call = client.call("default", roomId);
        await call.join({ create: true }); // Interviewer creates the call

        setClient(client);
        setCall(call);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize call:", err);
        setError(err.message || "Failed to join the meeting");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      init();
    }
  }, [roomId]);

  if (loading) return <div>Loading interview room...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client || !call) return <div>Initializing video call...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div>✅ Interviewer joined room: {roomId}</div>
        <MeetingComponent />
      </StreamCall>
    </StreamVideo>
  );
}
