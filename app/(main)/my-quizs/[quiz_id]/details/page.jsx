"use client";
import { useUser } from "@/app/provider";
import CandidateList from "@/components/create-quiz/CandidateList";
import QuestionListContainer from "@/components/create-quiz/QuestionListContainer";
import JobDetailsContainer from "@/components/JobDetailsContainer";
import { supabase } from "@/services/supabaseClient";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { quiz_id } = useParams();
  const { user } = useUser();
  const [quizDetails, setQuizDetails] = useState(null);
  const getQuizDetails = async () => {
    try {
      console.log(user);

      const { data, error } = await supabase
        .from("Quizs")
        .select(
          "jobPosition,jobDescription,type,duration,questionList,created_at,quiz_id,QuizResult(*)"
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
      {quizDetails ? (
        <>
          <div className="p-5 bg-white rounded-lg mt-5 border border-gray-200 shadow-lg">
            <JobDetailsContainer job={quizDetails} />
            <div className="mt-5 lg:mt-9 ">
              <QuestionListContainer
                questionList={quizDetails?.questionList}
                isEdit={false}
              />
            </div>
          </div>
          <CandidateList candidateList={quizDetails?.QuizResult} />
        </>
      ) : (
        <h1 className="flex items-center font-medium text-primary my-5 md:my-9 text-2xl md:text-3xl gap-2 justify-center">
          <Loader className="animate-spin w-9 h-9 md:w-12 md:h-12" />
          Loading
        </h1>
      )}
    </div>
  );
};

export default page;
