'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList as tools } from "@/components/utils/toolList"; // Importing the tool list

export default function XmlToJson() {
  const [xmlInput, setXmlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlInput.trim(), "text/xml");

      const parseError = xml.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        throw new Error("Invalid XML format.");
      }

      const json = xmlToJson(xml);
      setJsonOutput(JSON.stringify(json, null, 2));
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to parse XML");
      setJsonOutput("");
    }
  };

  const handleReset = () => {
    setXmlInput("");
    setJsonOutput("");
    setError("");
  };

  const xmlToJson = (node: Node): any => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue?.trim();
      return text ? text : null;
    }

    const obj: any = {};

    // Flatten attributes directly into the object
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      for (const attr of Array.from(element.attributes)) {
        obj[attr.name] = attr.value;
      }
    }

    const childNodes = Array.from(node.childNodes).filter((child) => {
      return !(child.nodeType === Node.TEXT_NODE && !child.nodeValue?.trim());
    });

    if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
      return childNodes[0].nodeValue?.trim() ?? "";
    }

    for (const child of childNodes) {
      const key = child.nodeName;
      const value = xmlToJson(child);

      if (value === null || value === "") continue;

      if (obj[key]) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }

    return obj;
  };

  const handleExample = () => {
    const example = `<root>
<person>
    <name>Peter Parker</name>
    <age>26</age>
    <city>New York</city>
 </person>
<person>
    <name>Mary Jane</name>
    <age>25</age>
    <city>Los Angeles</city>
    </person>
</root>`;
    setXmlInput(example);
    setJsonOutput("");
    setError("");
  };

    const downloadJson = () => {
    if (!jsonOutput) return;

    const blob = new Blob([jsonOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.json";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <>
      <Head>
        <title>
          XML to JSON Converter - Fast, Free & Privacy-Friendly | Converters
          ToolKit
        </title>
        <meta
          name="description"
          content="Convert XML data to JSON format instantly with this free online tool. No ads, no tracking, just fast and reliable transformation."
        />
      </Head>

      <ToolLayout tools={tools}>
        <h1 className="text-2xl font-bold mb-4">XML to JSON Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl">
          Easily convert structured XML into readable, developer-friendly JSON
          format. Supports attributes and nested tags. Great for debugging, API
          testing, or data transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              XML Input
            </label>
            <textarea
              className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
              placeholder="Paste your XML here..."
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
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
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              JSON Output
            </label>
            <textarea
              readOnly
              className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
              value={jsonOutput}
              placeholder="Converted JSON will appear here..."
            />
            {jsonOutput && (
                <>
              <button
                onClick={copyToClipboard}
                className="mt-2 mr-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
              >
                Copy
              </button>
               <button
              onClick={downloadJson}
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
