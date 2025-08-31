"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";

const QuizFormContainer = ({ onHandleInputChange, goToNext }) => {
  const [quizType, setQuizType] = useState([]);
  useEffect(() => {
    if (quizType) {
      onHandleInputChange("type", quizType);
    }
  }, [quizType]);
  const addquizType = (type) => {
    if (quizType.includes(type)) {
      const result = quizType.filter((item) => item != type);
      setQuizType(result);
    } else {
      setQuizType((prev) => [...prev, type]);
    }
  };
  return (
    <div className="p-5 bg-white rounded-2xl flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-500 font-medium">Job Position</h2>
        <Input
          type="text"
          placeholder="Ex. Senior Developer"
          onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-500 font-medium">Job Description</h2>
        <Textarea
          className="h-[200px]"
          placeholder="Enter the job description. "
          onChange={(e) =>
            onHandleInputChange("jobDescription", e.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-500 font-medium">Quiz Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Minutes</SelectItem>
            <SelectItem value="15">15 Minutes</SelectItem>
            <SelectItem value="30">30 Minutes</SelectItem>
            <SelectItem value="45">45 Minutes</SelectItem>
            <SelectItem value="60">60 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-500 font-medium">Quiz Type</h2>
        <div className="flex flex-wrap gap-3">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 bg-white border border-gray-200 rounded-2xl hover:bg-blue-50 cursor-pointer items-center ${
                quizType.includes(type.title) && "bg-blue-500 text-primary"
              }`}
              onClick={() => addquizType(type.title)}
            >
              <type.icon className="text-primary h-6 w-6" />
              <span>{type.title} </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end" onClick={() => goToNext()}>
        <Button className="cursor-pointer">
          Generate Question <ArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default QuizFormContainer;
