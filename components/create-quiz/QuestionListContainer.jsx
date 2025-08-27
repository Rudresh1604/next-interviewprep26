import { Trash } from "lucide-react";
import React from "react";

const QuestionListContainer = ({ questionList, handleQuestionDelete }) => {
  return (
    <div className="p-5 border border-gray-300 rounded-xl bg-white">
      {questionList?.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-xl bg-gray-50 mb-3 border-gray-200"
        >
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold">{item.question} </h2>
            <span
              className="text-red-500 border cursor-pointer border-gray-200 rounded-full p-2 hover:bg-gray-100"
              onClick={() => handleQuestionDelete(item?.id)}
            >
              <Trash />
            </span>
          </div>
          <h2 className="text-sm text-primary">{item?.type} </h2>

          {item?.options?.map((option, index) => (
            <div
              key={index}
              className="w-full p-1 border my-2 rounded-xl flex items-center"
            >
              <span className="bg-primary h-[31px] w-[30px] p-2 mx-2 flex items-center rounded-full">
                {option?.id.toUpperCase()}{" "}
              </span>
              <h1>{option?.text}</h1>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionListContainer;
