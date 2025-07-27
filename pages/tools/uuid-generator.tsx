'use client';

import React, { useEffect, useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState<string>("");

  // Only run on client
  useEffect(() => {
    setUuid(crypto.randomUUID());
  }, []);

  const handleRegenerate = () => {
    setUuid(crypto.randomUUID());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>UUID Generator - Generate UUID v4 Online</title>
        <meta
          name="description"
          content="Generate UUIDs (version 4) instantly with our online UUID generator tool. Fast, secure, and SEO-friendly with copy and regenerate features."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">UUID Generator (v4)</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Universally Unique Identifiers (UUIDs) are 128-bit values used to uniquely identify information in computer systems,
          databases, and distributed applications. This tool generates version 4 UUIDs, which are created using secure random 
          numbers for maximum uniqueness and unpredictability. UUID v4 is widely used for session IDs, database keys, API tokens,
           and more—ensuring no collisions even at massive scale. Instantly generate, copy, and reuse UUIDs with a single click.
      </p>

      <div className="bg-gray-900 text-green-300 p-4 rounded text-center text-lg font-mono break-all border min-h-[4rem]">
        {uuid || "Loading..."}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleRegenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={!uuid}
        >
          Copy UUID
        </button>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
