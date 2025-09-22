"use client";
import { useState } from "react";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/services/Constants";
import { Button } from "@/components/ui/button";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col items-center w-full bg-tertiary ">
      <div className="bg-gray-100 px-4 py-2 border-t text-sm">
        <div className="font-medium">Output:</div>
        <div className="mt-1 p-2 bg-white border rounded">
          {isLoading ? (
            <p className="text-sm font-mono text-gray-500">Running code...</p>
          ) : (
            output &&
            output.map((line, i) => (
              <p
                key={i}
                className={`text-sm font-mono ${isError ? "text-red-500" : ""}`}
              >
                {line}
              </p>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col items-start w-full mt-4 px-2 py-4 space-y-2"></div>
    </div>
  );
};
export default Output;
