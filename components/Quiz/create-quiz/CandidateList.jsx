import CandidateFeedbackDialog from "@/components/interview/scheduled/CandidateFeedbackDialog";
import moment from "moment";
import React from "react";
import QuizReportDialog from "./QuizReportDialog";

const CandidateList = ({ candidateList }) => {
  console.log(candidateList);
  const getOverallScore = (report) => {
    let score = 0,
      total = 0;
    Object.entries(report).forEach(([key, val]) => {
      total += 100;
      score += val;
    });

    return {
      obtained: Math.floor((score / total) * 100),
      total: Math.floor(total / 100),
    };
  };

  return (
    <div>
      <h2 className="font-bold my-5">
        Candidate {" ( " + candidateList?.length + " ) "}{" "}
      </h2>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="p-5 flex gap-3 items-center justify-between border shadow-lg border-gray-200 bg-white rounded-lg"
        >
          <div className="flex items-center gap-5">
            <h2 className="bg-primary p-3 px-4.5 font-bold text-white  rounded-full">
              {candidate?.candidateName[0]?.toUpperCase()}{" "}
            </h2>
            <div>
              <h2> {candidate?.candidateName} </h2>
              <h2 className="text-sm text-gray-500">
                Completed On:{" "}
                {moment(candidate?.created_at).format("MMM DD, yyy")}{" "}
              </h2>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <h2 className="text-green-500">
              {getOverallScore(candidate?.report)?.obtained} / 100
            </h2>
            <QuizReportDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
