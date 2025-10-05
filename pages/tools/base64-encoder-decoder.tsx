'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      let result = "";
      if (mode === "encode") {
        result = btoa(unescape(encodeURIComponent(input)));
      } else {
        result = decodeURIComponent(escape(atob(input)));
      }
      setOutput(result);
      setError("");
    } catch (err) {
      setError("⚠️ Invalid input for Base64 " + mode);
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleExample = () => {
    const example = mode === "encode" ? "Hello, Base64!" : "SGVsbG8sIEJhc2U2NCE=";
    setInput(example);
    setOutput("");
    setError("");
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `base64-${mode}.txt`;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>Free Base64 Encoder / Decoder – Encode or Decode Base64 Online free</title>
        <meta name="description" content="Use this free online Base64 tool to quickly encode or decode text. Perfect for developers working with data encoding, secure storage, or APIs. No signup, no tracking." />
        <meta name="keywords" content="Base64 encoder, Base64 decoder, online Base64 tool, encode Base64, decode Base64, developer tools, web tools, free Base64 converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tools/base64-encoder-decoder" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Base64 Encoder / Decoder – Free Online Tool" />
        <meta property="og:description" content="Free online Base64 encoder and decoder tool for developers. Fast, secure, and easy to use." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/base64-encoder-decoder" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Base64 Encoder / Decoder – Free Online Tool" />
        <meta name="twitter:description" content="Free online Base64 encoder and decoder tool for developers. Fast, secure, and easy to use." />
        {/* JSON-LD WebApplication Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Base64 Encoder / Decoder",
        "url": "https://yourdomain.com/tools/base64-encoder-decoder",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "Use this free online Base64 tool to quickly encode or decode text. Perfect for developers working with data encoding, secure storage, or APIs. No signup, no tracking.",
        "featureList": [
          "Encode text to Base64",
          "Decode Base64 to text",
          "Copy or download results",
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

      <h1 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Easily encode or decode Base64 strings. Use the toggle to switch modes,
        paste your text, and click Convert. You can also copy or download the result.
      </p>

      <div className="mb-4 flex gap-3">
        <label className="font-medium">Mode:</label>
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded ${mode === "encode"
              ? "bg-green-600 text-white"
              : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded ${mode === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
        >
          Decode
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${mode === "encode" ? "text" : "Base64"} here...`}
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
        </div>

        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            value={output}
            readOnly
            placeholder="Converted result will appear here..."
          />
          {output && (
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
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">What is Base64 Encoding?</h2>
        <p className="text-gray-300 mb-4">
          Base64 is a binary-to-text encoding scheme commonly used to represent binary data in a text format, such as when embedding images in HTML or transferring data in JSON, XML, or APIs.
        </p>

        <h3 className="font-semibold text-white mb-2">Why Use Base64 Encoding?</h3>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>Safely encode binary or special characters in web formats</li>
          <li>Securely transmit data over text-based protocols (e.g., email, JSON)</li>
          <li>Embed images or files into HTML or CSS without linking externally</li>
        </ul>

        <h3 className="font-semibold text-white mb-2">Frequently Asked Questions (FAQs)</h3>
        <div className="text-gray-300 space-y-4">
          <div>
            <strong>🔹 What is Base64 used for?</strong>
            <p>Base64 is used to encode binary data into ASCII text for use in web development, APIs, or email transmission.</p>
          </div>
          <div>
            <strong>🔹 Is Base64 encryption?</strong>
            <p>No, Base64 is not encryption. It’s an encoding method that makes data readable by systems that expect plain text.</p>
          </div>
          <div>
            <strong>🔹 Can I decode Base64 without a key?</strong>
            <p>Yes, Base64 encoding/decoding does not use a key. It’s fully reversible without any secret.</p>
          </div>
          <div>
            <strong>🔹 How do I encode and decode Base64 online?</strong>
            <p>Paste your input above, select “Encode” or “Decode,” then click Convert. You can also copy or download the output.</p>
          </div>
        </div>
      </section>

    </ToolLayout>
  );
}
