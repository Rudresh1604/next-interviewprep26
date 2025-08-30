"use client";
import { useUser } from "@/app/provider";
import QuizCard from "@/components/create-quiz/QuizCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const [quizList, setQuizList] = useState([]);
  const router = useRouter();
  const getQuizList = async () => {
    try {
      const { data, error } = await supabase
        .from("Quizs")
        .select("jobPosition,duration,quiz_id,type,questionList")
        .eq("userEmail", user?.email)
        .order("id", { ascending: false });
      console.log(data);
      setQuizList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateQuiz = () => {
    router.push(`/dashboard/create-quiz`);
  };
  useEffect(() => {
    user && getQuizList();
  }, [user]);
  return (
    <div className="mt-5">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">Quiz List Of Candidates</h2>
          <h2 className="text-xl font-bold">All Previously Created Quizs</h2>
        </div>
        <Button className="cursor-pointer" onClick={() => handleCreateQuiz()}>
          + Create New Quizs
        </Button>
      </div>
      <div className="w-full mt-5 bg-white rounded-2xl border border-gray-200">
        {quizList?.length == 0 && (
          <div className="p-5 flex flex-col justify-center items-center gap-3">
            <Video className="p-3 text-primary cursor-pointer bg-blue-50 rounded-full h-12 w-12" />
            <h2>You don`t have any quiz created!</h2>
            <Button
              className="cursor-pointer"
              onClick={() => handleCreateQuiz()}
            >
              + Create New Quiz
            </Button>
          </div>
        )}
      </div>
      {quizList?.length > 0 && (
        <div className="grid grid-cols-2 mt-5 w-full xl:grid-cols-3 gap-5">
          {quizList?.map((quiz, index) => (
            <QuizCard quiz={quiz} key={index} viewDetail={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
