"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizDataContext } from "@/context/QuizDataContext";
import { supabase } from "@/services/supabaseClient";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const QuizPage = () => {
  const { quiz_id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const { quizInfo, setQuizInfo } = useContext(QuizDataContext);
  const router = useRouter();
  console.log(quiz_id);

  const getQuizDetail = async () => {
    setLoading(true);
    try {
      console.log(quiz_id);

      let { data: Quizs, error } = await supabase
        .from("Quizs")
        .select("jobPosition,jobDescription,duration,type")
        .eq("quiz_id", quiz_id);

      console.log(Quizs[0]);
      setQuizData(Quizs[0]);

      if (Quizs.length == 0) {
        router.push("/");
        toast("Incorrect Interview Link !");
      }
      setLoading(false);
    } catch (error) {
      toast("Incorrect Interview Link !");

      console.log(error);

      setLoading(false);
      router.push("/");
    }
  };

  const onStartQuiz = async () => {
    try {
      setLoading(true);
      const { data: Quizs, error } = await supabase
        .from("Quizs")
        .select("*")
        .eq("quiz_id", quiz_id);
      console.log(Quizs[0]);
      setQuizInfo({
        userName: userName,
        userEmail: userEmail,
        quizData: Quizs[0],
      });
      console.log(quizInfo);

      setLoading(false);
      router.push(`/quizs/${quiz_id}/start`);
    } catch (error) {
      toast("Invalid Quiz Link !");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    quiz_id && getQuizDetail();
  }, [quiz_id]);

  return (
    <div className="px-10 mt-16 md:px-28 lg:px-43 xl:px-52">
      <div className="flex flex-col items-center justify-center border p-7  rounded-lg bg-white">
        <h2 className="mt-3">AI Recruiter</h2>
        <Image
          src={"/robot.png"}
          alt="logo"
          width={200}
          height={50}
          className="w-[160px] h-[100px]"
        />
        {/* add animayion of interview */}
        <h2 className="font-bold text-lg mt-5 ">{quizData?.jobPosition} </h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-4">
          {" "}
          <Clock className="h-4 w-4" /> {quizData?.duration}
        </h2>
        <div className="lg:w-[60%] w-full my-3">
          <h2>Enter your full name</h2>
          <Input
            className="mt-2"
            placeholder="e.g. Ram Kumar"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="lg:w-[60%] w-full my-3">
          <h2>Enter your Email:</h2>
          <Input
            className="mt-2"
            placeholder="e.g. abc@email.com"
            onChange={(e) => setUserEmail(e.target.value)}
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
          disabled={loading || !userName || !userEmail}
          onClick={() => onStartQuiz()}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <Video />}
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;
