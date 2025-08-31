"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailsContainer from "../../../../../components/interview/scheduled/InterviewDetailsContainer";
import CandidateList from "../../../../../components/interview/scheduled/CandidateList";

const page = () => {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);

  useEffect(() => {
    user && interview_id && getInterviewDetails();
  }, [user]);
  const getInterviewDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("Interviews")
        .select(
          "jobPosition,jobDescription,type,duration,questionList,created_at,interview_id,interview-feedback(*)"
        )
        .eq("userEmail", user?.email)
        .eq("interview_id", interview_id)
        .order("id", { ascending: false });
      setInterviewDetail(data[0]);
      console.log(data[0]);
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      {interviewDetail && (
        <div>
          <InterviewDetailsContainer interviewDetail={interviewDetail} />
          <CandidateList
            candidateList={interviewDetail?.["interview-feedback"]}
          />
        </div>
      )}
    </div>
  );
};

export default page;
