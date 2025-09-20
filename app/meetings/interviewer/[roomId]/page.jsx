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

export default function InterviewerMeeting() {
  const [client, setClient] = useState();
  const [call, setCall] = useState();

  const params = useParams();
  const roomId = params.roomId; // ✅ extract string

  useEffect(() => {
    const init = async () => {
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

      const client = new StreamVideoClient({
        apiKey,
        user: { id: userId, name: "Interviewer" },
        token,
      });

      const call = client.call("default", roomId);
      await call.join({ create: true });

      setClient(client);
      setCall(call);
    };

    init();
  }, [roomId]);

  if (!client || !call) return <div>Loading interview...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div>✅ Interviewer joined room {roomId}</div>
      </StreamCall>
    </StreamVideo>
  );
}
