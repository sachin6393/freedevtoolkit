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
    const exampleJwt =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
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
        <title>JWT Decoder Online - Decode JWT Token Instantly</title>
        <meta
          name="description"
          content="Free online JWT Decoder. Instantly decode your JWT token to view header and payload. Secure, client-side, no secrets stored. Useful for debugging JWTs."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4">JWT Decoder</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Paste your JWT token below to decode and view its header and payload. This tool does not verify the signature. Everything runs locally in your browser.
      </p>

      <div className="flex flex-col gap-4">
        <textarea
          className="w-full h-24 p-3 bg-gray-900 border rounded text-white text-sm"
          placeholder="Paste your JWT here..."
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button onClick={decodeJwt} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Decode</button>
          <button onClick={handleLoadExampleJwt} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Load Example JWT</button>
          <button onClick={reset} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Reset</button>
        </div>

        {error && <p className="text-red-500">⚠️ {error}</p>}

        {header && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Header</h2>
            <textarea readOnly className="w-full h-32 p-3 bg-gray-900 text-green-300 border rounded text-sm" value={header} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => copyToClipboard(header)} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Copy</button>
              <button onClick={() => downloadJson("jwt-header.json", header)} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">Download</button>
            </div>
          </div>
        )}

        {payload && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Payload</h2>
            <textarea readOnly className="w-full h-40 p-3 bg-gray-900 text-green-300 border rounded text-sm" value={payload} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => copyToClipboard(payload)} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Copy</button>
              <button onClick={() => downloadJson("jwt-payload.json", payload)} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">Download</button>
            </div>
          </div>
        )}
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
