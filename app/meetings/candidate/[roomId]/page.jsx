"use client";

import { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";

export default function CandidateMeeting({ roomId }) {
  const [client, setClient] = useState();
  const [call, setCall] = useState();

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/stream-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });

      const { token, apiKey, userId } = await res.json();

      console.log("token", token);
      console.log("apiKey", apiKey);
      console.log("user", userId);

      const client = new StreamVideoClient({
        apiKey,
        user: { id: userId, name: "Candidate" },
        token,
      });

      const call = client.call("default", roomId);
      await call.join({ create: true });

      setClient(client);
      setCall(call);
    };

    init();
  }, [roomId]);

  if (!client || !call) return <div>Joining interview...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div>👤 Candidate joined room {roomId}</div>
      </StreamCall>
    </StreamVideo>
  );
}
