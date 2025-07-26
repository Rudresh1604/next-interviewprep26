import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const InterviewLink = ({ interviewId, formData }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
  const GetInterviewUrl = () => {
    console.log(url);
    return url;
  };
  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link copied !");
  };
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/check.png"}
        width={200}
        height={200}
        alt="check"
        className="w-[50px] h-[50px]"
      />
      <h2 className="text-lg mt-4 font-bold">Your AI interview is Ready!</h2>
      <p className="mt-3">
        Share this link with your candidates to start the interview process{" "}
      </p>
      <div className="w-full p-7 rounded-xl bg-white mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-100 rounded-4xl">
            Valid for 30 mintues
          </h2>
        </div>
        <div className="mt-3 flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={() => onCopyLink()} className="cursor-pointer">
            <Copy /> Copy Link{" "}
          </Button>
        </div>
        <hr className="my-7" />
        <div className="flex items-center gap-5">
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex gap-2 items-center">
            <List className="h-4 w-4" /> 10 Questions
          </h2>
        </div>
      </div>

      <div className="mt-7 bg-white p-5 w-full rounded-lg">
        <h2 className="font-bold">Share Via</h2>
        <div className="flex gap-7 mt-3">
          <Button variant={"outline"}>
            {" "}
            <Mail /> Email
          </Button>
          <Button variant={"outline"}>
            {" "}
            <Mail /> Slack
          </Button>
          <Button variant={"outline"}>
            {" "}
            <Mail /> Whatsapp
          </Button>
        </div>
      </div>
      <div className="flex w-full mt-7 justify-between gap-5">
        <Link href={"/dashboard"}>
          <Button className="cursor-pointer" variant={"outline"}>
            <ArrowLeft /> Back to Dashboard{" "}
          </Button>
        </Link>
        <Link href={"/dashboard/create-interview"}>
          <Button className="cursor-pointer">
            <Plus /> Create New Interview{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
