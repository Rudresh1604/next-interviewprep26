"use client";
import { Button } from "@/components/ui/button";
import { QuizDataContext } from "@/context/QuizDataContext";
import React, { useContext, useEffect, useState } from "react";
import RenderQuizQuestion from "./_components/RenderQuizQuestion";

const InterviewStartPage = () => {
  const { quizInfo, setQuizInfo } = useContext(QuizDataContext);
  const [questionList, setQuestionList] = useState([]);
  const [qsInd, setQsInd] = useState(0);
  useEffect(() => {
    console.log(quizInfo);
    if (quizInfo?.quizData) {
      setQuestionList(quizInfo?.quizData?.questionList);
    }
  }, [quizInfo]);

  return (
    <div className="select-none bg-white border px-20 mt-16 md:px-28 lg:px-43 xl:px-52 border-gray-200 rouded-xl w-full">
      <h1>Interview Start</h1>
      <div className="w-full">
        <RenderQuizQuestion question={questionList[qsInd]}></RenderQuizQuestion>
      </div>
      <div className="flex justify-between items-center w-full my-3">
        <Button
          onClick={() => {
            setQsInd((prev) => {
              prev - 1;
            });
          }}
          className="cursor-pointer"
          disabled={qsInd == 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setQsInd((prev) => {
              prev + 1;
            });
          }}
          className="cursor-pointer"
          disabled={questionList.length - 1 == qsInd}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InterviewStartPage;
