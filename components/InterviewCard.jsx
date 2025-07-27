import moment from "moment";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import { toast } from "sonner";

const InterviewCard = ({ interview, viewDetail = false }) => {
  const copyLink = () => {
    const url =
      process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
    navigator.clipboard.writeText(url);
    toast("Link Copied !");
  };
  const sendLink = (email) => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;
    const subject = encodeURIComponent("AI Recruiter Interview Link");
    const body = encodeURIComponent(`Interview Link: ${url}`);

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2>{moment(interview?.created_at).format("DD MMM yyy")} </h2>
      </div>
      <h2 className="font-bold mt-3 text-lg">{interview?.jobPosition} </h2>
      <div className="flex justify-between text-gray-500">
        <h2 className="mt-2">{interview?.duration} </h2>
        <h1 className="text-green-700">
          {interview["interview-feedback"]?.length} Candidates{" "}
        </h1>
      </div>
      {!viewDetail ? (
        <div className="flex justify-between gap-3 mt-3">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => copyLink()}
          >
            <Copy /> Copy Link{" "}
          </Button>
          <Button className="cursor-pointer" onClick={() => sendLink()}>
            <Send /> Send Link{" "}
          </Button>
        </div>
      ) : (
        <Button variant="outline" className="mt-3 w-full">
          View Details <ArrowRight className="h-4" />
        </Button>
      )}
    </div>
  );
};

export default InterviewCard;
