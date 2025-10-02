"use client";

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
        <title>UUID Generator Online - Free UUID v4 Generator Tool</title>
        <meta
          name="description"
          content="Generate UUID v4 instantly with this secure and free online UUID generator tool. No ads, no login. Copy and regenerate UUIDs easily for use in APIs, databases, and more."
        />
        <meta
          name="keywords"
          content="UUID generator, UUID v4, unique identifier, online tool, free UUID"
        />
        <meta
          property="og:title"
          content="UUID Generator Online - Free UUID v4 Generator Tool"
        />
        <meta
          property="og:description"
          content="Generate UUID v4 instantly with this secure
  and free online UUID generator tool. No ads, no login. Copy and regenerate UUIDs easily for use in APIs, databases, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/tools/uuid-generator" />
        <meta property="og:image" content="/images/uuid-generator.png" />
        <link rel="canonical" href="/tools/uuid-generator" />
      </Head>

      <h1 className="text-2xl font-bold mb-4">UUID Generator (v4)</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
        Generate a Universally Unique Identifier (UUID) version 4 instantly.
        UUIDs are used to uniquely identify information in computer systems,
        databases, and distributed applications. This tool generates secure,
        random UUIDs that can be copied and reused in your projects.
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

      <div className="mt-10 space-y-6 text-sm text-gray-700 dark:text-gray-300">
  <section>
    <h2 className="text-lg font-semibold mb-2">What is a UUID (Universally Unique Identifier)?</h2>
    <p>
      A UUID is a 128-bit number used to uniquely identify information in computer systems. UUIDs are essential for generating unique keys, session identifiers, transaction IDs, and more — without requiring a central authority or database.
    </p>
    <p>
      This tool generates <strong>UUID version 4 (UUID v4)</strong>, which are randomly generated using cryptographically secure values to avoid collisions.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">Why Use This UUID Generator?</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Instantly generate secure, unique UUID v4 values.</li>
      <li>Client-side only – nothing is stored or sent to a server.</li>
      <li>Useful for software development, database keys, tokens, and identifiers.</li>
      <li>Includes copy and regenerate functionality for ease of use.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">FAQs</h2>
    <div className="space-y-4">
      <div>
        <strong>❓ What version of UUID does this tool generate?</strong>
        <p>
          This tool generates <strong>UUID v4</strong>, which is based on secure random values and is suitable for most modern applications.
        </p>
      </div>

      <div>
        <strong>❓ Are the UUIDs generated here truly unique?</strong>
        <p>
          While no tool can guarantee 100% uniqueness, UUID v4 provides 122 bits of randomness — making collisions extremely unlikely (roughly 1 in 2<sup>122</sup>).
        </p>
      </div>

      <div>
        <strong>❓ Is this UUID Generator secure?</strong>
        <p>
          Yes. It runs entirely in your browser using the native <code>crypto.randomUUID()</code> API. No data is transmitted or stored.
        </p>
      </div>

      <div>
        <strong>❓ Can I use these UUIDs in production applications?</strong>
        <p>
          Absolutely. UUID v4 is widely used in production systems for database keys, API tokens, user IDs, and more.
        </p>
      </div>
    </div>
  </section>
</div>


    </ToolLayout>
  );
}
