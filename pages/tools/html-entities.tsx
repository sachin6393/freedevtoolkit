'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

function encodeHtmlEntities(str: string): string {
  return str.replace(
    /[\u00A0-\u9999<>&"'`]/gim,
    (char) => `&#${char.charCodeAt(0)};`
  );
}

function decodeHtmlEntities(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export default function HTMLEntityConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    const result =
      mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    setOutput(result);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleExample = () => {
    const example =
      mode === "encode"
        ? `<h1>This is "bold" & <em>important</em></h1>`
        : `&lt;h1&gt;This is &quot;bold&quot; &amp; &lt;em&gt;important&lt;/em&gt;&lt;/h1&gt;`;
    setInput(example);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>HTML Entities Encoder/Decoder Online | Free & Secure Converter</title>
        <meta name="description" content="Encode or decode HTML entities like &lt;, &gt;, &amp;, &quot;, and &#39; instantly. Fast, privacy-friendly online tool for safe HTML string conversion." />
        <meta name="keywords" content="HTML entities encoder, HTML entities decoder, encode HTML, decode HTML, online HTML converter, web developer tools, free HTML entity tool" />
        <meta name="author" content="DevToolbox" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tools/html-entities" />
        {/* Open Graph tags */}
        <meta property="og:title" content="HTML Entities Encoder/Decoder Online – Free & Secure Converter" />
        <meta property="og:description" content="Encode or decode HTML entities like &lt;, &gt;, &amp;, &quot;, and &#39; instantly. Fast, privacy-friendly online tool for safe HTML string conversion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/html-entities" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="HTML Entities Encoder/Decoder Online – Free & Secure Converter" />
        <meta name="twitter:description" content="Encode or decode HTML entities like &lt;, &gt;, &amp;, &quot;, and &#39; instantly. Fast, privacy-friendly online tool for safe HTML string conversion." />
        {/* JSON-LD WebApplication Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HTML Entities Encoder/Decoder",
        "url": "https://yourdomain.com/tools/html-entities",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "Encode or decode HTML entities like <, >, &, \", and ' instantly. Fast, privacy-friendly online tool for safe HTML string conversion.",
        "featureList": [
          "Encode HTML entities",
          "Decode HTML entities",
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

      <h1 className="text-2xl font-bold mb-4">
        HTML Entities Encoder / Decoder
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Safely convert between raw HTML and encoded strings. Useful for
        developers handling user-generated content or HTML in JavaScript/React.
        Select encode or decode mode, and paste your text below.
      </p>

      <div className="mb-4">
        <label className="mr-4 font-medium">Mode:</label>
        <select
          className="bg-gradient-to-r from-white to-gray-200 text-gray-900 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
          value={mode}
          onChange={(e) => setMode(e.target.value as "encode" | "decode")}
        >
          <option value="encode">Encode HTML Entities</option>
          <option value="decode">Decode HTML Entities</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <label className="font-semibold mb-2">Input</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border border-gray-200 rounded text-sm text-white"
            placeholder="Paste your text or HTML here..."
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
          <label className="font-semibold mb-2">Output</label>
          <textarea
            className="w-full h-60 p-3 bg-gray-900 border rounded text-sm text-green-300"
            placeholder="Output will appear here..."
            value={output}
            readOnly
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

      <section className="mt-10 text-gray-300">
        <h2 className="text-xl font-semibold mb-3 text-white">
          What is an HTML Entities Encoder/Decoder?
        </h2>
        <p className="mb-4">
          An HTML Entities Encoder/Decoder tool helps developers convert special
          characters like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>,
          and quotes into safe HTML entity codes (such as <code>&amp;lt;</code> or
          <code>&amp;gt;</code>). Encoding is useful when you need to display code or
          user input on a webpage without executing it. Decoding reverses the process,
          turning encoded entities back into readable text or HTML.
        </p>

        <h3 className="font-semibold text-white mb-2">
          Why Do You Need HTML Entity Encoding?
        </h3>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>Prevents XSS (Cross-Site Scripting) vulnerabilities</li>
          <li>Ensures special symbols display correctly on webpages</li>
          <li>Safely show code snippets in documentation or blogs</li>
          <li>Improves browser compatibility for HTML content</li>
        </ul>

        <h3 className="font-semibold text-white mb-2">
          When Should You Decode HTML Entities?
        </h3>
        <p className="mb-4">
          Decoding HTML entities is essential when retrieving or displaying stored
          HTML content, such as from databases or APIs. It ensures text like
          <code>&amp;amp;</code> is shown as <code>&amp;</code>, improving user
          readability. This is common in CMS systems, JavaScript frameworks, and form
          submissions.
        </p>

        <h3 className="font-semibold text-white mb-2">Common Encoded Characters</h3>
        <table className="w-full text-sm border border-gray-700 text-left mb-6">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="px-3 py-2 border border-gray-700">Character</th>
              <th className="px-3 py-2 border border-gray-700">Entity Name</th>
              <th className="px-3 py-2 border border-gray-700">Entity Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border border-gray-700">&lt;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;lt;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;#60;</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">&gt;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;gt;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;#62;</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">&amp;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;amp;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;#38;</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">"</td>
              <td className="px-3 py-2 border border-gray-700">&amp;quot;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;#34;</td>
            </tr>
            <tr>
              <td className="px-3 py-2 border border-gray-700">'</td>
              <td className="px-3 py-2 border border-gray-700">&amp;apos;</td>
              <td className="px-3 py-2 border border-gray-700">&amp;#39;</td>
            </tr>
          </tbody>
        </table>

        <h3 className="font-semibold text-white mb-2">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">1. What are HTML entities?</h4>
            <p>
              HTML entities are codes used to represent reserved characters in HTML
              that might otherwise be interpreted as code. For example,
              <code>&amp;lt;</code> represents a less-than sign.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              2. How do I encode HTML entities in JavaScript?
            </h4>
            <p>
              You can use this tool or use <code>textContent</code> or DOM-based
              escaping to safely encode user input.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              3. Why should developers encode HTML before rendering user input?
            </h4>
            <p>
              To prevent malicious users from injecting scripts or markup that could
              break your layout or cause security risks like XSS.
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
                "name": "What are HTML entities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "HTML entities are codes used to represent reserved characters in HTML that might otherwise be interpreted as code."
                }
              },
              {
                "@type": "Question",
                "name": "How do I encode HTML entities in JavaScript?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "You can use this tool or use textContent or DOM-based escaping to safely encode user input."
                }
              },
              {
                "@type": "Question",
                "name": "Why should developers encode HTML before rendering user input?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Encoding HTML prevents malicious scripts or markup injection, helping protect your website from XSS vulnerabilities."
                }
              }
            ]
          })
        }}
      />
    </ToolLayout>
  );
}
