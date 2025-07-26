import React from "react";

const QuestionListContainer = ({ questionList }) => {
  return (
    <div className="p-5 border border-gray-300 rounded-xl bg-white">
      {questionList?.map((item, index) => (
        <div key={index} className="p-3 border rounded-xl mb-3 border-gray-200">
          <h2 className="font-bold">{item.question} </h2>
          <h2 className="text-sm text-primary">{item?.type} </h2>
        </div>
      ))}
    </div>
  );
};

export default QuestionListContainer;
