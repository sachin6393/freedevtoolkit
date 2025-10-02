"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleToggle = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setOutput("");
  };

  const handleConvert = () => {
    try {
      const result =
        mode === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input);
      setOutput(result);
    } catch (e: any) {
      setOutput("❌ Invalid input for decoding.");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleExample = () => {
    const example =
      mode === "encode"
        ? "Hello world! Encode this URL safely."
        : "Hello%20world!%20Encode%20this%20URL%20safely.";
    setInput(example);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>
          URL Encoder & Decoder Online - Free Instant Converter Tool
        </title>
        <meta
          name="description"
          content="Encode or decode URLs instantly with this free online URL Encoder & Decoder tool. Fast, secure, and easy to use. No login or ads required."
        />
        <meta
          name="keywords"
          content="URL encoder, URL decoder, online tool, encode URL, decode URL"
        />
        <meta
          property="og:title"
          content="URL Encoder & Decoder Online - Free Instant Converter Tool"
        />
        <meta
          property="og:description"
          content="Free tool to encode or decode URL strings instantly. Secure, fast, and privacy-friendly. No login, no data tracking."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://yourdomain.com/url-encoder-decoder"
        />
        <link
          rel="canonical"
          href="https://yourdomain.com/url-encoder-decoder"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">URL Encoder / Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Easily encode or decode URL strings using this free online tool. Choose
        a mode, paste your input, and get the result instantly. No data is
        stored or sent to servers.
      </p>

      <div className="mb-4 flex items-center gap-3">
        <span className="font-semibold">Mode:</span>
        <div
          className="relative inline-flex items-center cursor-pointer select-none"
          onClick={handleToggle}
          tabIndex={0}
          role="switch"
          aria-checked={mode === "encode"}
        >
          <span
            className={`w-14 h-7 flex items-center rounded-full p-1 duration-300 ease-in-out
        ${
          mode === "encode"
            ? "bg-gradient-to-r from-green-400 to-green-700 shadow-green-500/40 shadow-md"
            : "bg-gradient-to-r from-pink-500 to-purple-700 shadow-purple-500/40 shadow-md"
        }`}
          >
            <span
              className={`bg-white w-5 h-5 rounded-full shadow-lg transform duration-300 ease-in-out
          ${mode === "encode" ? "translate-x-7" : "translate-x-0"}`}
            />
          </span>
          <span
            className={`ml-3 text-base font-bold transition-colors duration-300
        ${mode === "encode" ? "text-green-300" : "text-pink-300"}`}
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">
            {mode === "encode" ? "Text to Encode" : "URL to Decode"}
          </label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border border-white-700 rounded text-sm text-white"
            placeholder="Paste your input here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          <label className="font-semibold mb-2">Result</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border rounded text-sm text-green-300"
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
            </div>
          )}
        </div>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <div className="mt-10 space-y-6 text-sm text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-semibold mb-2">
            What is a URL Encoder and Decoder?
          </h2>
          <p>
            A URL Encoder and Decoder tool allows you to encode characters in a
            URL that are not allowed or have special meaning. This is essential
            when sending data in URLs, such as query strings or path parameters.
            For example, spaces are converted to <code>%20</code>, and special
            symbols like <code>@</code> become <code>%40</code>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Why Use This Tool?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fast, free, and works instantly in your browser.</li>
            <li>No data is stored or shared — your input stays private.</li>
            <li>
              Helpful for developers, SEOs, or anyone working with web URLs.
            </li>
            <li>Supports encoding and decoding with one-click toggle.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">FAQs</h2>
          <div className="space-y-4">
            <div>
              <strong>❓ When should I use URL encoding?</strong>
              <p>
                URL encoding is used when transmitting data in URLs, especially
                query parameters or form data. It ensures the URL is valid and
                readable by web servers.
              </p>
            </div>

            <div>
              <strong>❓ Is this tool secure?</strong>
              <p>
                Yes, it's fully client-side. No data is sent to any server,
                making it 100% secure and private.
              </p>
            </div>

            <div>
              <strong>❓ What characters get encoded?</strong>
              <p>
                Reserved characters like <code>?</code>, <code>&</code>,{" "}
                <code>=</code>, <code>+</code>, <code>%</code>, and spaces get
                encoded into percent-encoded format (e.g. <code>%20</code>).
              </p>
            </div>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
