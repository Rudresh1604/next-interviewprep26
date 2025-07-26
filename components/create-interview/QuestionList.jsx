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

const QuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const generateQuestionList = async () => {
    setLoading(true);
    console.log(loading);

    try {
      // const result = await axios.post("/api/ai-model", { ...formData });
      // console.log(result.data);
      // console.log(result.data.data.interviewQuestions);
      // setQuestionList(result?.data?.data?.interviewQuestions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast("Server error, Try again!");
    }
  };
  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    setSaveLoading(false);
    onCreateLink(interview_id);
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
          <QuestionListContainer questionList={questionList} />
        )}
      </div>
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
};

export default QuestionList;
