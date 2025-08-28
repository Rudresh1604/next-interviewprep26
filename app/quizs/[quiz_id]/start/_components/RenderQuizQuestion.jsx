import React from "react";

const RenderQuizQuestion = ({ question }) => {
  console.log("Question", question);

  return (
    <div className="border border-gray-200 p-4 md:p-2 text-gray-700 w-full my-5">
      <h1 className="text-3xl font-medium">
        {"Q." + question?.id + "   " + question?.question}
      </h1>

      <div className="mt-5 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-2 py-5 lg:gap-5 text-2xl font-light ">
        {question?.options?.map((option, index) => (
          <div
            key={index}
            className="w-full border rounded-2xl p-4 my-2 flex flex-row items-center gap-4 cursor-pointer hover:bg-gray-100"
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
