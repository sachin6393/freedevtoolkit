import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleToggle = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setOutput("");
  };

  const handleConvert = () => {
    try {
      const result =
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input);
      setOutput(result);
    } catch (e: any) {
      setOutput("❌ Invalid input for decoding.");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleExample = () => {
    const example =
      mode === "encode"
        ? "Hello world! Encode this URL safely."
        : "Hello%20world!%20Encode%20this%20URL%20safely.";
    setInput(example);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>URL Encoder & Decoder Online - Converter Tools</title>
        <meta
          name="description"
          content="Encode or decode URLs instantly. Fast, secure, privacy-friendly tool to encode or decode URL strings online. No login required."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">URL Encoder / Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Easily encode or decode URL strings using this free online tool. Choose
        a mode, paste your input, and get the result instantly. No data is
        stored or sent to servers.
      </p>

      
<div className="mb-4 flex items-center gap-3">
  <span className="font-semibold">Mode:</span>
  <div
    className="relative inline-flex items-center cursor-pointer select-none"
    onClick={handleToggle}
    tabIndex={0}
    role="switch"
    aria-checked={mode === "encode"}
  >
    <span
      className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out
        ${mode === "encode"
          ? "bg-gradient-to-r from-green-400 to-green-700 shadow-green-500/40 shadow-md"
          : "bg-gradient-to-r from-pink-500 to-purple-700 shadow-purple-500/40 shadow-md"
        }`}
    >
      <span
        className={`bg-white w-5 h-5 rounded-full shadow-lg transform duration-300 ease-in-out
          ${mode === "encode" ? "translate-x-7" : "translate-x-0"}`}
      />
    </span>
    <span
      className={`ml-3 text-base font-bold transition-colors duration-300
        ${mode === "encode" ? "text-green-300" : "text-pink-300"}`}
    >
      {mode === "encode" ? "Encode" : "Decode"}
    </span>
  </div>
</div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">
            {mode === "encode" ? "Text to Encode" : "URL to Decode"}
          </label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            placeholder="Paste your input here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Result</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border rounded text-sm text-green-300"
            value={output}
            readOnly
            placeholder="Converted result will appear here..."
          />
          {output && (
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
