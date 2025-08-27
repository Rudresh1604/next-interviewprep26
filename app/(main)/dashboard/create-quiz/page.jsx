"use client";
import QuizQuestionList from "@/components/create-quiz/QuestionList";
import QuizFormContainer from "@/components/create-quiz/QuizFormContainer";
import QuizLink from "@/components/create-quiz/QuizLink";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [questionLength, setQuestionLength] = useState(0);
  const [quizId, setQuizId] = useState();
  const onGoToNext = () => {
    console.log(formData);
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast("Please enter all details");
      return;
    }
    console.log("Form Data is ", formData);
    setStep(step + 1);
  };
  console.log(questionLength);

  const onCreateLink = (quiz_id) => {
    setQuizId(quiz_id);
    setStep(step + 1);
  };
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };
  return (
    <div className="mt-10 lg:px-44 md:px-24 xl:px-56">
      <div className="flex items-center gap-5">
        <ArrowLeft
          className="text-xl cursor-pointer text-gray-500 h-8 w-10"
          onClick={() => router.back()}
        />
        <h2 className="font-bold text-2xl">Create New Quiz</h2>
      </div>
      <Progress className="my-5" value={step * 33.33} />
      {step == 1 ? (
        <QuizFormContainer
          onHandleInputChange={onHandleInputChange}
          goToNext={onGoToNext}
        />
      ) : step == 2 ? (
        <QuizQuestionList
          formData={formData}
          onCreateLink={(quiz_id) => onCreateLink(quiz_id)}
          setQuestionLength={setQuestionLength}
        />
      ) : step == 3 ? (
        <QuizLink
          quizId={quizId}
          questionLength={questionLength}
          formData={formData}
        />
      ) : null}
    </div>
  );
};

export default CreateInterview;
