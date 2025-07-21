import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedOutput, setFormattedOutput] = useState("");
  const [error, setError] = useState("");

const MAX_CHAR_LIMIT = 100000;

const handleFormat = () => {
  if (jsonInput.length > MAX_CHAR_LIMIT) {
    setError(`Input too large. Please keep it under ${MAX_CHAR_LIMIT.toLocaleString()} characters.`);
    setFormattedOutput('');
    return;
  }

  try {
    const parsed = JSON.parse(jsonInput);
    const formatted = JSON.stringify(parsed, null, 2);
    setFormattedOutput(formatted);
    setError('');
  } catch (e: any) {
    setError('Invalid JSON input');
    setFormattedOutput('');
  }
};

  const handleReset = () => {
    setJsonInput("");
    setFormattedOutput("");
    setError("");
  };

  const handleExample = () => {
    const example = `{"name":"John","age":30,"skills":["JavaScript","React"]}`;
    setJsonInput(example);
    setError("");
    setFormattedOutput("");
  };

  const handleDownload = () => {
    const blob = new Blob([formattedOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "formatted.json";
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOutput);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>JSON Formatter & Beautifier Online - Developer Tools</title>
        <meta
          name="description"
          content="Format and beautify your JSON instantly with our fast, SEO-friendly JSON formatter tool. Indent and prettify JSON for easy reading and debugging."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4">JSON Formatter / Beautifier</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Paste your minified or raw JSON and format it for readability. Ideal for developers who want clean and readable JSON data.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">JSON Input</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste your JSON here...'
          />
          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              onClick={handleFormat}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Format
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
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Formatted Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            value={formattedOutput}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />
          {formattedOutput && (
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
          {error && <p className="text-red-500 mt-3">⚠️ {error}</p>}
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
