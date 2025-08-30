import React, { useState } from "react";

const RenderQuizQuestion = ({
  question,
  selectedOption,
  setSelectedOption,
  clearAnswer,
  qsInd,
}) => {
  // console.log("Question", question);
  const handleSelectedOption = (option) => {
    if (selectedOption == option) {
      clearAnswer(question?.type, qsInd);
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  return (
    <div className="border border-gray-200 shadow-2xl p-5 md:p-2 text-gray-700 rounded-2xl w-full my-5 bg-white">
      <h1 className="text-3xl font-medium mx-2 mt-4">
        {"Q." + question?.id + "   " + question?.question}
      </h1>

      <div className="mt-5 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-2 py-5 lg:gap-5 text-2xl font-light ">
        {question?.options?.map((option, index) => (
          <div
            key={index}
            className={`w-full border shadow-xl rounded-2xl p-4 my-2 flex flex-row items-center bg-gray-50 gap-4 hover:bg-gray-100 cursor-pointer transition 
  ${
    option === selectedOption
      ? "bg-green-100 border-green-400 shadow-sm hover:bg-green-200"
      : "bg-white hover:bg-gray-50"
  }`}
            onClick={() => handleSelectedOption(option)}
          >
            <h1 className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
              {option?.id?.toUpperCase()}{" "}
            </h1>
            <h1>{option?.text} </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderQuizQuestion;
