"use client";
import { useUser } from "@/app/provider";
import QuestionListContainer from "@/components/create-quiz/QuestionListContainer";
import JobDetailsContainer from "@/components/JobDetailsContainer";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { quiz_id } = useParams();
  const { user } = useUser();
  const [quizDetails, setQuizDetails] = useState();
  const getQuizDetails = async () => {
    try {
      console.log(user);

      const { data, error } = await supabase
        .from("Quizs")
        .select(
          "jobPosition,jobDescription,type,duration,questionList,created_at,quiz_id"
        )
        .eq("userEmail", user?.email)
        .eq("quiz_id", quiz_id)
        .order("id", { ascending: false });
      setQuizDetails(data[0]);
      console.log(data[0]);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    console.log(quiz_id);
    console.log(user);

    quiz_id && getQuizDetails();
  }, [user]);
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold">Scheduled Quizs Details Page</h1>
      <div className="p-5 bg-white rounded-lg mt-5">
        {quizDetails && <JobDetailsContainer job={quizDetails} />}
        <div className="mt-5 lg:mt-9 ">
          <QuestionListContainer
            questionList={quizDetails?.questionList}
            isEdit={false}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
