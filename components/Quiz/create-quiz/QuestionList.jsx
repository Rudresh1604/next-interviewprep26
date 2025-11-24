"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader2, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

const QuizQuestionList = ({ formData, onCreateLink, setQuestionLength }) => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const generateQuestionList = async () => {
    setLoading(true);
    console.log(loading);

    try {
      toast(
        "This feature uses private API credentials and is disabled in the public demo."
      );
      return;
      const result = await axios.post("/api/ai-quiz", { ...formData });
      console.log(result.data);
      console.log(result.data.data.quizQuestions);
      setQuestionList(result?.data?.data?.quizQuestions);
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
    setQuestionLength(questionList?.length);
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
          <div className="border border-gray-300 rounded-xl p-5 bg-white">
            <QuestionListContainer
              questionList={questionList}
              handleQuestionDelete={handleQuestionDelete}
            />
          </div>
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
