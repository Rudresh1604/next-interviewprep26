"use client";
import { InterviewDataContext } from "@/context/InterViewDataContext";
import Vapi from "@vapi-ai/web";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";

import React, { useContext, useEffect, useState } from "react";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

const InterviewStart = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();
  const [conversation, setConversation] = useState(null);
  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);
  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList?.forEach((item, index) => {
      questionList = item?.question + "," + questionList;
    });
    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,

      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },

      voice: {
        provider: "playht",
        voiceId: "Jennifer",
      },

      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.

Your job is to ask candidates the provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. 
Example: "Hey there! Welcome to your interview for ${interviewInfo?.interviewData?.jobPosition}. Let's get started with some lighter questions."

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.

Below are the questions to ask one by one:
Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer.
Examples:
- "Nice! That's a solid answer."
- "Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like:
- "Alright, next up..."
- "Let's tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance.
Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level
- Ensure the interview remains focused on React
        `.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message);
      console.log(message?.conversation);
      if (message?.conversation) setConversation(message?.conversation);
    };
    vapi.on("message", handleMessage);
    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setActiveUser(true);
    });

    vapi.on("call-start", () => {
      console.log("Call started");

      setCallActive(true);
      toast("Call connected...");
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallActive(false);
      toast("Call Ended...");
    });
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-end", () => console.log("Call End is offed"));
      vapi.off("call-start", () => console.log("Call start is offed"));
      vapi.off("speech-start", () => console.log("Speech start is offed"));
      vapi.off("speech-end", () => console.log("Speech End is OFF"));
    };
  }, []);
  const stopInterview = () => {
    vapi.stop();
    setCallActive(false);
    generateFeedback();
  };

  const generateFeedback = async () => {
    if (!conversation) return;
    // func
    try {
      const res = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });

      console.log(res?.data);
      const content = res?.data?.data?.feedback;

      console.log(content);
      let recommended = content?.recommendation == "No" ? 0 : 1;
      const { data: InterviewFeedback, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: content,
            recommended: recommended,
          },
        ])
        .select();
      router.replace(`/interview/${interview_id}/completed`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-20 mt-16 md:px-28 lg:px-43 xl:px-52">
      <h2 className="flex justify-between items-center font-bold text-xl">
        AI Interview Session
        <span className="flex items-center gap-2">
          <Timer className="animate-bounce" />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 mt-7 md:grid-cols-2 gap-7">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col items-center justify-center gap-3">
          <div className="relative">
            {callActive && !activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai-avatar2.png"}
              alt="AI"
              width={90}
              height={90}
              className="sm:w-auto sm:h-auto md:w-[160px] md:h-[160px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {callActive && activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-5xl bg-primary text-white rounded-full p-5 sm:w-auto sm:h-auto md:w-[160px] md:h-[160px] flex justify-center items-center">
              {interviewInfo?.userName[0]}{" "}
            </h2>
          </div>
          <h2>{interviewInfo?.userName} </h2>
        </div>
      </div>
      <div className="flex items-center mt-7 justify-center gap-7">
        <Mic className="h-12 w-12 p-2 bg-gray-300 rounded-full cursor-pointer" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className="h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview is in progress....
      </h2>
    </div>
  );
};

export default InterviewStart;
