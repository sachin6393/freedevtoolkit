"use client";

import React, { useState } from "react";
import Head from "next/head";
import { load } from "js-yaml";
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
        <title>
          YAML to JSON Converter Online | Free YAML Parser | free yaml to json online
        </title>
        <meta
          name="description"
          content="Easily convert YAML to JSON with our free online YAML to JSON converter. Supports formatting, copying, downloading, and error detection. No login required."
        />
        <meta
          name="keywords"
          content="yaml to json, online yaml parser, yaml to json converter, convert yaml to json, free yaml converter, json from yaml, yaml formatter"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          // href="https://yourdomain.com/yaml-to-json-converter"
        />
    
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "YAML to JSON Converter",
              "url": "https://yourdomain.com/yaml-to-json-converter",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "description": "Easily convert YAML to JSON with our free online YAML to JSON converter. Supports formatting, copying, downloading, and error detection. No login required.",
              "featureList": [
                "Convert YAML to JSON instantly",
                "Supports lists, nested structures, and objects",
                "Error handling for invalid YAML",
                "Download or copy JSON output",
                "Free and privacy-friendly"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Head>

      <h1 className="text-xl font-bold mb-4">YAML to JSON Converter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
        Convert YAML data to JSON format instantly. Paste your YAML code below
        and click "Convert" to see the JSON output. You can also copy the
        output, or download it as a JSON file.
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

      <div className="mt-10 text-gray-300 text-sm">
        <h2 className="text-lg font-semibold mb-2 text-white">
          What is a YAML to JSON Converter?
        </h2>
        <p className="mb-4">
          A YAML to JSON converter is a tool that transforms data from YAML
          format to JSON format. Both are popular data serialization languages
          used in configuration files, APIs, and backend systems.
        </p>

        <h3 className="font-semibold text-white mb-2">
          Why Convert YAML to JSON?
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            JSON is more widely used in web APIs and JavaScript-based
            applications.
          </li>
          <li>Some platforms or databases only accept JSON input.</li>
          <li>
            YAML is human-friendly but converting to JSON makes it
            machine-readable.
          </li>
        </ul>

        <h3 className="font-semibold text-white mb-2">
          Features of This Online YAML to JSON Tool
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>Free and secure — no data is stored or uploaded.</li>
          <li>Supports YAML lists, nested structures, and objects.</li>
          <li>Error handling for invalid YAML input.</li>
          <li>Download converted JSON or copy to clipboard instantly.</li>
          <li>One-click example data to try it out.</li>
        </ul>
        <p>
          You can also use the JSON to YAML converter for the reverse operation,
          making it easy to switch between these two formats as needed.
          <a
            href="/tools/json-to-yaml"
            className="text-blue-500 hover:underline"
          >
            Try the JSON to YAML Converter
          </a>
        </p>

        <p>
          Whether you're working with Kubernetes, Docker Compose, or static site
          generators, this YAML to JSON converter will help you easily transform
          your data and integrate it into your development workflow.
        </p>
      </div>
    </ToolLayout>
  );
}
