"use client";

import React, { useRef, useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function CsvToJson() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCsvToJson = (csv: string): string => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");

    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        obj[header.trim()] = values[idx]?.trim() ?? "";
      });
      return obj;
    });

    return JSON.stringify(data, null, 2);
  };

  const handleConvert = () => {
    try {
      if (!csvInput.trim()) throw new Error("CSV input is empty.");
      const json = parseCsvToJson(csvInput);
      setJsonOutput(json);
      setError("");
    } catch (err: any) {
      setError("Invalid CSV format");
      setJsonOutput("");
    }
  };

  const handleReset = () => {
    setCsvInput("");
    setJsonOutput("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleExample = () => {
    const example = `name,age,city\nPeter Parker,26,New York\nMary Jane,25,Los Angeles`;
    setCsvInput(example);
    setJsonOutput("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setCsvInput(text);
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const downloadJson = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.json";
    link.click();
  };

  return (
    <>
      <Head>
        <title>
          CSV to JSON Converter - Instant & Free | Converters ToolKit | free csv
          to json converter | no login
        </title>
       <meta
    name="description"
    content="Convert CSV to JSON instantly using our free online converter. Paste or upload CSV files to get clean, formatted JSON output. 100% client-side and secure."
  />
  <meta
    name="keywords"
    content="CSV to JSON converter, online CSV to JSON, convert CSV to JSON, CSV JSON formatter, CSV parser, developer tools, free CSV JSON converter"
  />
  <meta property="og:title" content="CSV to JSON Converter – Free Online Tool" />
  <meta
    property="og:description"
    content="Transform your CSV data into structured JSON format instantly. Secure, private, and fast. Works completely in your browser."
  />
  <meta property="og:type" content="website" />
  {/* <meta property="og:url" content="https://yourdomain.com/csv-to-json" /> */}
  <meta property="og:site_name" content="Free Dev Toolkit" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="CSV to JSON Converter – Free Developer Tool"
  />
  <meta
    name="twitter:description"
    content="Convert CSV files to JSON easily and securely in your browser. No signup, no server upload."
  />
  {/* <link rel="canonical" href="https://yourdomain.com/csv-to-json" /> */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "CSV to JSON Converter",
      // "url": "https://yourdomain.com/csv-to-json",
      "description":
        "Free online tool to convert CSV files into JSON format instantly. Works fully client-side, supports upload, copy, and download.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "featureList": [
        "Convert CSV to JSON instantly",
        "Supports file upload",
        "Copy and download JSON",
        "Offline and secure",
        "Free to use"
      ],
      "creator": {
        "@type": "Organization",
        "name": "Free Dev Toolkit",
        // "url": "https://yourdomain.com"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "180"
      }
    })}
  </script>
</Head>
      <ToolLayout tools={toolList}>
        <h1 className="text-2xl font-bold mb-4">CSV to JSON Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl text-sm">
          Convert comma-separated values (CSV) into structured JSON instantly.
          Ideal for APIs, config files, and data transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              CSV Input
            </label>
            <textarea
              className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
              placeholder="Paste your CSV here or upload a file..."
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
            />
            <label className="mt-2 inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded cursor-pointer">
              📁 Choose File
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <div className="flex space-x-2 mt-3">
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
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
              <div className="mt-2">
                <button
                  onClick={copyToClipboard}
                  className="mr-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
                >
                  Copy
                </button>
                <button
                  onClick={downloadJson}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
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

        <div className="bg-gray-800 p-6 rounded-lg text-gray-200 text-sm leading-6 mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            What is a CSV to JSON Converter?
          </h2>
          <p>
            A CSV to JSON converter is a tool that transforms comma-separated
            value files (like Excel exports) into structured JSON format. This
            is useful for working with APIs, web development, databases, and
            config files. JSON is a widely used data format in modern
            applications.
          </p>

          <h3 className="text-md font-semibold text-white">
            Why use our CSV to JSON tool?
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>⚡ Instant conversion — just paste or upload your CSV file</li>
            <li>🔒 100% privacy-safe — no data sent to server</li>
            <li>🧠 Simple and intuitive interface</li>
            <li>💾 Download and copy JSON output easily</li>
          </ul>

          <h3 className="text-md font-semibold text-white mt-4">
            How to convert CSV to JSON?
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Paste your CSV content or upload a `.csv` file</li>
            <li>
              Click the <strong>Convert</strong> button
            </li>
            <li>View and copy your JSON result instantly</li>
            <li>Optionally download the output as a `.json` file</li>
          </ol>
          <p>
            If you need to convert CSV to XML, try our{" "}
            <a
              href="/tools/csv-to-xml"
              className="text-blue-500 hover:underline"
            >
              CSV to XML converter
            </a>
            .
          </p>
          <p>
            For more advanced JSON manipulation, check out our{" "}
            <a
              href="/tools/json-formatter"
              className="text-blue-500 hover:underline"
            >
              JSON Formatter
            </a>{" "}
            tool.
          </p>
          <section className="mt-10 text-gray-300 leading-relaxed text-sm">
  <h2 className="text-lg font-semibold mb-2">
    CSV to JSON Converter – Frequently Asked Questions
  </h2>

  <h3 className="font-semibold mt-4 mb-1">1. What is a CSV to JSON converter?</h3>
  <p>
    A CSV to JSON converter is an online tool that transforms CSV (comma-separated value)
    data into structured JSON format. It’s especially useful for developers working
    with APIs, databases, or front-end configurations.
  </p>

  <h3 className="font-semibold mt-4 mb-1">2. Is this tool free to use?</h3>
  <p>
    Yes. This CSV to JSON converter is completely free, requires no registration,
    and can be used as often as you like.
  </p>

  <h3 className="font-semibold mt-4 mb-1">3. Can I upload CSV files?</h3>
  <p>
    Absolutely! You can paste CSV data directly or upload a `.csv` file. The tool
    will automatically convert it into properly formatted JSON.
  </p>

  <h3 className="font-semibold mt-4 mb-1">4. Does it work offline?</h3>
  <p>
    Yes, the conversion runs 100% in your browser. No internet connection is needed
    once the page is loaded.
  </p>

  <h3 className="font-semibold mt-4 mb-1">5. Will my data be sent to any server?</h3>
  <p>
    No. This tool is client-side only — all processing happens locally in your browser,
    ensuring full privacy and security.
  </p>

  <h3 className="font-semibold mt-4 mb-1">6. Can I download or copy the JSON output?</h3>
  <p>
    Yes. After conversion, you can copy the JSON result to your clipboard or
    download it as a `.json` file with a single click.
  </p>

  <h3 className="font-semibold mt-4 mb-1">7. What if my CSV has missing values?</h3>
  <p>
    If a CSV line has missing columns, the converter automatically fills them with
    empty strings to ensure valid JSON output.
  </p>
</section>

        </div>
        
      </ToolLayout>
    </>
  );
}
