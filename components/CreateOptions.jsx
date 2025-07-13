"use client";
import { PhoneCall, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateOptions = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white border border-gray-200  rounded-lg p-5">
        <VideoIcon
          onClick={() => {
            router.push("/dashboard/create-interview");
          }}
          className="p-3 text-primary bg-blue-50 cursor-pointer rounded-full h-10 w-12"
        />
        <h2 className="py-1 font-bold">Create New Interview</h2>
        <p className="py-1 text-gray-500">
          Create AI Interviews and schedule them with Candidates
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <PhoneCall className="p-3 text-primary bg-blue-50 rounded-full h-12 w-12" />
        <h2 className="py-1 font-bold">Create Phone Screening Call</h2>
        <p className="py-1 text-gray-500">
          Schedule phone screening call with candidates
        </p>
      </div>
    </div>
  );
};

export default CreateOptions;
