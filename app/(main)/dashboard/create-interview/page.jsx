"use client";
import FormContainer from "@/components/create-interview/FormContainer";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };
  return (
    <div className="mt-10 px-10 lg:px-44 md:px-24 xl:px-56">
      <div className="flex items-center gap-5">
        <ArrowLeft
          className="text-xl cursor-pointer text-gray-500 h-8 w-10"
          onClick={() => router.back()}
        />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress className="my-5" value={step * 33.33} />
      <FormContainer onHandleInputChange={onHandleInputChange} />
    </div>
  );
};

export default CreateInterview;
