"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import VideoRender from "@/components/meetings/interviewer/VideoRender";
import { toast } from "sonner";

export default function InterviewerMeeting() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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

        if (!accessToken) {
          toast.error("Authentication required. Please login first.");
          router.push("/");
          return;
        }

        // Use the dedicated interviewer endpoint
        const res = await axios.post(
          "/api/stream-token/interviewer",
          { roomId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
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
        await call.join({ create: true });

        setClient(client);
        setCall(call);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize call:", err);

        if (err.response?.status === 401) {
          toast.error(
            "Unauthorized access. Please use a valid interviewer account."
          );
          router.push("/dashboard");
        } else {
          setError(err.message || "Failed to join the meeting");
        }
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      init();
    }
  }, [roomId, router]);

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
        <VideoRender />
      </StreamCall>
    </StreamVideo>
  );
}
