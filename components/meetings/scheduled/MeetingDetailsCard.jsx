"use client";
import { Button } from "@/components/ui/button";
import { formatMeetingDateTime } from "@/lib/utils";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MeetingDetailsCard = ({ meeting }) => {
  return (
    <div className="bg-white flex flex-col px-4 py-3 mx-3 border rounded-lg border-gray-200">
      <div className="flex mb-2 flex-row justify-between items-center">
        <div className="bg-blue-600  py-4 px-4 max-sm:py-2 max-sm:px-2 rounded-full"></div>
        <h1 className="text-xl mr-2 md:text-2xl my-1 md:my-2 font-medium">
          {meeting?.meetingTitle}{" "}
        </h1>
      </div>
      <div className="flex flex-row max-sm:flex-col mt-4 justify-between items-center ">
        <div className="flex flex-col">
          <h1>
            Date : {formatMeetingDateTime(meeting?.meetingDateTime)?.date}{" "}
          </h1>
          <h1>
            Time : {formatMeetingDateTime(meeting?.meetingDateTime)?.time}{" "}
          </h1>
        </div>
        <Dialog>
          <DialogTrigger className="border font-semibold rounded-lg p-2">
            View Details
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{meeting?.title} </DialogTitle>
              <DialogDescription>
                <div className="text-xl text-black md:text-2xl font-medium">
                  Meeting Created At :{" "}
                  {formatMeetingDateTime(meeting?.created_at)?.date}{" "}
                  {"  " + formatMeetingDateTime(meeting?.created_at)?.time}
                </div>
                {meeting?.candidateNotes &&
                meeting?.candidateNotes?.length > 0 ? (
                  <div>
                    {meeting?.candidateNotes?.map((notes, index) => (
                      <div
                        key={index}
                        className="flex flex-col mt-3 md:mt-5 px-2 py-3 border border-gray-200 rounded-lg"
                      >
                        <h1 className="text-xl mb-2 text-black">
                          {" "}
                          {notes?.candidateName}{" "}
                        </h1>
                        <>{notes?.note} </>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>No Notes are present !</h1>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MeetingDetailsCard;
