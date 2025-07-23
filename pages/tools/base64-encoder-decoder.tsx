import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      let result = "";
      if (mode === "encode") {
        result = btoa(unescape(encodeURIComponent(input)));
      } else {
        result = decodeURIComponent(escape(atob(input)));
      }
      setOutput(result);
      setError("");
    } catch (err) {
      setError("⚠️ Invalid input for Base64 " + mode);
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleExample = () => {
    const example = mode === "encode" ? "Hello, Base64!" : "SGVsbG8sIEJhc2U2NCE=";
    setInput(example);
    setOutput("");
    setError("");
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `base64-${mode}.txt`;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>Base64 Encoder / Decoder - Free Online Tool</title>
        <meta
          name="description"
          content="Encode or decode Base64 strings easily with this free online Base64 tool. Supports both modes in a single page. Fast, secure, and privacy-friendly."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Easily encode or decode Base64 strings. Use the toggle to switch modes,
        paste your text, and click Convert. You can also copy or download the result.
      </p>

      <div className="mb-4 flex gap-3">
        <label className="font-medium">Mode:</label>
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded ${
            mode === "encode"
              ? "bg-green-600 text-white"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Decode
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${mode === "encode" ? "text" : "Base64"} here...`}
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
          <label className="font-semibold mb-2">Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
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
              <button
                onClick={handleDownload}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Download
              </button>
            </div>
          )}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
