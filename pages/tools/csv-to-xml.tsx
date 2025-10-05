"use client";
import React, { useRef, useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList as tools } from "@/components/utils/toolList";

export default function CsvToXml() {
  const [csvInput, setCsvInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const escapeXml = (unsafe: string): string =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const parseCsvToXml = (csv: string): string => {
    const rows = csv
      .trim()
      .split("\n")
      .map((line) => line.split(","));

    if (rows.length < 2)
      throw new Error("CSV must have at least one header and one data row");

    const headers = rows[0];
    const xmlRows = rows.slice(1).map((row) => {
      const cells = row.map((cell, idx) => {
        const tag = headers[idx].trim();
        const value = escapeXml(cell.trim());
        return `    <${tag}>${value}</${tag}>`;
      });
      return `  <row>\n${cells.join("\n")}\n  </row>`;
    });

    return `<root>\n${xmlRows.join("\n")}\n</root>`;
  };

  const handleConvert = () => {
    try {
      const xml = parseCsvToXml(csvInput);
      setXmlOutput(xml);
      setError("");
    } catch (err: any) {
      setError("Invalid CSV format");
      setXmlOutput("");
    }
  };

  const handleReset = () => {
    setCsvInput("");
    setXmlOutput("");
    setError("");
    // Clear file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExample = () => {
    const example = `name,age,city\nPeter Parker,26,New York\nMary Jane,25,Los Angeles`;
    setCsvInput(example);
    setXmlOutput("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSV to XML Converter",
    // url: "https://yourdomain.com/tools/csv-to-xml",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Free online CSV to XML Converter tool that converts CSV files to clean XML instantly. Upload or paste CSV, get formatted XML output easily.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Free CSV to XML conversion",
      "Supports file upload and paste input",
      "Fast and accurate conversion",
      "Copy and download XML output",
      "No login required",
    ],
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
    navigator.clipboard.writeText(xmlOutput);
  };

  const downloadXml = () => {
    if (!xmlOutput) return;
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.xml";
    link.click();
  };

  return (
    <>
      <Head>
        <title>CSV to XML Converter Online - Free, Fast, and Accurate</title>
        <meta
          name="description"
          content="Convert CSV files to clean XML format instantly. Upload CSV, paste data, and get well-structured XML output. Free online CSV to XML converter tool."
        />
        <meta
          name="keywords"
          content="CSV to XML, convert CSV to XML, online CSV converter, free CSV to XML tool, structured XML output"
        />
        <meta name="robots" content="index, follow" />
        {/* <link rel="canonical" href="https://yourdomain.com/tools/csv-to-xml" /> */}
        <meta property="og:title" content="CSV to XML Converter Online" />
        <meta
          property="og:description"
          content="Easily convert CSV files to XML format with our free online tool. Upload files or paste data for instant conversion."
        />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://yourdomain.com/tools/csv-to-xml" /> */}
        <meta property="og:site_name" content="Converters Toolkit" />
        <meta property="og:locale" content="en_US" />

       
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <ToolLayout tools={tools}>
        <h1 className="text-2xl font-bold mb-4">CSV to XML Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl">
          Easily convert comma-separated values (CSV) into structured XML
          format. Upload files or paste directly. Perfect for legacy
          integrations and data workflows.
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

            <div className="mt-2 mb-2">
              <label className="flex items-center gap-2 text-sm text-white bg-purple-600 border border-gray-600 px-4 py-2 rounded cursor-pointer w-fit hover:bg-purple-700">
                📁 Choose File
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            </div>

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
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              XML Output
            </label>
            <textarea
              readOnly
              className="w-full h-60 p-3 bg-gray-900 border  rounded text-sm text-green-300"
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
        <div className="mt-12 text-gray-300 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-white mb-2">
            What is a CSV to XML Converter?
          </h2>
          <p className="mb-4">
            A CSV to XML converter transforms data from{" "}
            <strong>Comma-Separated Values (CSV)</strong> format into{" "}
            <strong>Extensible Markup Language (XML)</strong> format. This is
            especially useful for developers and data analysts who need to
            migrate flat tabular data into structured hierarchical XML for
            legacy systems, APIs, or configuration files.
          </p>

          <h3 className="text-md font-semibold text-white mb-2">
            Why Convert CSV to XML?
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>✅ Easy data integration into XML-based systems</li>
            <li>
              ✅ Convert CSV-formatted spreadsheets or exports to clean XML
              format
            </li>
            <li>✅ Automate legacy system data workflows</li>
            <li>✅ Avoid manual formatting and reduce human error</li>
          </ul>

          <h3 className="text-md font-semibold text-white mb-2">
            Features of This Tool
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>🔄 Fast conversion with a single click</li>
            <li>📁 Supports file upload or direct input</li>
            <li>📋 Copy or download XML output easily</li>
            <li>💡 Load example CSV to test instantly</li>
            <li>
              🔐 Runs entirely in the browser — your data is never uploaded
            </li>
          </ul>

          <h3 className="text-md font-semibold text-white mb-2">
            Who Should Use This Tool?
          </h3>
          <p className="mb-4">
            This free CSV to XML converter is perfect for web developers, data
            engineers, and anyone working with data transformation, APIs, or
            legacy enterprise systems that require XML input.
          </p>
          <p>
            If you need to convert CSV to JSON, try our{" "}
            <a
              href="/tools/csv-to-json"
              className="text-blue-500 hover:underline"
            >
              CSV to JSON Converter
            </a>
            .
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
