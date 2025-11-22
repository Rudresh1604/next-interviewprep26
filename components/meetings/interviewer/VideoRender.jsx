"use client";
import {
  CallingState,
  StreamTheme,
  useCallStateHooks,
  ParticipantView,
  useCall,
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Contact2,
  NotebookPen,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  PanelLeft,
  PanelLeftClose,
  MonitorUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "@/services/supabaseClient";

const InterviewerMeetingUI = () => {
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
  } = useCallStateHooks();
  const call = useCall();
  const { camera, isMute } = useCameraState();
  const { microphone, optimisticIsMute } = useMicrophoneState();
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const participantCount = useParticipantCount();
  const [showOption, setShowOption] = useState("Participant");
  const [note, setNote] = useState("");
  const [candidateName, setCandidateName] = useState("");

  const [sideBarOpen, setSideBarOpen] = useState(true);

  // Filter participants based on name
  const candidates = remoteParticipants.filter(
    (participant) =>
      participant.name && participant.name.toLowerCase().includes("candidate")
  );

  console.log(remoteParticipants);

  const interviewers = remoteParticipants.filter(
    (participant) =>
      participant.name && participant.name.toLowerCase().includes("interviewer")
  );

  const handleSaveNotes = async () => {
    // fun to save note in supabase
    const { data, error } = await supabase.from("Meetings").findOne();
  };

  // End call
  const endCall = async () => {
    console.log("Ending call");
    await call.endCall();
    // Add actual call ending logic here
  };

  // Log when participants change
  useEffect(() => {
    console.log("Remote participants:", remoteParticipants.length);
    console.log("Candidates:", candidates.length);
    console.log("Interviewers:", interviewers.length);
    console.log("Total participants:", participantCount);
  }, [remoteParticipants, participantCount, candidates, interviewers]);

  const toggleMic = async () => {
    await microphone.toggle();
  };

  const handleScreenShare = async () => {
    await call.screenShare.toggle();
  };

  const toggleVideo = async () => {
    await camera.toggle();
  };

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading video call... ({callingState})
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Interview Session
        </h1>
        <div className="flex items-center space-x-2">
          <div
            className={`h-3 w-3 rounded-full ${
              participantCount > 1 ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {participantCount} participant{participantCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Main Video Area */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center p-4">
            {candidates.length > 0 ? (
              <div className="w-full h-full max-w-4xl flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-black">
                  <ParticipantView participant={candidates[0]} />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
                    {candidates[0].name || "Candidate"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white">
                <div className="bg-gray-800 rounded-lg p-8 inline-block">
                  <Users className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-lg">
                    Waiting for candidate to join...
                  </p>
                </div>
              </div>
            )}

            {/* Local Video (You) - Added key to force re-render on permission changes */}
            {localParticipant && (
              <div className="absolute top-4 right-4 w-64 h-48 rounded-lg overflow-hidden shadow-lg border-2 border-white bg-black">
                <ParticipantView participant={localParticipant} />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  You
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-white border-t py-4 px-6 flex justify-center space-x-4">
            <Button
              variant={!optimisticIsMute ? "default" : "secondary"}
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={toggleMic}
            >
              {!optimisticIsMute ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant={!isMute ? "default" : "secondary"}
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={toggleVideo}
            >
              {!isMute ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant={
                call?.screenShare?.state?.status == "enabled"
                  ? "default"
                  : "secondary"
              }
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={handleScreenShare}
            >
              <MonitorUp className="h-5 w-5" />
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={endCall}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={() => setSideBarOpen(!sideBarOpen)}
            >
              {sideBarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Side Panel */}
        {sideBarOpen && (
          <div className="w-80 border-l bg-white flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  showOption === "Participant"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setShowOption("Participant")}
              >
                <Users className="h-4 w-4 inline-block mr-2" />
                Participants
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  showOption === "Notes"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setShowOption("Notes")}
              >
                <NotebookPen className="h-4 w-4 inline-block mr-2" />
                Notes
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {showOption === "Participant" ? (
                <div className="space-y-3">
                  <h2 className="font-semibold text-gray-700 mb-3">
                    Participants ({participantCount})
                  </h2>

                  {/* Local Participant (You) */}
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Contact2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">You (Interviewer)</p>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                  </div>

                  {/* Candidates */}
                  {candidates.map((participant) => (
                    <div
                      key={participant.sessionId}
                      className="flex items-center p-3 bg-green-50 rounded-lg"
                    >
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Contact2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {participant.name || "Candidate"}
                        </p>
                        <p className="text-sm text-gray-500">Connected</p>
                      </div>
                    </div>
                  ))}

                  {/* Other Interviewers */}
                  {interviewers.map((participant) => (
                    <div
                      key={participant.sessionId}
                      className="flex items-center p-3 bg-purple-50 rounded-lg"
                    >
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Contact2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {participant.name || "Interviewer"}
                        </p>
                        <p className="text-sm text-gray-500">Connected</p>
                      </div>
                    </div>
                  ))}

                  {candidates.length === 0 && interviewers.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <p>No other participants yet</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <h2 className="font-semibold text-gray-700 mb-3">
                    Interview Notes
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Candidate Name
                    </label>
                    <Input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter candidate name"
                    />
                  </div>

                  <div className="flex-1 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write your notes here..."
                      className="h-64"
                    />
                  </div>

                  <Button className="w-full" onClick={handleSaveNotes}>
                    Save Notes
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerMeetingUI;
