import { Calendar, CircleQuestionMark, Clock, Tag } from "lucide-react";
import moment from "moment";
import React from "react";

const InterviewDetailsContainer = ({ interviewDetail }) => {
  console.log(interviewDetail);

  return (
    <div className=" p-5 bg-white rounded-lg mt-5">
      <h2 className="font-bold text-2xl">{interviewDetail?.jobPosition} </h2>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-gray-500 text-sm">Duration :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Clock className="h-4 w-4" /> {interviewDetail?.duration}
          </h2>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Created On :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Calendar className="h-4 w-4" />{" "}
            {moment(interviewDetail?.created_at).format("MMM DD, yyy")}
          </h2>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Type :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Tag className="h-4 w-4" />{" "}
            {JSON.parse(interviewDetail?.type)?.join(" + ")}
          </h2>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-xl mt-2">Job Description </h2>
        <p className="text-sm text-gray-500 mt-2">
          {interviewDetail?.jobDescription?.slice(0, 2000)}
        </p>
      </div>

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
