'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

function encodeHtmlEntities(str: string): string {
  return str.replace(
    /[\u00A0-\u9999<>&"'`]/gim,
    (char) => `&#${char.charCodeAt(0)};`
  );
}

function decodeHtmlEntities(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export default function HTMLEntityConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    const result =
      mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    setOutput(result);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleExample = () => {
    const example =
      mode === "encode"
        ? `<h1>This is "bold" & <em>important</em></h1>`
        : `&lt;h1&gt;This is &quot;bold&quot; &amp; &lt;em&gt;important&lt;/em&gt;&lt;/h1&gt;`;
    setInput(example);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>HTML Entities Encoder/Decoder - Converter Tools</title>
        <meta
          name="description"
          content='Encode or decode HTML entities like &lt;, &gt;, &amp;, ", &#39; instantly. Fast online tool for safe HTML string conversion.'
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">
        HTML Entities Encoder / Decoder
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Safely convert between raw HTML and encoded strings. Useful for
        developers handling user-generated content or HTML in JavaScript/React.
        Select encode or decode mode, and paste your text below.
      </p>

      <div className="mb-4">
        <label className="mr-4 font-medium">Mode:</label>
        <select
          className="bg-gradient-to-r from-white to-gray-200 text-gray-900 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
          value={mode}
          onChange={(e) => setMode(e.target.value as "encode" | "decode")}
        >
          <option value="encode">Encode HTML Entities</option>
          <option value="decode">Decode HTML Entities</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Input</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-gray-200 rounded text-sm text-white"
            placeholder="Paste your text or HTML here..."
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
          <label className="font-semibold mb-2">Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            placeholder="Output will appear here..."
            value={output}
            readOnly
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
