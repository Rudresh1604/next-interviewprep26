"use client";
import InterviewHeader from "@/components/interview/InterviewHeader";
import { QuizDataContext } from "@/context/QuizDataContext";

import React, { useState } from "react";

function QuizLayout({ children }) {
  const [quizInfo, setQuizInfo] = useState();
  return (
    <QuizDataContext.Provider value={{ quizInfo, setQuizInfo }}>
      <div className="bg-secondary">
        <InterviewHeader />
        {children}
      </div>
    </QuizDataContext.Provider>
  );
}

export default QuizLayout;
