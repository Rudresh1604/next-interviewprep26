"use client";
import { Button } from "@/components/ui/button";
import { QuizDataContext } from "@/context/QuizDataContext";
import React, { useContext, useEffect, useState } from "react";
import RenderQuizQuestion from "./_components/RenderQuizQuestion";
import { ArrowLeft, ArrowRight, Clock, Clock2Icon, Timer } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [candidateEmail, setCandidateEmail] = useState(null);
  const [candidateName, setCandidateName] = useState(null);
  const [duration, setDuration] = useState(null);
  const [correctAnswered, setCorrectAnsewered] = useState({});
  const [totalQuestion, setTotalQuestion] = useState({});

  const router = useRouter();
  useEffect(() => {
    console.log(quizInfo);
    if (quizInfo?.quizData) {
      setCandidateEmail(quizInfo?.userEmail);
      setCandidateName(quizInfo?.userName);
      setQuestionList(quizInfo?.quizData?.questionList);
      // console.log(quizInfo?.quizData?.duration);
      setDuration(quizInfo?.quizData?.duration * 60);
      setTimeLeft(quizInfo?.quizData?.duration * 60);
    }
  }, [quizInfo]);

  useEffect(() => {
    if (!timeLeft) return;
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const clearAnswer = (qsType, qsInd) => {
    setCorrectAnsewered((prev) => {
      const updated = { ...prev };

      if (updated[qsType]) {
        const newSet = new Set(updated[qsType]);
        newSet.delete(qsInd); // remove the index if exists
        updated[qsType] = newSet;
      }

      return updated;
    });
  };

  const handleNextClick = () => {
    const qs = questionList[qsInd];

    setTotalQuestion((prev) => {
      const updated = { ...prev };
      if (!updated[qs.type]) {
        updated[qs.type] = new Set();
      }
      updated[qs.type].add(qsInd);
      return updated;
    });

    setCorrectAnsewered((prev) => {
      const updated = { ...prev };

      if (!updated[qs.type]) {
        updated[qs.type] = new Set();
      }

      if (selectedOption?.isCorrect) {
        const newSet = new Set(updated[qs.type]);
        newSet.add(qsInd); // add only if correct
        updated[qs.type] = newSet;
      } else {
        const newSet = new Set(updated[qs.type]);
        newSet.delete(qsInd); // remove if incorrect
        updated[qs.type] = newSet;
      }

      return updated;
    });
    setQsInd((prev) => prev + 1);
  };

  const displayTime = () => {
    let Min = Math.floor(timeLeft / 60);
    let Sec = timeLeft % 60;

    return { minutes: Min, seconds: Sec };
  };

  const submitQuiz = async () => {
    if (!candidateEmail || !candidateName) {
      toast("There was problem with the test. Please re attempt !");
      router.back();
    }

    try {
      let attemptedDuration = duration - timeLeft;
      console.log(attemptedDuration);

      let report = new Object();
      console.log(correctAnswered);

      Object.entries(totalQuestion).forEach(([key, set]) => {
        let total = set.size;
        let score = Math.floor((correctAnswered[key]?.size / total) * 100);
        console.log(score);
        report[key] = score;
      });
      console.log(report);
      const result = await axios.post("/api/quiz/submit", {
        timeTaken: attemptedDuration,
        result: report,
        candidateEmail: candidateEmail,
        candidateName: candidateName,
        quiz_id: quizInfo?.quiz_id,
      });

      if (result.data.success) {
        router.push(`/quizs/${quizInfo?.quiz_id}/completed`);
      } else {
        toast("Unable to submit the progress !");
        router.back();
      }
      console.log(totalQuestion);
    } catch (error) {
      console.log(error);
      toast(error.message);
      router.back();
    }
  };

  return (
    <div className="select-none flex flex-col min-h-screen px-20  mt-16 md:px-28 lg:px-43 xl:px-52 border-gray-200 rouded-xl w-full">
      <div className="bg-white shadow-xl border flex flex-col items-center lg:flex-row lg:items-center lg:justify-between rounded-2xl p-4 lg:px-6 gap-6 lg:gap-2">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-700">
            Your Quiz is Now Live
          </h1>
          <p className="text-gray-500 text-sm">
            Answer all questions carefully. Your progress will be auto-saved.
          </p>
          <p className="text-gray-500 text-sm">Timer is ticking ⏳</p>
        </div>

        <div className="flex items-center text-xl font-bold">
          <span className="border px-3 py-2 flex flex-row rounded-l-2xl text-indigo-700">
            <Timer className="animate-bounce mx-2" />
            Time Remaining:
          </span>
          <h1 className="border px-3 py-2">{displayTime().minutes} m</h1>
          <h1 className="border border-gray-300 bg-white px-3 py-2 rounded-r-2xl animate-pulse">
            {displayTime().seconds} s
          </h1>
        </div>

        <AlertDialog>
          <AlertDialogTrigger className="w-full lg:w-1/6 bg-green-600 cursor-pointer px-2 py-2 text-white rounded-lg hover:bg-green-500">
            Submit Quiz
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure to submit the quiz?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Once you submit you cannot re
                attempt the quiz and your current will be your final progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-red-600 cursor-pointer hover:text-red-500 border border-red-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  className="bg-green-600 cursor-pointer text-white rounded-lg hover:bg-green-500"
                  onClick={submitQuiz}
                >
                  Submit
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full">
        <RenderQuizQuestion
          question={questionList[qsInd]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          clearAnswer={clearAnswer}
          qsInd={qsInd}
        />
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
        {/* <Button
          onClick={() => {
            console.log(correctAnswered);
            console.log(totalQuestion);
          }}
        >
          Cl
        </Button> */}
        <Button
          onClick={() => {
            handleNextClick();
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
