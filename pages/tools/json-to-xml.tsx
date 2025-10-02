"use client";

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
          xml += `${indent}<${key}>\n${jsonToXml(
            item,
            indent + "  "
          )}${indent}</${key}>\n`;
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        xml += `${indent}<${key}>\n${jsonToXml(
          obj[key],
          indent + "  "
        )}${indent}</${key}>\n`;
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
        <title>
          JSON to XML Converter - Instant, Free & Secure | Freedevtoolkit
        </title>
        <meta
          name="description"
          content="Easily convert JSON data to XML format using this fast and free online tool. Clean output, no ads or tracking, perfect for developers and data transformation."
        />
        <meta
          name="keywords"
          content="JSON to XML, convert JSON to XML, free JSON XML converter, JSON formatter, data converter, online JSON XML tool"
        />
        <link rel="canonical" href="https://yourdomain.com/json-to-xml" />
      </Head>

      <ToolLayout tools={toolList}>
        <h1 className="text-lg font-bold mb-4 text-gray-200">JSON to XML Converter</h1>
        <p className="mb-6 text-gray-200 max-w-1xl text-sm">
          Convert structured JSON into clean, well-formed XML with this free
          developer tool. Great for APIs, configuration files, or data exchange
          formats. Supports nested objects and arrays, with minimal clutter and
          no external dependencies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              JSON Input
            </label>
            <textarea
              className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
              placeholder="Paste your JSON here..."
              spellCheck={false}
              autoComplete="off"
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
            <label className="block text-lg font-semibold mb-2">
              XML Output
            </label>
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
                  title="Copy to clipboard"
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

          <section className="mt-10 text-gray-300 leading-relaxed text-sm">
          <h2 className="text-lg font-semibold mb-2">
            About JSON to XML Conversion
          </h2>
          <p className="mb-2">
            This free JSON to XML converter helps developers and analysts
            convert structured JSON data into valid XML format. Whether you're
            working with APIs, configuration files, data pipelines, or database
            transformations, this tool is designed to be simple, fast, and
            accurate.
          </p>
          <p className="mb-2">
            It supports nested objects and arrays, auto-escapes special
            characters (like <code>&lt;</code>, <code>&gt;</code>, and{" "}
            <code>&amp;</code>), and provides clean XML without additional
            metadata. It runs entirely on your browser without sending data to
            any server, ensuring privacy and security.
          </p>
          <p className="mb-2">
            Simply paste your JSON input on the left, click “Convert”, and get
            the corresponding XML output on the right. You can copy or download
            the output instantly. Use this tool to speed up your development,
            debug integration issues, or prepare XML-based reports.
          </p>
          <p className="mb-2">
            If you're also looking for reverse transformation, check out our{" "}
            <a href="/tools/xml-to-json" className="text-blue-500 hover:underline">
              XML to JSON converter
            </a>
            .
          </p>
          <p>
            You may also like our <a href="/tools/json-formatter" className="text-blue-500 hover:underline">JSON Formatter</a> tool.
          </p>
        </section>
      </ToolLayout>
    </>
  );
}
