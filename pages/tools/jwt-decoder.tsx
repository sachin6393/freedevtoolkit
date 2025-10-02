"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  const decodeJwt = () => {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const decodedHeader = atob(parts[0]);
      const decodedPayload = atob(parts[1]);

      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message || "Error decoding JWT");
      setHeader("");
      setPayload("");
    }
  };

  const reset = () => {
    setJwt("");
    setHeader("");
    setPayload("");
    setError("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleLoadExampleJwt = () => {
    const exampleJwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJ1c2VySWQiOiIxMjM0NTYiLCJ1c2VybmFtZSI6InRlc3RVc2VyIiwiZXhwIjoxNjg3NzY4MDB9." +
      "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setJwt(exampleJwt);
  };

  const downloadJson = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>JWT Decoder Online - Free & Secure Token Decoder</title>
        <meta
          name="description"
          content="Decode your JWT tokens instantly with our free JWT decoder tool. View header and payload securely. Everything runs client-side."
        />
        <meta
          name="keywords"
          content="JWT decoder, decode JWT token, JSON Web Token, JWT online, free JWT decoder, token debugging, JWT header payload"
        />
        <meta name="author" content="DevToolbox" />
        <meta
          property="og:title"
          content="JWT Decoder - Decode JSON Web Tokens"
        />
        <meta
          property="og:description"
          content="Instantly decode and inspect JWT tokens securely in your browser. No server involved."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/jwt-decoder" />
        <meta
          property="og:image"
          content="https://yourdomain.com/jwt-decoder-banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free JWT Decoder Tool" />
        <meta
          name="twitter:description"
          content="Decode JWTs instantly and securely. Useful for developers and testers."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">JWT Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Paste your JWT token below to decode and view its header and payload.
        This tool does not verify the signature. Everything runs locally in your
        browser for full security.
      </p>

      <div className="flex flex-col gap-4">
        <textarea
          className="w-full h-24 p-3 bg-gray-900 border rounded text-white text-sm"
          placeholder="Paste your JWT here..."
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={decodeJwt}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Decode
          </button>
          <button
            onClick={handleLoadExampleJwt}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Load Example JWT
          </button>
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>

        {error && <p className="text-red-500">⚠️ {error}</p>}

        {header && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Header</h2>
            <textarea
              readOnly
              className="w-full h-32 p-3 bg-gray-900 text-green-300 border rounded text-sm"
              value={header}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => copyToClipboard(header)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Copy
              </button>
              <button
                onClick={() => downloadJson("jwt-header.json", header)}
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
              >
                Download
              </button>
            </div>
          </div>
        )}

        {payload && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Payload</h2>
            <textarea
              readOnly
              className="w-full h-40 p-3 bg-gray-900 text-green-300 border rounded text-sm"
              value={payload}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => copyToClipboard(payload)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Copy
              </button>
              <button
                onClick={() => downloadJson("jwt-payload.json", payload)}
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <div className="my-10">
        <h3 className="font-semibold text-white mb-2">
          Why Use a JWT Decoder?
        </h3>
        <ul className="list-disc list-inside text-gray-300 text-sm mb-2">
          <li>Inspect and debug JWT tokens securely</li>
          <li>View JSON payload without revealing it to a server</li>
          <li>Helps in understanding token structure and claims</li>
          <li>Ideal for API testing and learning about auth mechanisms</li>
        </ul>

        <h3 className="font-semibold text-white mb-2">FAQs</h3>
        <div className="text-gray-300 space-y-4">
          <div>
            <strong>🔹 What is a JWT?</strong>
            <p>A JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties.</p>
          </div>
          <div>
            <strong>🔹 How does JWT work?</strong>
            <p>JWTs are created by signing a JSON object with a secret key, allowing the recipient to verify the token's authenticity.</p>
          </div>
          <div>
            <strong>🔹 What are the benefits of using JWT?</strong>
            <p>JWTs are stateless, compact, and can be easily transmitted via URL, POST, or HTTP headers.</p>
          </div>
          <div>
            <strong>🔹 Can I trust a JWT?</strong>
            <p>JWTs can be trusted if they are signed and the signature is verified using the appropriate key.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
