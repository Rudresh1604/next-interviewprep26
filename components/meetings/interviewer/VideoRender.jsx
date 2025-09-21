"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Contact2, NotebookPen, Users, X } from "lucide-react";
import React, { useState } from "react";

const VideoRender = () => {
  //   const {
  //     useCallCallingState,
  //     useLocalParticipant,
  //     useRemoteParticipants,
  //     useParticipantCount,
  //   } = useCallStateHooks();

  //   const callingState = useCallCallingState();
  //   const localParticipant = useLocalParticipant();
  //   const remoteParticipants = useRemoteParticipants();
  //   const participantCount = useParticipantCount();

  //   // Log when participants change
  //   useEffect(() => {
  //     console.log("Remote participants:", remoteParticipants.length);
  //     console.log("Total participants:", participantCount);
  //   }, [remoteParticipants, participantCount]);

  //   if (callingState !== CallingState.JOINED) {
  //     return <div>Loading video call... ({callingState})</div>;
  //   }
  const [showOption, setShowOption] = useState(null);
  const [note, setNote] = useState(null);
  const [candidateName, setCandidateName] = useState(null);
  return (
    <div className="w-full h-full">
      <div className="flex ">
        <div className="w-full h-[500px] border bg-yellow-300 relative rounded-lg">
          <div className="w-[180px] h-[125px] border absolute rounded-lg top-1 right-1 bg-green-300"></div>
        </div>
        {showOption && (
          <div className="flex flex-col ml-2 border border-gray-300 rounded-lg px-2 py-2 w-1/3">
            {showOption == "Participant" && (
              <div className="flex flex-col">
                <h1 className="text-xl flex flex-row items-center justify-between">
                  <span>Participants</span>{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowOption(null)}
                  >
                    <X />
                  </span>
                </h1>
                <span className="border mt-1"></span>
                <div className="flex mt-2 flex-col w-full">
                  <div className="border rounded p-2">
                    <h1>Card 2</h1>
                  </div>
                </div>
              </div>
            )}
            {showOption == "Notes" && (
              <div className="flex flex-col h-full">
                <h1 className="text-xl flex flex-row items-center justify-between">
                  <span>Notes</span>{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowOption(null)}
                  >
                    <X />
                  </span>
                </h1>
                <span className="border mt-1"></span>
                <div className="flex rounded border-b p-2 mt-2 gap-1 flex-col w-full">
                  <h1>Candidate Name : </h1>
                  <Input
                    type={"text"}
                    onChange={(e) => setCandidateName(e.target.value)}
                  />
                </div>
                <div className="flex rounded border-b p-2 h-full mt-1 gap-1 flex-col w-full">
                  <h1>Notes : </h1>
                  <Textarea
                    className="h-full"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-end">
                  <Button className="mt-3 w-1/2">Save</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="my-3 cursor-pointer border-black border"
          onClick={() =>
            setShowOption((prev) => {
              if (prev == "Participant") {
                return null;
              } else {
                return "Participant";
              }
            })
          }
          variant="filled"
        >
          <Users /> Participants
        </Button>
        <Button
          className="my-3 border-black border cursor-pointer"
          onClick={() =>
            setShowOption((prev) => {
              if (prev == "Notes") {
                return null;
              } else {
                return "Notes";
              }
            })
          }
          variant="filled"
        >
          <NotebookPen /> Notes
        </Button>
      </div>
    </div>
  );
};

export default VideoRender;
