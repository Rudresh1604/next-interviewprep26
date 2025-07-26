"use client";
import { InterviewDataContext } from "@/context/InterViewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

const InterviewStart = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
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
          <Image
            src={"/ai-avatar2.png"}
            alt="AI"
            width={90}
            height={90}
            className="sm:w-auto sm:h-auto md:w-[160px] md:h-[160px] rounded-full object-cover"
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className="text-5xl bg-primary text-white rounded-full p-5 sm:w-auto sm:h-auto md:w-[160px] md:h-[160px] flex justify-center items-center">
            {interviewInfo?.userName[0]}{" "}
          </h2>
          <h2>{interviewInfo?.userName} </h2>
        </div>
      </div>
      <div className="flex items-center mt-7 justify-center gap-7">
        <Mic className="h-12 w-12 p-2 bg-gray-300 rounded-full cursor-pointer" />
        <Phone className="h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer" />
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview is in progress....
      </h2>
    </div>
  );
};

export default InterviewStart;
