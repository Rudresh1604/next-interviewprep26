"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader2, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

const QuizQuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questionList, setQuestionList] = useState([
    {
      id: 1,
      question:
        "Which of the following is NOT a core principle of RESTful API design?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "Statelessness",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Client-Server Architecture",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Layered System",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Session Affinity",
          isCorrect: true,
        },
      ],
    },
    {
      id: 2,
      question:
        "Given the following JavaScript code: `const arr = [1, 2, 3]; arr.map(num => num * 2); console.log(arr);` What will be printed to the console?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "[2, 4, 6]",
          isCorrect: false,
        },
        {
          id: "b",
          text: "[1, 2, 3]",
          isCorrect: true,
        },
        {
          id: "c",
          text: "undefined",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Error",
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      question:
        "Describe a situation where you had to debug a complex issue in either the front-end or back-end. What steps did you take to identify and resolve the problem?",
      type: "Problem Solving",
      options: [],
    },
    {
      id: 4,
      question:
        "What is the purpose of using a virtual DOM in front-end frameworks like React or Vue.js?",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "To directly manipulate the browser's DOM for faster rendering.",
          isCorrect: false,
        },
        {
          id: "b",
          text: "To reduce the number of direct DOM manipulations, improving performance.",
          isCorrect: true,
        },
        {
          id: "c",
          text: "To simplify CSS styling.",
          isCorrect: false,
        },
        {
          id: "d",
          text: "To handle server-side rendering.",
          isCorrect: false,
        },
      ],
    },
    {
      id: 5,
      question: "Explain the difference between `==` and `===` in JavaScript.",
      type: "Technical",
      options: [
        {
          id: "a",
          text: "`==` compares values without type conversion, while `===` compares values with type conversion.",
          isCorrect: false,
        },
        {
          id: "b",
          text: "`==` compares values with type conversion, while `===` compares values without type conversion.",
          isCorrect: true,
        },
        {
          id: "c",
          text: "They are identical and can be used interchangeably.",
          isCorrect: false,
        },
        {
          id: "d",
          text: "`==` is used for object comparison, while `===` is used for primitive type comparison.",
          isCorrect: false,
        },
      ],
    },
  ]);
  const { user } = useUser();
  const generateQuestionList = async () => {
    setLoading(true);
    console.log(loading);

    try {
      //   const result = await axios.post("/api/ai-quiz", { ...formData });
      //   console.log(result.data);
      //   console.log(result.data.data.quizQuestions);
      //   setQuestionList(result?.data?.data?.quizQuestions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast("Server error, Try again!");
    }
  };
  const onFinish = async () => {
    setSaveLoading(true);
    const quiz_id = uuidv4();

    const { data, error } = await supabase
      .from("Quizs")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          quiz_id: quiz_id,
        },
      ])
      .select();

    setSaveLoading(false);
    onCreateLink(quiz_id);
  };
  const handleQuestionDelete = (deleteQsId) => {
    if (questionList?.length == 1) {
      toast("Atleast One Question should be present !");
      return;
    }
    setQuestionList((prev) => prev.filter((q) => q.id !== deleteQsId));
  };

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  return (
    <div>
      {loading && (
        <div className="flex p-5 rounded-xl gap-5 bg-blue-50 border border-primary items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions.
            </p>
          </div>
        </div>
      )}
      <div>
        <h2 className="font-bold text-lg mb-5">
          Generated Interview Questions
        </h2>

        {questionList?.length > 0 && (
          <QuestionListContainer
            questionList={questionList}
            handleQuestionDelete={handleQuestionDelete}
          />
        )}
      </div>
      <div className="flex justify-end mt-10 ">
        <Button
          onClick={() => onFinish()}
          className="cursor-pointer"
          disabled={saveLoading || questionList?.length == 0}
        >
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Quiz Link & Finish
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestionList;
