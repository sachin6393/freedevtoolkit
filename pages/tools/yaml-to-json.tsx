'use client';

import React, { useState } from "react";
import Head from "next/head";
import {load} from "js-yaml";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function YamlToJsonConverter() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      const parsed = load(yamlInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setError("");
    } catch (e: any) {
      setError("Invalid YAML format");
      setJsonOutput("");
    }
  };

  const handleReset = () => {
    setYamlInput("");
    setJsonOutput("");
    setError("");
  };

  const handleExample = () => {
    const example = `
name: Peter Parker
age: 25
skills:
  - React
  - TypeScript
  - YAML
    `.trim();
    setYamlInput(example);
    setError("");
    setJsonOutput("");
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.json";
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>YAML to JSON Converter Online - Converter Tools</title>
        <meta
          name="description"
          content="Convert YAML to JSON instantly online. Fast, privacy-friendly YAML to JSON converter with error handling and copy/download options.  free yaml to json converter | no login"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">YAML to JSON Converter</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
            Convert YAML data to JSON format instantly. Paste your YAML code below
            and click "Convert" to see the JSON output.
            You can also copy the output, or download it as a
            JSON file.
        </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">YAML Input</label>
          <textarea
           className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder="Paste your YAML here..."
          />
          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={handleConvert}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Convert
            </button>       
            <button
              onClick={handleExample}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load Example
            </button>
              <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
           {error && <p className="text-red-500 mt-3">⚠️ {error}</p>}
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">JSON Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            value={jsonOutput}
            readOnly
            placeholder="Converted JSON will appear here..."
          />
          {jsonOutput && (
          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={handleCopy}        
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Download
            </button>
          </div>
          )}
          {/* {error && <p className="text-red-500 mt-3">⚠️ {error}</p>} */}
        </div>
      </div>
       <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
          [Ad Placeholder: Insert AdSense Code Here]
    </div>
    </ToolLayout>
  );
}
