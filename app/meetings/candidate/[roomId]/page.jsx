"use client";
import { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import CandidateMeetingUI from "@/components/meetings/candidate/CandidateUI";

export default function CandidateMeeting() {
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

        const res = await fetch("/api/stream-token/candidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const { token, apiKey, userId } = await res.json();

        console.log("Candidate joining room:", roomId, "with ID:", userId);

        const client = new StreamVideoClient({
          apiKey,
          user: { id: userId, name: "Candidate" }, // Set name as "Candidate"
          token,
        });

        const call = client.call("default", roomId);
        await call.join(); // Candidate joins existing call

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

  if (loading) return <div>Joining interview room...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client || !call) return <div>Initializing video call...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CandidateMeetingUI /> {/* Use the candidate-specific UI */}
      </StreamCall>
    </StreamVideo>
  );
}
