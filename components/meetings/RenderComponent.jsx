"use client";
import {
  CallingState,
  StreamTheme,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";

const MeetingComponent = () => {
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
    useParticipantCount,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const participantCount = useParticipantCount();

  // Log when participants change
  useEffect(() => {
    console.log("Remote participants:", remoteParticipants.length);
    console.log("Total participants:", participantCount);
  }, [remoteParticipants, participantCount]);

  if (callingState !== CallingState.JOINED) {
    return <div>Loading video call... ({callingState})</div>;
  }

  return (
    <StreamTheme>
      <div className="p-3 m-3 border rounded-xl">
        <h1>Participants: {participantCount}</h1>
        <div className="flex items-center relative">
          <div className="flex items-center justify-center">
            <h2>Other Participants</h2>
            <MyParticipantList participants={remoteParticipants} />
          </div>
          <div className="absolute w-1/5 top-0 right-0 bg-red-500">
            <MyFloatingLocalParticipant participant={localParticipant} />
          </div>
        </div>
      </div>
    </StreamTheme>
  );
};

export default MeetingComponent;

const MyParticipantList = ({ participants }) => {
  if (participants.length === 0) {
    return <div>Waiting for other participants to join...</div>;
  }

  return (
    <div className="flex ">
      {participants.map((participant) => (
        <div key={participant.sessionId} className="w-full h-full">
          <ParticipantView participant={participant} />
          <div>{participant.name || "Unknown"}</div>
        </div>
      ))}
    </div>
  );
};

const MyFloatingLocalParticipant = ({ participant }) => {
  if (!participant) {
    return <p>Error: No local participant</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center border-4 border-gray-700">
      <ParticipantView participant={participant} />
    </div>
  );
};
