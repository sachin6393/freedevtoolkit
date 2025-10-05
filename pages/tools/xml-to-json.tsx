"use client";

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
          XML to JSON Converter - Fast, Free & Privacy-Friendly | freedevtoolkit
        </title>
        <meta
          name="description"
          content="Convert XML data to JSON format instantly with this free online tool. No ads, no tracking, just fast and reliable transformation."
        />
        <meta
          name="keywords"
          content="XML to JSON, convert XML to JSON, free XML JSON converter, XML parser, data transformation, online XML JSON tool"
        />
        <meta name="robots" content="index, follow" />
        {/* <link rel="canonical" href="https://yourdomain.com/tools/xml-to-json" /> */}
      
        <meta property="og:title" content="XML to JSON Converter - Fast, Free & Privacy-Friendly" />
        <meta property="og:description" content="Convert XML data to JSON format instantly with this free online tool. No ads, no tracking, just fast and reliable transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/xml-to-json" />
        {/* <meta property="og:image" content="https://yourdomain.com/og-image-xml-to-json.png" /> */}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="XML to JSON Converter - Fast, Free & Privacy-Friendly" />
        <meta name="twitter:description" content="Convert XML data to JSON format instantly with this free online tool. No ads, no tracking, just fast and reliable transformation." />
        <meta name="twitter:image" content="https://yourdomain.com/og-image-xml-to-json.png" />
       
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "XML to JSON Converter",
              "url": "https://yourdomain.com/tools/xml-to-json",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "description": "Convert XML data to JSON format instantly with this free online tool. No ads, no tracking, just fast and reliable transformation.",
              "featureList": [
                "Convert XML to JSON",
                "Supports nested elements and attributes",
                "Fast, privacy-friendly conversion",
                "No ads, no tracking"
              ]
            }
          `}
        </script>
      </Head>

      <ToolLayout tools={tools}>
        <h1 className="text-lg font-bold mb-4">XML to JSON Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl text-sm">
          Convert your XML data to clean, structured JSON with this fast and
          free online XML to JSON converter. Whether you're working with REST
          APIs, config files, or raw data, this tool simplifies your
          transformation process. Supports nested elements, attributes, and text
          nodes. No ads, no tracking – just privacy-friendly, developer-focused
          conversion. Try it now!
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
          <section className="mt-10 text-gray-300 leading-relaxed text-sm">
          <h2 className="text-lg font-semibold mb-2">
            About XML to JSON Conversion
          </h2>
          <p className="mb-2">
            XML (Extensible Markup Language) is widely used for data exchange,
            especially in web services and APIs. JSON (JavaScript Object
            Notation) is a lightweight, readable data format commonly used in
            modern applications. This free XML to JSON converter allows you to
            quickly convert XML files or raw XML strings into JSON format. It
            preserves nested structures and attributes without any extra bloat
            or metadata.
          </p>
          <p className="mb-2">
            Whether you're debugging an API response, processing configuration
            files, or handling legacy data, this tool gives you a
            developer-friendly JSON output you can use immediately. The
            converter works entirely in your browser—your data never leaves your
            device.
          </p>
          <p>
            if you are looking for a JSON to XML converter, check out our{" "}
            <a href="/tools/json-to-xml" className="text-blue-500 hover:underline">
              JSON to XML Converter
            </a>
            .
          </p>
        </section>
         <section className="mt-10 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-300">Is my XML data sent to a server?</h3>
              <p className="text-gray-400 text-sm">
                No. All conversions happen in your browser. Your XML data never leaves your device, ensuring privacy and security.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Does this tool support attributes and nested elements?</h3>
              <p className="text-gray-400 text-sm">
                Yes, the converter preserves both attributes and nested elements, giving you a clean and accurate JSON output.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Can I convert large XML files?</h3>
              <p className="text-gray-400 text-sm">
                You can convert reasonably large XML files, but performance depends on your browser and device. For very large files, consider using a desktop tool.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Is this XML to JSON converter free?</h3>
              <p className="text-gray-400 text-sm">
                Yes, this tool is completely free to use with no ads or tracking.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Can I use the converted JSON in my code?</h3>
              <p className="text-gray-400 text-sm">
                Absolutely! The output is standard JSON and can be used in JavaScript, Python, or any language that supports JSON.
              </p>
            </div>
          </div>
        </section>
      </ToolLayout>
    </>
  );
}
