import VideoRender from "@/components/meetings/interviewer/VideoRender";
import React from "react";

const page = () => {
  return (
    <div className="w-full my-5 px-3 lg:px-5">
      Sample
      <div className="w-full p-3 border-gray-300 border-2 rounded-xl">
        <VideoRender />
      </div>
    </div>
  );
};

export default page;
