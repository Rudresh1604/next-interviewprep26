import { Calendar, Clock, Tag } from "lucide-react";
import moment from "moment";
import React from "react";

const JobDetailsContainer = ({ job }) => {
  console.log(job);

  return (
    <div className="border-b-2 pb-4 lg:pb-8 border-gray-300">
      <h2 className="font-bold text-2xl">{job?.jobPosition} </h2>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-gray-500 text-sm">Duration :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Clock className="h-4 w-4" /> {job?.duration} Minutes
          </h2>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Created On :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Calendar className="h-4 w-4" />{" "}
            {moment(job?.created_at).format("MMM DD, yyy")}
          </h2>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Type :</h2>
          <h2 className="flex text-sm font-bold gap-2 items-center">
            <Tag className="h-4 w-4" /> {JSON.parse(job?.type)?.join(" + ")}
          </h2>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-xl mt-2">Job Description </h2>
        <p className="text-sm text-gray-500 mt-2">
          {job?.jobDescription?.slice(0, 2000)}
        </p>
      </div>
    </div>
  );
};

export default JobDetailsContainer;
