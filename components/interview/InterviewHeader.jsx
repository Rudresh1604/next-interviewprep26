import Image from "next/image";
import React from "react";

const InterviewHeader = () => {
  return (
    <div className="p-4 shadow-sm">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={200}
        height={50}
        className="w-[100px] h-[50px]"
      />
    </div>
  );
};

export default InterviewHeader;
