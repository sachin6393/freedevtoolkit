import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

type CaseType =
  | "lowercase"
  | "UPPERCASE"
  | "camelCase"
  | "PascalCase"
  | "snake_case"
  | "kebab-case"
  | "CONSTANT_CASE";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("UPPERCASE");

  const convertText = (text: string, caseType: CaseType): string => {
    const words = text
      .trim()
      .replace(/[_\-]+/g, " ") // normalize existing snake/kebab
      .replace(/([a-z])([A-Z])/g, "$1 $2") // handle camelCase and PascalCase
      .split(/\s+/) // split on space
      .map((w) => w.toLowerCase());

    switch (caseType) {
      case "lowercase":
        return text.toLowerCase();
      case "UPPERCASE":
        return text.toUpperCase();
      case "camelCase":
        return (
          words[0] +
          words
            .slice(1)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join("")
        );
      case "PascalCase":
        return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
      case "snake_case":
        return words.join("_");
      case "kebab-case":
        return words.join("-");
      case "CONSTANT_CASE":
        return words.join("_").toUpperCase();
      default:
        return text;
    }
  };

  const handleConvert = () => {
    const converted = convertText(inputText, selectedCase);
    setOutputText(converted);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>Text Case Converter Online - Developer Friendly Tool</title>
        <meta
          name="description"
          content="Convert text to camelCase, PascalCase, snake_case, CONSTANT_CASE, and more. Online case converter tool for developers with fast and accurate results."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Text Case Converter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Quickly convert text into different developer-friendly formats such as camelCase, PascalCase, snake_case, CONSTANT_CASE, and more.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Input Text</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border rounded text-white text-sm"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <label className="font-medium text-sm text-white">
              Choose Case:
            </label>
            <select
              className="bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded"
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value as CaseType)}
            >
               
              <option value="UPPERCASE">UPPERCASE</option>
               <option value="lowercase">lowercase</option>
              <option value="camelCase">camelCase</option>
              <option value="PascalCase">PascalCase</option>
              <option value="snake_case">snake_case</option>
              <option value="kebab-case">kebab-case</option>
              <option value="CONSTANT_CASE">CONSTANT_CASE</option>
             
            </select>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={handleConvert}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Convert
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Converted Output</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border rounded text-green-300 text-sm"
            value={outputText}
            readOnly
            placeholder="Converted text will appear here..."
          />
          {outputText && (
            <div className="mt-3 flex gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
