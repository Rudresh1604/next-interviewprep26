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
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const CandidateFeedbackDialog = ({ candidate }) => {
  console.log(candidate);

  const feedback = candidate?.feedback;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg">
                <div className="flex items-center gap-5">
                  <h2 className="bg-primary p-3 px-4.5 font-bold text-white  rounded-full">
                    {candidate?.userName[0]}{" "}
                  </h2>
                  <div>
                    <h2> {candidate?.userName} </h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <h2 className="text-primary text-2xl font-bold">6</h2>
                  <h2>/10</h2>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Skills Assessment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Techincal Skills{" "}
                      <span>{feedback?.rating?.technicalSkills} /10</span>{" "}
                    </h2>
                    <Progress
                      className="mt-1"
                      value={feedback?.rating?.technicalSkills * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10 </span>{" "}
                    </h2>
                    <Progress
                      className="mt-1"
                      value={feedback?.rating?.communication * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>{" "}
                    </h2>
                    <Progress
                      className="mt-1"
                      value={feedback?.rating?.problemSolving * 10}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{feedback?.rating?.experience}/10</span>{" "}
                    </h2>
                    <Progress
                      className="mt-1"
                      value={feedback?.rating?.experience * 10}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-secondary my-3 rounded-lg">
                  {feedback?.summary}
                </div>
              </div>
              <div
                className={`rounded-md flex-col md:flex-row lg:flex-row justify-between items-center p-5 ${
                  feedback?.recommendation == "No"
                    ? "bg-red-200"
                    : "bg-green-200"
                }`}
              >
                <div>
                  <h2
                    className={` font-bold ${
                      feedback?.recommendation == "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    Recommendation Msg:
                  </h2>
                  <p
                    className={`mt-2 ${
                      feedback?.recommendation == "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    {feedback?.recommendationMsg}{" "}
                  </p>
                </div>
                <Button
                  className={` mt-3 ${
                    feedback?.recommendation == "No"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  Send Msg{" "}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateFeedbackDialog;
