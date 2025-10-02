"use client";

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
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join("");
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
        <title>
          Text Case Converter Online | Convert to camelCase, snake_case & More
        </title>
        <meta
          name="description"
          content="Convert text to various cases like camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE online. Developer-friendly case converter tool with instant results."
        />
        <meta
          name="keywords"
          content="Text Case Converter, Convert to camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, lowercase, CONSTANT_CASE, developer tools"
        />
        <meta name="author" content="DevTools by Sachin" />
        <meta property="og:title" content="Text Case Converter Online" />
        <meta
          property="og:description"
          content="Convert your text to camelCase, PascalCase, snake_case, and more. A developer-friendly online text case converter."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourdomain.com/text-case-converter"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Text Case Converter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Quickly convert text into different developer-friendly formats such as
        UPPERCASE , lowercase, camelCase, PascalCase, snake_case, kebab-case,
        and CONSTANT_CASE.
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

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">
          Why Use a Text Case Converter?
        </h2>
        <p className="text-gray-300 mb-4">
          Developers often need to convert variable names and strings between
          different cases for consistency in codebases. Our text case converter
          helps you transform your input into:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>
            <strong>camelCase</strong> – commonly used in JavaScript variables
          </li>
          <li>
            <strong>PascalCase</strong> – ideal for class names
          </li>
          <li>
            <strong>snake_case</strong> – popular in Python and config files
          </li>
          <li>
            <strong>kebab-case</strong> – used in URLs and CSS class names
          </li>
          <li>
            <strong>UPPERCASE / lowercase</strong> – basic capitalization
            adjustments
          </li>
          <li>
            <strong>CONSTANT_CASE</strong> – often used for constants
          </li>
        </ul>

        <h3 className="font-semibold text-white mb-2">
          Frequently Asked Questions
        </h3>
        <div className="text-gray-300 space-y-4">
          <div>
            <strong>What is camelCase?</strong>
            <p>
              camelCase starts with a lowercase letter and capitalizes the first
              letter of each subsequent word. Example:{" "}
              <code>thisIsCamelCase</code>
            </p>
          </div>
          <div>
            <strong>How do I convert snake_case to PascalCase?</strong>
            <p>
              Just paste your <code>snake_case</code> string and select{" "}
              <code>PascalCase</code> from the dropdown. Our tool will handle
              the transformation instantly.
            </p>
          </div>
          <div>
            <strong>Is this text converter free?</strong>
            <p>
              Yes, this tool is completely free to use with no signup required.
            </p>
          </div>
          <div>
            <p>
              You may also like our <a href="/tools/json-formatter" className="text-blue-500 hover:underline">JSON Formatter</a> or <a href="/tools/regex-tester" className="text-blue-500 hover:underline">Regex Tester</a>.
            </p>
        </div>
        </div>
      </section>
    </ToolLayout>
  );
}
