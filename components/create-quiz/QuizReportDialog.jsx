"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Progress } from "../ui/progress";

const QuizReportDialog = ({ candidate }) => {
  const getOverallScore = (report) => {
    let score = 0,
      total = 0;
    Object.entries(report).forEach(([key, val]) => {
      total += 100;
      score += val;
    });

    return Math.floor((score / total) * 100);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary cursor-pointer hover:text-blue-600"
          >
            View Report
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Report </DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg">
                  <div className="flex items-center gap-5">
                    <h2 className="bg-primary p-3 px-4.5 font-bold text-white  rounded-full">
                      {candidate?.candidateName[0]?.toUpperCase()}{" "}
                    </h2>
                    <div>
                      <h2> {candidate?.candidateName} </h2>
                      <h2 className="text-sm text-gray-500">
                        {candidate?.candidateEmail}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <h2 className="text-primary text-2xl font-bold">
                      {getOverallScore(candidate?.report)}
                    </h2>
                    <h2>/100</h2>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="font-bold">Skills Assessment</h2>
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {Object.entries(candidate?.report).map(
                      ([skill, val], index) => (
                        <div key={index}>
                          <h2 className="flex justify-between">
                            {skill} Skills :<span>{val} /100</span>{" "}
                          </h2>
                          <Progress className={`mt-2 `} value={val} />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Button
                  className={` mt-5 bg-green-500 cursor-pointer hover:bg-green-600
                  }`}
                >
                  Send Msg{" "}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizReportDialog;
