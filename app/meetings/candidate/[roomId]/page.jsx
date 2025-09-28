"use client";
import { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { useParams, useRouter } from "next/navigation";
import CandidateMeetingUI from "@/components/meetings/candidate/CandidateUI";
import { useUser } from "@/app/provider";

export default function CandidateMeeting() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const roomId = params.roomId;
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      // redirect to interviewer page
      router.push("/meetings/interviewer/" + roomId);
    }
  }, [user]);

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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interview room...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-lg max-w-md">
            <h2 className="font-semibold">Error</h2>
            <p className="mt-2">{error}</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );

  if (!client || !call)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-blue-200 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Initializing video call...</p>
          </div>
        </div>
      </div>
    );

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CandidateMeetingUI />
      </StreamCall>
    </StreamVideo>
  );
}
