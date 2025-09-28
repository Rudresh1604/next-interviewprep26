"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/services/supabaseClient";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const CreateMeeting = ({ user }) => {
  const [meetingTitle, setMeetingTitle] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [linkId, setLinkId] = useState(null);

  const url = process.env.NEXT_PUBLIC_HOST_URL + "/meetings/";

  const onCopyLink = async () => {
    let candidate = url + "candidate/" + linkId;
    await navigator.clipboard.writeText(candidate);
    toast("Link copied !");
  };

  const getMeetingLink = async () => {
    try {
      setLoading(true);
      console.log(user);
      const meeting_id = uuidv4();

      const { data, error } = await supabase.from("Meetings").insert([
        {
          meetingTitle: meetingTitle,
          meetingTime: meetingTime,
          userId: user?.id,
          meeting_id: meeting_id,
        },
      ]);
      console.log(data);

      console.log(error);
      toast("Meeting created successfully !");
      setLinkId(meeting_id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">+ Create New Meetings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create an instant meeting</DialogTitle>
            <span className="border"></span>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3 border border-gray-300 p-2 rounded ">
              <Label htmlFor="name-1 text-xl">Meeting Title :</Label>
              <Input
                id="name-1"
                name="name"
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Sales meeting"
              />
            </div>
            <div className="grid gap-3 border border-gray-300 p-2 rounded ">
              <Label htmlFor="time text-xl">Meeting Time :</Label>
              <Input
                id="meet time"
                name="name"
                onChange={(e) => setMeetingTime(e.target.value)}
                placeholder="10 AM"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button disabled={loading || linkId == null} onClick={onCopyLink}>
              Copy Link
            </Button>
            <Button disabled={loading} onClick={getMeetingLink}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateMeeting;
