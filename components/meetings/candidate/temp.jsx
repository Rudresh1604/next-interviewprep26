"use client";

import { Button } from "@/components/ui/button";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "@/services/Constants";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Download, Play } from "lucide-react";
import { useRef, useState } from "react";

const CodeEditor2 = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const [language, setLanguage] = useState("javascript");
  const [themes, setThemes] = useState([
    "vs-dark",
    "hc-black",
    "light",
    "dark",
    "hc-light",
  ]);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [theme, setTheme] = useState("vs-dark");

  const executeCode = async (language, sourceCode) => {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
      }
    );
    return response.data;
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      console.log(result.output.split("\n"));

      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);

    setValue(CODE_SNIPPETS[lang]);
  };
  console.log(languages);

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex flex-col gap-2 justify-between">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row  items-center gap-2">
            <h1 className="font-medium">Theme :</h1>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border rounded px-2 py-1 bg-white text-black"
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center  gap-2">
            <h1 className="font-medium">Language : </h1>
            <select
              className="text-sm px-2 py-1 border rounded"
              value={language}
              onChange={(e) => {
                onSelect(e.target.value);
              }}
            >
              {languages.map(([lang, version], index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mt-2 space-x-2 justify-between">
          <Button size="sm" variant="outline" onClick={runCode}>
            <Play className="h-4 w-4 mr-1" /> Run
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </div>
      </div>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="59vh"
        theme={theme}
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <div className="bg-gray-100 px-4 py-2 border-t text-sm">
        <div className="font-medium">Output:</div>
        <div className="mt-1 p-2 bg-white border rounded">
          {/* Output will appear here */}
          {!output && !isLoading && <>Run your code to see output</>}
          {isLoading && <>Runing your code !</>}
          {!isLoading && output && <>{output} </>}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor2;
