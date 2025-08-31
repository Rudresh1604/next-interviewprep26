import JobDetailsContainer from "@/components/JobDetailsContainer";
import { Calendar, CircleQuestionMark, Clock, Tag } from "lucide-react";
import moment from "moment";
import React from "react";

const InterviewDetailsContainer = ({ interviewDetail }) => {
  console.log(interviewDetail);

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <JobDetailsContainer job={interviewDetail} />
      <div className="mt-5">
        <h2 className="font-bold text-xl grid grid-cols-2">
          Interview Questions
        </h2>
        {interviewDetail?.questionList?.map((question, index) => (
          <div
            className="text-sm text-gray-500 mt-3 flex items-center w-full gap-2 mb-2"
            key={index}
          >
            <CircleQuestionMark className="bg-primary w-4 h-2 md:h-8 md:w-8 rounded-full text-white" />
            {question.question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewDetailsContainer;
