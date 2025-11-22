"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";

const CreateMeeting = ({ user }) => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTime, setMeetingTime] = useState("10:30:00");
  const [loading, setLoading] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(undefined);

  const calendarRef = useRef(null);

  const url = process.env.NEXT_PUBLIC_HOST_URL + "meetings/";

  const onCopyLink = async () => {
    let candidate = url + "candidate/" + linkId;
    await navigator.clipboard.writeText(candidate);
    toast("Link copied !");
  };

  const getMeetingLink = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const meeting_id = uuidv4();

      // example: insert to supabase if needed
      const { data, error } = await supabase.from("Meetings").insert([
        {
          meetingTitle,
          userId: user?.id,
          meeting_id: meeting_id,
          meetingDateTime: buildISO(date, meetingTime),
        },
      ]);

      setLinkId(meeting_id);
      toast("Meeting created successfully !");
    } catch (err) {
      console.error(err);
      toast(err?.message || "Error creating meeting");
    } finally {
      setLoading(false);
    }
  };

  // helper to build ISO datetime from date and time string "HH:MM:SS"
  const buildISO = (d, timeStr) => {
    if (!d || !timeStr) return null;
    const [h = 0, m = 0, s = 0] = timeStr.split(":").map(Number);
    const out = new Date(d);
    out.setHours(h, m, s || 0, 0);
    return out.toISOString();
  };

  // Defensive handler for DialogContent "outside" events:
  const handlePointerDownOutside = (ev) => {
    // if the pointerdown came from inside calendarRef, prevent Dialog from closing
    try {
      if (calendarRef.current && calendarRef.current.contains(ev.target)) {
        ev.preventDefault();
      }
    } catch (err) {
      // ignore
    }
  };

  const handleInteractOutside = (ev) => {
    try {
      if (calendarRef.current && calendarRef.current.contains(ev.target)) {
        ev.preventDefault();
      }
    } catch (err) {
      // ignore
    }
  };

  return (
    <Dialog>
      <form onSubmit={getMeetingLink}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">+ Create New Meetings</Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[600px]" // wider so calendar fits
          onPointerDownOutside={handlePointerDownOutside}
          onInteractOutside={handleInteractOutside}
        >
          <DialogHeader>
            <DialogTitle>Create an instant meeting</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-3 border border-gray-300 p-2 rounded ">
              <Label htmlFor="name-1">Meeting Title :</Label>
              <Input
                id="name-1"
                name="name"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Sales meeting"
              />
            </div>

            <div className="grid gap-3 border border-gray-300 p-2 rounded ">
              <div className="flex gap-4 items-start">
                {/* Date picker (inline calendar) */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date-picker" className="px-1">
                    Date
                  </Label>

                  <div className="relative">
                    <Button
                      variant="outline"
                      id="date-picker"
                      onClick={() => setCalendarOpen((v) => !v)}
                      className="w-48 justify-between font-normal"
                    >
                      {date
                        ? date.toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>

                    {calendarOpen && (
                      <div
                        ref={calendarRef}
                        // stop propagation as a second guard
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute z-50 mt-2 bg-white rounded shadow-lg p-2"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            if (selectedDate) {
                              setDate(selectedDate);
                              // keep this behavior - close after select
                              setCalendarOpen(false);
                            }
                          }}
                          // show dropdown caption for month/year
                          captionLayout="dropdown"
                          fromYear={2000}
                          toYear={2030}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Time picker */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="time-picker" className="px-1">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    placeholder="10:30:00"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              disabled={loading || !linkId}
              onClick={onCopyLink}
            >
              Copy Link
            </Button>
            <Button type="button" disabled={loading || !linkId}>
              <Link
                href={`/meetings/interviewer/${linkId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Link
              </Link>
            </Button>

            <Button onClick={() => getMeetingLink()} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateMeeting;
