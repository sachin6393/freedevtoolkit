"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function HashGenerator() {
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "MD5">("SHA-256");
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const generateHash = async () => {
    if (!input) {
      setHash("");
      return;
    }

    if (algorithm === "MD5") {
      // Simple browser-side MD5 implementation
      const md5 = await import("crypto-js/md5");
      setHash(md5.default(input).toString());
    } else {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hexString = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHash(hexString);
    }
  };

  const reset = () => {
    setInput("");
    setHash("");
  };

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>SHA256 / MD5 Hash Generator - Online Hashing Tool</title>
        <meta
          name="description"
          content="Generate SHA256 or MD5 hashes from text online. Use our secure, fast hash generator tool to create and copy cryptographic hashes instantly."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">SHA256 / MD5 Hash Generator</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Use this tool to generate cryptographic hashes (SHA-256 or MD5) for any
        input string. It's useful for password hashing, data integrity
        verification, and secure encoding.
      </p>

      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm">
          Select Algorithm:
        </label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as "SHA-256" | "MD5")}
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="SHA-256">SHA-256</option>
          <option value="MD5">MD5</option>
        </select>
      </div>

      <textarea
        placeholder="Enter text to hash..."
        className="w-full h-28 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-black dark:text-white resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={generateHash}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Hash
        </button>
        <button
          onClick={reset}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {hash && (
        <div className="mt-6">
          <label className="block font-medium mb-1 text-sm">Hash Output:</label>
          <div className="relative bg-gray-900 text-green-300 p-4 rounded text-sm font-mono break-all border">
            {hash}
            <button
              onClick={copyHash}
              className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="my-10 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
