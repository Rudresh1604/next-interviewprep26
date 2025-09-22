"use client";
import {
  CallingState,
  StreamTheme,
  useCallStateHooks,
  ParticipantView,
  useCall,
} from "@stream-io/video-react-sdk";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  PanelLeft,
  PanelLeftClose,
  Code,
  Play,
  Download,
  MonitorUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import CodeEditor2 from "./temp";

// Simple code editor component
const CodeEditor = ({ code, setCode, language }) => {
  const [themes, setThemes] = useState([
    "vs-dark",
    "hc-black",
    "light",
    "dark",
    "hc-light",
  ]);
  const [theme, setTheme] = useState("vs-dark");
  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
        <select
          className="text-sm px-2 py-1 border rounded"
          value={language}
          onChange={(e) => {
            /* Handle language change */
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Play className="h-4 w-4 mr-1" /> Run
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </div>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="75vh"
        theme={theme}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <div className="bg-gray-100 px-4 py-2 border-t text-sm">
        <div className="font-medium">Output:</div>
        <div className="mt-1 p-2 bg-white border rounded">
          {/* Output will appear here */}
          Run your code to see output
        </div>
      </div>
    </div>
  );
};

const CandidateMeetingUI = () => {
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
  const [showOption, setShowOption] = useState("Problem");
  const [code, setCode] = useState(
    "// Write your solution here\nfunction solution() {\n  // Your code here\n  return result;\n}"
  );

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  // Get interviewers (participants with "Interviewer" in their name)
  const interviewers = remoteParticipants.filter(
    (participant) =>
      participant.name && participant.name.toLowerCase().includes("interviewer")
  );

  const toggleMic = async () => {
    await microphone.toggle();
  };

  const handleScreenShare = async () => {
    await call.screenShare.toggle();
  };

  const toggleVideo = async () => {
    await camera.toggle();
  };

  // End call
  const endCall = () => {
    console.log("Ending call");
  };

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Joining interview... ({callingState})
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Technical Interview
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

      <div className="flex flex-1 h-full overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 h-[750px] flex flex-col">
          {/* Main Video Area - Show interviewer video */}
          <div className="flex-1 relative bg-gray-900 flex items-center justify-center p-4">
            {interviewers.length > 0 ? (
              <div className="w-full h-full max-w-4xl flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg bg-black">
                  <ParticipantView participant={interviewers[0]} />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
                    {interviewers[0].name || "Interviewer"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white">
                <div className="bg-gray-800 rounded-lg p-8 inline-block">
                  <div className="animate-pulse bg-gray-700 h-32 w-32 rounded-full mx-auto"></div>
                  <p className="mt-4 text-lg">
                    Waiting for interviewer to join...
                  </p>
                </div>
              </div>
            )}

            {/* Local Video (Candidate) */}
            {localParticipant && (
              <div className="absolute top-4 right-4 w-64 h-48 rounded-lg overflow-hidden shadow-lg border-2 border-white bg-black">
                <ParticipantView participant={localParticipant} />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  You (Candidate)
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
              variant="destructive"
              size="lg"
              className="rounded-full h-12 w-12 p-0"
              onClick={endCall}
            >
              <PhoneOff className="h-5 w-5" />
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
          <div className="w-96 border-l bg-white flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  showOption === "Problem"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setShowOption("Problem")}
              >
                <Code className="h-4 w-4 inline-block mr-2" />
                Problem
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  showOption === "Editor"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setShowOption("Editor")}
              >
                <Code className="h-4 w-4 inline-block mr-2" />
                Code Editor
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {showOption === "Problem" ? (
                <div className="h-full flex flex-col">
                  <h2 className="font-semibold text-gray-700 mb-3">
                    Coding Problem
                  </h2>

                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800">Two Sum</h3>
                    <p className="text-sm text-gray-700 mt-2">
                      Given an array of integers nums and an integer target,
                      return indices of the two numbers such that they add up to
                      target.
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      You may assume that each input would have exactly one
                      solution, and you may not use the same element twice.
                    </p>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-blue-800">
                        Example 1:
                      </h4>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                        Input: nums = [2,7,11,15], target = 9<br />
                        Output: [0,1]
                        <br />
                        Explanation: Because nums[0] + nums[1] == 9, we return
                        [0, 1].
                      </pre>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-blue-800">
                        Constraints:
                      </h4>
                      <ul className="text-xs text-gray-700 list-disc pl-5 mt-1">
                        <li>2 ≤ nums.length ≤ 10⁴</li>
                        <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                        <li>-10⁹ ≤ target ≤ 10⁹</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t">
                    <Button className="w-full">Submit Solution</Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <h2 className="font-semibold text-gray-700 mb-3">
                    Code Editor
                  </h2>
                  <CodeEditor2 />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateMeetingUI;
