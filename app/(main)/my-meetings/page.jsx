"use client";
import { useUser } from "@/app/provider";
import CreateMeeting from "@/components/meetings/interviewer/CreateMeeting";
import QuizCard from "@/components/Quiz/create-quiz/QuizCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const [meetingList, setMeetingList] = useState([]);
  const router = useRouter();
  const getMeetingList = async () => {
    try {
      const { data, error } = await supabase
        .from("Quizs")
        .select("jobPosition,duration,quiz_id,type,questionList")
        .eq("userEmail", user?.email)
        .order("id", { ascending: false });
      console.log(data);
      setMeetingList(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  const handleCreateMeeting = () => {
    router.push(`/dashboard/create-meeting`);
  };
  useEffect(() => {
    user && getMeetingList();
  }, [user]);
  return (
    <div className="mt-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">My Meeting List</h2>
          <h2 className="text-xl font-bold">All Previously Created Meeting</h2>
        </div>

        <CreateMeeting user={user} />
      </div>
      <div className="w-full mt-5 bg-white rounded-2xl border border-gray-200">
        {meetingList?.length == 0 && (
          <div className="p-5 flex flex-col justify-center items-center gap-3">
            <Video className="p-3 text-primary cursor-pointer bg-blue-50 rounded-full h-12 w-12" />
            <h2>You don`t have any quiz created!</h2>
            <Button
              className="cursor-pointer"
              onClick={() => handleCreateMeeting()}
            >
              + Create New Meeting
            </Button>
          </div>
        )}
      </div>
      {meetingList?.length > 0 && (
        <div className="grid grid-cols-2 mt-5 w-full xl:grid-cols-3 gap-5"></div>
      )}
    </div>
  );
};

export default page;
