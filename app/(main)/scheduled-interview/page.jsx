"use client";
import { useUser } from "@/app/provider";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const getInterviewList = async () => {
    try {
      const { data, error } = await supabase
        .from("Interviews")
        .select(
          "jobPosition,duration,interview_id,interview-feedback(userEmail)"
        )
        .eq("userEmail", user?.email)
        .order("id", { ascending: false });
      console.log(data);
      setInterviewList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">
        Interview List With Candidate Feedback
      </h2>
      <h2 className="text-xl font-bold">All Previously Created Interviews</h2>
      <div className="w-full mt-5 bg-white rounded-2xl border border-gray-200">
        {interviewList?.length == 0 && (
          <div className="p-5 flex flex-col justify-center items-center gap-3">
            <Video className="p-3 text-primary cursor-pointer bg-blue-50 rounded-full h-12 w-12" />
            <h2>You don`t have any interview created!</h2>
            <Button>+ Create New Interview</Button>
          </div>
        )}
      </div>
      {interviewList?.length > 0 && (
        <div className="grid grid-cols-2 mt-5 w-full xl:grid-cols-3 gap-5">
          {interviewList?.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
