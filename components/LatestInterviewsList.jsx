"use client";
import { Video } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

const LatestInterviewsList = () => {
  const [interviewList, setInterviewList] = useState([]);
  return (
    <div className="my-5">
      <h2 className="text-xl font-bold">Previously Created Interviews</h2>
      <div className="w-full mt-5 bg-white rounded-2xl border border-gray-200">
        {interviewList.length == 0 && (
          <div className="p-5 flex flex-col justify-center items-center gap-3">
            <Video className="p-3 text-primary cursor-pointer bg-blue-50 rounded-full h-12 w-12" />
            <h2>You don`t have any interview created!</h2>
            <Button>+ Create New Interview</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestInterviewsList;
