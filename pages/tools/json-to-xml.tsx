'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function JsonToXml() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      const jsonObj = JSON.parse(jsonInput.trim());
      const xml = jsonToXml(jsonObj);
      setXmlOutput(xml);
      setError("");
    } catch (err: any) {
      setError("Invalid JSON format.");
      setXmlOutput("");
    }
  };

  const handleReset = () => {
    setJsonInput("");
    setXmlOutput("");
    setError("");
  };

  const jsonToXml = (obj: any, indent = ""): string => {
    let xml = "";

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        for (const item of obj[key]) {
          xml += `${indent}<${key}>\n${jsonToXml(item, indent + "  ")}${indent}</${key}>\n`;
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        xml += `${indent}<${key}>\n${jsonToXml(obj[key], indent + "  ")}${indent}</${key}>\n`;
      } else {
        xml += `${indent}<${key}>${escapeXml(String(obj[key]))}</${key}>\n`;
      }
    }

    return xml;
  };

  const escapeXml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const handleExample = () => {
    const example = `{
  "root": {
    "person": [
      {
        "name": "Peter Parker",
        "age": 26,
        "city": "New York"
      },
      {
        "name": "Mary Jane",
        "age": 25,
        "city": "Los Angeles"
      }
    ]
  }
}`;
    setJsonInput(example);
    setXmlOutput("");
    setError("");
  };

  const downloadXml = () => {
    if (!xmlOutput) return;

    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.xml";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput);
  };

  return (
    <>
      <Head>
        <title>JSON to XML Converter - Fast, Free & Privacy-Friendly | Converters ToolKit</title>
        <meta
          name="description"
          content="Convert JSON data to clean XML instantly using our developer-friendly online tool. No tracking, blazing-fast, and easy to use."
        />
      </Head>

      <ToolLayout tools={toolList}>
        <h1 className="text-2xl font-bold mb-4">JSON to XML Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl">
          Convert JSON data into structured XML markup. Supports arrays, nested objects, and special character escaping.
          Ideal for developers integrating with XML-based APIs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">JSON Input</label>
            <textarea
              className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
              placeholder="Paste your JSON here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleConvert}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Convert
              </button>
              <button
                onClick={handleExample}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Load Example
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">XML Output</label>
            <textarea
              readOnly
              className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
              value={xmlOutput}
              placeholder="Converted XML will appear here..."
            />
            {xmlOutput && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="mt-2 mr-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={downloadXml}
                  className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
                >
                  Download
                </button>
              </>
            )}
          </div>
        </div>

        <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
          [Ad Placeholder: Insert AdSense Code Here]
        </div>
      </ToolLayout>
    </>
  );
}
