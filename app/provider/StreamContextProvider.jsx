"use client";
import React, { useEffect } from "react";
import { useUser } from "../provider";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

const StreamVideoProvider = ({ children }) => {
  const [streamVideoClient, setStreamVideoClient] = useState();
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_STREAM_API_KY,
      user: { id: user?.id, name: user?.name || user?.id },
      tokenProvider: streamTokenProvider,
    });
    setStreamVideoClient(client);
  }, [user]);
  if (!streamVideoClient)
    return (
      <h1>
        <Loader></Loader> Laoding
      </h1>
    );
  return (
    <div>
      <StreamVideo client={streamVideoClient}>{children}</StreamVideo>
    </div>
  );
};

export default StreamVideoProvider;
