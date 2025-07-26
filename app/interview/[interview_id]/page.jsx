"use client";
import InterviewHeader from "@/components/interview/InterviewHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewDataContext } from "@/context/InterViewDataContext";
import { supabase } from "@/services/supabaseClient";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const InterviewPage = () => {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  const getInterviewDetail = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobPosition,jobDescription,duration,type")
        .eq("interview_id", interview_id);

      setInterviewData(Interviews[0]);
      if (Interviews.length == 0) {
        toast("Incorrect Interview Link !");
      }
      setLoading(false);
    } catch (error) {
      toast("Incorrect Interview Link !");
      console.log(error);

      setLoading(false);
    }
  };

  const onJoinInterview = async () => {
    try {
      setLoading(true);
      const { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interview_id);
      console.log(Interviews[0]);
      setInterviewInfo({
        userName: userName,
        interviewData: Interviews[0],
      });
      setLoading(false);
      router.push(`/interview/${interview_id}/start`);
    } catch (error) {
      toast("Invalid Interview Link !");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    interview_id && getInterviewDetail();
  }, [interview_id]);

  return (
    <div className="px-10 mt-16 md:px-28 lg:px-43 xl:px-52">
      <div className="flex flex-col items-center justify-center border p-7  rounded-lg bg-white">
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/robot.png"}
          alt="logo"
          width={200}
          height={50}
          className="w-[160px] h-[100px]"
        />
        {/* add animayion of interview */}
        <h2 className="font-bold text-lg mt-5 ">
          {interviewData?.jobPosition}{" "}
        </h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-4">
          {" "}
          <Clock className="h-4 w-4" /> {interviewData?.duration} Minutes{" "}
        </h2>
        <div className="lg:w-[60%] w-full ">
          <h2>Enter your full name</h2>
          <Input
            className="mt-2"
            placeholder="e.g. Ram Kumar"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="p-3 bg-blue-100 flex gap-4 rounded-xl mt-5 lg:w-[60%] w-full">
          <Info />
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul>
              <li className="text-sm text-primary">
                -- Ensure stable internet connection
              </li>
              <li className="text-sm text-primary">
                -- Ensure stable internet connection
              </li>
              <li className="text-sm text-primary">
                -- Ensure stable internet connection
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-5 lg:w-[60%] w-full  font-bold"
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <Video />} Join
          Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewPage;
