"use client";
import { Button } from "@/components/ui/button";
import { QuizDataContext } from "@/context/QuizDataContext";
import React, { useContext, useEffect, useState } from "react";
import RenderQuizQuestion from "./_components/RenderQuizQuestion";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";

const InterviewStartPage = () => {
  const { quizInfo, setQuizInfo } = useContext(QuizDataContext);
  const [questionList, setQuestionList] = useState([
    {
      id: 1,
      question:
        "Which of the following is NOT a front-end framework or library?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "React",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Angular",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Vue.js",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Spring Boot",
          isCorrect: true,
        },
      ],
    },
    {
      id: 2,
      question: "What is the purpose of CORS (Cross-Origin Resource Sharing)?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "To prevent SQL injection attacks",
          isCorrect: false,
        },
        {
          id: "b",
          text: "To allow a web page to make requests to a different domain than the one which served the web page",
          isCorrect: true,
        },
        {
          id: "c",
          text: "To encrypt data transmitted over the internet",
          isCorrect: false,
        },
        {
          id: "d",
          text: "To manage user authentication",
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      question:
        "Which HTTP method is typically used to update an existing resource?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "GET",
          isCorrect: false,
        },
        {
          id: "b",
          text: "POST",
          isCorrect: false,
        },
        {
          id: "c",
          text: "PUT",
          isCorrect: true,
        },
        {
          id: "d",
          text: "DELETE",
          isCorrect: false,
        },
      ],
    },
    {
      id: 4,
      question: "What is the primary function of a database index?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "To store all the data in a table",
          isCorrect: false,
        },
        {
          id: "b",
          text: "To improve the speed of data retrieval operations on a database table",
          isCorrect: true,
        },
        {
          id: "c",
          text: "To enforce data integrity constraints",
          isCorrect: false,
        },
        {
          id: "d",
          text: "To encrypt the database",
          isCorrect: false,
        },
      ],
    },
    {
      id: 5,
      question: "Which of the following is a NoSQL database?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "MySQL",
          isCorrect: false,
        },
        {
          id: "b",
          text: "PostgreSQL",
          isCorrect: false,
        },
        {
          id: "c",
          text: "MongoDB",
          isCorrect: true,
        },
        {
          id: "d",
          text: "Oracle",
          isCorrect: false,
        },
      ],
    },
    {
      id: 6,
      question: "What does the acronym REST stand for?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "Representational Encryption State Transfer",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Representational State Transfer",
          isCorrect: true,
        },
        {
          id: "c",
          text: "Resourceful State Transfer",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Real-time State Transfer",
          isCorrect: false,
        },
      ],
    },
    {
      id: 7,
      question:
        "What is the purpose of using environment variables in application development?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "To store code comments",
          isCorrect: false,
        },
        {
          id: "b",
          text: "To store configuration settings that may vary between environments (e.g., development, production)",
          isCorrect: true,
        },
        {
          id: "c",
          text: "To define the application's user interface",
          isCorrect: false,
        },
        {
          id: "d",
          text: "To manage the application's dependencies",
          isCorrect: false,
        },
      ],
    },
    {
      id: 8,
      question:
        "You are working on a feature with a tight deadline, and you encounter an unexpected bug that will take significant time to fix properly. How do you proceed?",
      type: "Behavioral",
      options: [],
    },
    {
      id: 9,
      question:
        "Which of the following is NOT a benefit of using version control systems like Git?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "Collaboration among developers",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Tracking changes to code over time",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Simplified deployment process",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Automatically fixing all code bugs",
          isCorrect: true,
        },
      ],
    },
    {
      id: 10,
      question: "What is the purpose of a 'callback' function in JavaScript?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "To define a new data type",
          isCorrect: false,
        },
        {
          id: "b",
          text: "To execute a function after another function has finished executing",
          isCorrect: true,
        },
        {
          id: "c",
          text: "To create a loop",
          isCorrect: false,
        },
        {
          id: "d",
          text: "To declare a variable",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [qsInd, setQsInd] = useState(0);
  useEffect(() => {
    console.log(quizInfo);
    if (quizInfo?.quizData) {
      setQuestionList(quizInfo?.quizData?.questionList);
    }
  }, [quizInfo]);

  return (
    <div className="select-none min-h-screen px-20  mt-16 md:px-28 lg:px-43 xl:px-52 border-gray-200 rouded-xl w-full">
      <h1>Interview Start</h1>
      <div className="w-full">
        <RenderQuizQuestion question={questionList[qsInd]}></RenderQuizQuestion>
      </div>
      <div className="flex justify-between items-center w-full mt-6">
        <Button
          onClick={() => {
            setQsInd((prev) => {
              return prev - 1;
            });
          }}
          className="cursor-pointer w-1/4"
          disabled={qsInd == 0}
        >
          <ArrowLeft />
          Previous
        </Button>
        <Button
          onClick={() => {
            setQsInd((prev) => {
              return prev + 1;
            });
          }}
          className="cursor-pointer w-1/4"
          disabled={questionList.length - 1 == qsInd}
        >
          Next
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default InterviewStartPage;
