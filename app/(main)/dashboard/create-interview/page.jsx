"use client";
import FormContainer from "@/components/create-interview/FormContainer";
import InterviewLink from "@/components/create-interview/InterviewLink";
import QuestionList from "@/components/create-interview/QuestionList";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();
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
    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
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
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress className="my-5" value={step * 33.33} />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          goToNext={onGoToNext}
        />
      ) : step == 2 ? (
        <QuestionList
          formData={formData}
          onCreateLink={(interview_id) => onCreateLink(interview_id)}
        />
      ) : step == 3 ? (
        <InterviewLink interviewId={interviewId} formData={formData} />
      ) : null}
    </div>
  );
};

export default CreateInterview;
