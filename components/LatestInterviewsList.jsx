"use client";
import { Video } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewCard from "./InterviewCard";

const LatestInterviewsList = () => {
  const [interviewList, setInterviewList] = useState([]);

  const { user } = useUser();
  useEffect(() => {
    console.log(user);
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
      const { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("userEmail", user?.email)
        .order("id", { ascending: false })
        .limit(8);
      console.log(Interviews);
      setInterviewList(Interviews);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-5">
      <h2 className="text-xl font-bold">Previously Created Interviews</h2>
      <div className="w-full mt-5 bg-white rounded-2xl border border-gray-200">
        {interviewList?.length == 0 && (
          <div className="p-5 flex flex-col justify-center items-center gap-3">
            <Video className="p-3 text-primary cursor-pointer bg-blue-50 rounded-full h-12 w-12" />
            <h2>You don`t have any interview created!</h2>
            <Button className="cursor-pointer">+ Create New Interview</Button>
          </div>
        )}
      </div>
      {interviewList?.length > 0 && (
        <div className="grid max-sm:grid-cols-1 grid-cols-2 mt-5 w-full xl:grid-cols-3 gap-5">
          {interviewList?.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestInterviewsList;
