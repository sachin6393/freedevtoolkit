"use client";

import React, { useState } from "react";
import Head from "next/head";
import { dump } from "js-yaml";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function JsonToYamlConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const yaml = dump(parsed, { noRefs: true });
      setYamlOutput(yaml);
      setError("");
    } catch (e: any) {
      setError("Invalid JSON format");
      setYamlOutput("");
    }
  };

  const handleReset = () => {
    setJsonInput("");
    setYamlOutput("");
    setError("");
  };

  const handleExample = () => {
    const example = {
      name: "Peter Parker",
      age: 25,
      skills: ["React", "TypeScript", "YAML"],
    };
    setJsonInput(JSON.stringify(example, null, 2));
    setYamlOutput("");
    setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
  };

  const handleDownload = () => {
    const blob = new Blob([yamlOutput], { type: "text/yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.yaml";
    link.click();
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>JSON to YAML Converter Online - Free & Instant</title>
        <meta
          name="description"
          content="Free online JSON to YAML converter. Convert your JSON data into readable YAML instantly. No login, no tracking. Copy or download YAML output easily."
        />
        <meta
          name="keywords"
          content="JSON to YAML, online converter, free tool, YAML output, JSON parser"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://yourdomain.com/tools/json-to-yaml"
        />
        <meta property="og:title" content="JSON to YAML Converter Online" />
        <meta
          property="og:description"
          content="Convert JSON to YAML format instantly with our
free online tool. Easy to use, no registration required."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourdomain.com/tools/json-to-yaml"
        />
      </Head>

      <h1 className="text-xl font-bold mb-4">JSON to YAML Converter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
        Easily convert JSON data to YAML format. Paste your JSON code below and
        click "Convert" to get YAML output. You can also copy or download the
        result.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* JSON Input */}
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">JSON Input</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
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

        {/* YAML Output */}
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">YAML Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            value={yamlOutput}
            readOnly
            placeholder="Converted YAML will appear here..."
          />
          {yamlOutput && (
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
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <div className="mt-10 text-gray-300 text-sm">
        <h2 className="text-lg font-semibold mb-2 text-white">
          What is a JSON to YAML Converter?
        </h2>
        <p className="mb-4">
          A JSON to YAML converter is a tool that transforms data from JSON
          format to YAML format. Both are popular data serialization languages
          used in configuration files, APIs, and backend systems.
        </p>

        <h3 className="font-semibold text-white mb-2">
          Why Convert JSON to YAML?
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>YAML is more human-readable and easier to edit than JSON.</li>
          <li>Some applications and configuration files prefer YAML format.</li>
          <li>
            Converting to YAML can help with readability and organization of
            complex data structures.
          </li>
        </ul>

        <h3 className="font-semibold text-white mb-2">
          Features of This Online JSON to YAML Tool
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>Free and secure — no data is stored or uploaded.</li>
          <li>Supports JSON arrays, nested structures, and objects.</li>
          <li>Error handling for invalid JSON input.</li>
          <li>Download converted YAML or copy to clipboard instantly.</li>
          <li>One-click example data to try it out.</li>
        </ul>

        <p>
          {" "}
          You can also use the YAML to JSON converter for the reverse operation,
          making it easy to switch between these two formats as needed.
          <a
            href="/tools/yaml-to-json"
            className="text-blue-500 hover:underline"
          >
            Try the YAML to JSON Converter
          </a>
        </p>

        <p>
          Whether you're working with configuration files, API responses, or
          data serialization, this JSON to YAML converter will help you easily
          transform your data and integrate it into your development workflow.
        </p>
      </div>
    </ToolLayout>
  );
}
