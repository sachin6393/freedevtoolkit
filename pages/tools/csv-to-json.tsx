import React, { useRef, useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList as tools } from "@/components/utils/toolList";

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
        <title>CSV to JSON Converter - Instant & Free | Converters ToolKit | free csv to json converter | no login</title>
        <meta
          name="description"
          content="Convert CSV data to clean JSON format instantly. Paste or upload CSV file. Fast, free, and privacy-safe CSV to JSON tool."
        />
      </Head>

      <ToolLayout tools={tools}>
        <h1 className="text-2xl font-bold mb-4">CSV to JSON Converter</h1>
        <p className="mb-6 text-gray-300 max-w-2xl">
          Convert comma-separated values (CSV) into structured JSON instantly. Ideal for APIs,
          config files, and data transformation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-semibold mb-2">CSV Input</label>
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
              <button onClick={handleConvert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Convert
              </button>
              <button onClick={handleExample} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Load Example
              </button>
              <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                Reset
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">JSON Output</label>
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
      </ToolLayout>
    </>
  );
}
