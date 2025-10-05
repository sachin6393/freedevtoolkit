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
        <title>SHA256 / MD5 Hash Generator Online – Free & Secure Hashing Tool</title>
        <meta name="description" content="Generate SHA256 or MD5 hashes from text online. Secure, fast, and privacy-friendly hash generator for password hashing, file integrity, and more." />
        <meta name="keywords" content="SHA256 hash generator, MD5 hash generator, online hashing tool, cryptographic hash, password hashing, file integrity, free hash generator, secure hash tool" />
        <meta name="author" content="DevToolbox" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tools/hash-generator" />
        {/* Open Graph tags */}
        <meta property="og:title" content="SHA256 / MD5 Hash Generator Online – Free & Secure Hashing Tool" />
        <meta property="og:description" content="Generate SHA256 or MD5 hashes from text online. Secure, fast, and privacy-friendly hash generator for password hashing, file integrity, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/hash-generator" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="SHA256 / MD5 Hash Generator Online – Free & Secure Hashing Tool" />
        <meta name="twitter:description" content="Generate SHA256 or MD5 hashes from text online. Secure, fast, and privacy-friendly hash generator for password hashing, file integrity, and more." />
        {/* JSON-LD WebApplication Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "SHA256 / MD5 Hash Generator",
        "url": "https://yourdomain.com/tools/hash-generator",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "Generate SHA256 or MD5 hashes from text online. Secure, fast, and privacy-friendly hash generator for password hashing, file integrity, and more.",
        "featureList": [
          "Generate SHA256 and MD5 hashes",
          "Copy and download hash output",
          "Client-side only – privacy-friendly",
          "Free and easy to use"
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

      <section className="mt-10 text-gray-300">
        <h2 className="text-xl font-semibold mb-3 text-white">
          What is a Hash Generator Tool?
        </h2>
        <p className="mb-4">
          A hash generator is a cryptographic tool that converts plain text into a
          fixed-length string of characters. Hashing is a one-way operation — meaning
          once data is hashed, it cannot be reversed to retrieve the original input.
          Developers use hashing algorithms like <strong>SHA-256</strong> and{" "}
          <strong>MD5</strong> to ensure data integrity, verify passwords, and detect
          tampering in files or APIs.
        </p>

        <h3 className="font-semibold text-white mb-2">
          SHA-256 vs MD5 — What’s the Difference?
        </h3>
        <table className="w-full text-sm border border-gray-700 text-left mb-6">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-3 py-2 border border-gray-700">Feature</th>
              <th className="px-3 py-2 border border-gray-700">SHA-256</th>
              <th className="px-3 py-2 border border-gray-700">MD5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border border-gray-700">Hash Length</td>
              <td className="px-3 py-2 border border-gray-700">64 characters</td>
              <td className="px-3 py-2 border border-gray-700">32 characters</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">Algorithm Type</td>
              <td className="px-3 py-2 border border-gray-700">SHA-2 Family</td>
              <td className="px-3 py-2 border border-gray-700">MD (Message Digest)</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">Security</td>
              <td className="px-3 py-2 border border-gray-700">
                Highly secure, collision-resistant
              </td>
              <td className="px-3 py-2 border border-gray-700">
                Weak, vulnerable to collisions
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">Use Cases</td>
              <td className="px-3 py-2 border border-gray-700">
                Password hashing, blockchain, digital signatures
              </td>
              <td className="px-3 py-2 border border-gray-700">
                File checksums, legacy systems, quick integrity checks
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-semibold text-white mb-2">
          Why Use a SHA-256 or MD5 Hash Generator?
        </h3>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>Verify file integrity after download or upload</li>
          <li>Store passwords securely using one-way hashing</li>
          <li>Ensure consistency across APIs and data transfers</li>
          <li>Detect changes in content or configuration files</li>
        </ul>

        <h3 className="font-semibold text-white mb-2">
          How Does This Online Hash Generator Work?
        </h3>
        <p className="mb-4">
          Simply enter any text, select your preferred algorithm (SHA-256 or MD5),
          and click <strong>Generate Hash</strong>. The tool runs entirely in your
          browser, meaning your data never leaves your device — ensuring complete
          privacy and security. You can easily copy the hash result to use in your
          applications or documentation.
        </p>

        <h3 className="font-semibold text-white mb-2">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              1. Can I reverse a SHA-256 or MD5 hash back to text?
            </h4>
            <p>
              No, hashing is a one-way function. It’s designed to be irreversible,
              meaning you cannot retrieve the original text from the hash value.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. Which algorithm should I use — SHA-256 or MD5?
            </h4>
            <p>
              For modern security and password storage, always use{" "}
              <strong>SHA-256</strong>. MD5 is faster but outdated and vulnerable to
              collisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Is this hash generator secure?
            </h4>
            <p>
              Yes. This tool performs hashing client-side using{" "}
              <strong>Web Crypto API</strong> and <strong>CryptoJS</strong>. No data
              is sent to any server, ensuring your input remains private.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can I reverse a SHA-256 or MD5 hash back to text?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "No, hashing is a one-way function. It’s designed to be irreversible, meaning you cannot retrieve the original text from the hash value."
                }
              },
              {
                "@type": "Question",
                "name": "Which algorithm should I use — SHA-256 or MD5?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "For modern security and password storage, SHA-256 is recommended. MD5 is faster but less secure and vulnerable to collisions."
                }
              },
              {
                "@type": "Question",
                "name": "Is this hash generator secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes. This tool uses client-side Web Crypto API and CryptoJS for hashing, ensuring no data is sent to external servers."
                }
              }
            ]
          })
        }}
      />

    </ToolLayout>
  );
}
