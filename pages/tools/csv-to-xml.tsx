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

    if (rows.length < 2) throw new Error("CSV must have at least one header and one data row");

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
      setError(err.message || "Invalid CSV format");
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
        <title>CSV to XML Converter - Fast, Clean & Free | Converters ToolKit</title>
        <meta
          name="description"
          content="Convert CSV files to XML format with this instant and free online tool. Upload files or paste CSV content. Privacy-friendly and fast!"
        />
      </Head>

      <ToolLayout tools={tools}>
        <h1 className="text-3xl font-bold mb-4">CSV to XML Converter</h1>
        <p className="mb-6 text-gray-300 max-w-2xl">
          Easily convert comma-separated values (CSV) into structured XML format. Upload files or paste directly. Perfect for legacy integrations and data workflows.
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
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">XML Output</label>
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
      </ToolLayout>
    </>
  );
}
