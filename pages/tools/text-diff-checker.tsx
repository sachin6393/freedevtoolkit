'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";
import { diffLines, diffWords, Change } from "diff";

const CHAR_LIMIT = 10000; // Limit for performance

export default function TextDiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffType, setDiffType] = useState<"line" | "word">("line");
  const [diffLeft, setDiffLeft] = useState<string[]>([]);
  const [diffRight, setDiffRight] = useState<string[]>([]);
  const [error, setError] = useState("");

  const escapeHtml = (text: string) =>
    text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const handleCompare = () => {
    setError("");
    if (text1.length > CHAR_LIMIT || text2.length > CHAR_LIMIT) {
      setError(`❌ Each input is limited to ${CHAR_LIMIT} characters.`);
      return;
    }
    try {
      let diff: Change[] = [];
      if (diffType === "line") {
        diff = diffLines(text1, text2);
      } else {
        diff = diffWords(text1, text2);
      }
      const left: string[] = [];
      const right: string[] = [];

      diff.forEach((part) => {
        if (part.added) {
          // Present in B only
          left.push("");
          right.push(
            `<span class="bg-green-800 text-white rounded px-1">${escapeHtml(
              part.value
            )}</span>`
          );
        } else if (part.removed) {
          // Present in A only
          left.push(
            `<span class="bg-red-800 text-white rounded px-1">${escapeHtml(
              part.value
            )}</span>`
          );
          right.push("");
        } else {
          // Common
          const escaped = escapeHtml(part.value);
          left.push(`<span>${escaped}</span>`);
          right.push(`<span>${escaped}</span>`);
        }
      });

      setDiffLeft(left);
      setDiffRight(right);
    } catch (e) {
      setError("❌ Error while comparing text.");
    }
  };

  const handleReset = () => {
    setText1("");
    setText2("");
    setDiffLeft([]);
    setDiffRight([]);
    setError("");
  };

  const handleExample = () => {
    const a = `This is a text example.
It will be compared to another text.
This line is the same.
This line is to be removed.`;
    const b = `This is a text example.
It will be compared with another text.
This line is the same.
This line is newly added.`;
    setText1(a);
    setText2(b);
    setDiffLeft([]);
    setDiffRight([]);
    setError("");
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>Text Diff Checker - Compare Side by Side</title>
        <meta
          name="description"
          content="Compare two blocks of text side-by-side. Highlight added, removed, and changed lines or words. Fast, privacy-first text diff tool."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Text Diff Checker</h1>
      <p className="text-gray-300 mb-6">
        Compare two blocks of text side-by-side. Changes are highlighted. Useful
        for debugging, writing, and code reviews.
      </p>

      <div className="mb-4">
        <label className="mr-4 font-semibold">Comparison Type:</label>
        <select
  className="bg-gradient-to-r from-white to-gray-200 text-gray-900 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
          value={diffType}
          onChange={(e) => setDiffType(e.target.value as "line" | "word")}
        >
          <option value="line">Line by Line</option>
          <option value="word">Word by Word</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="font-semibold block mb-2">Text A</label>
          <textarea
            className="w-full h-48 p-3 bg-gray-900 border text-white rounded"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter the original text"
            maxLength={CHAR_LIMIT}
          />
        </div>
        <div>
          <label className="font-semibold block mb-2">Text B</label>
          <textarea
            className="w-full h-48 p-3 bg-gray-900 border text-white rounded"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter the modified text"
            maxLength={CHAR_LIMIT}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={handleCompare}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
        <button
          onClick={handleExample}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Load Example
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {diffLeft.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-900 p-4 rounded border overflow-auto h-[300px]">
            <h3 className="text-white font-semibold mb-2">Text A</h3>
            <pre
              className="whitespace-pre-wrap text-white"
              dangerouslySetInnerHTML={{ __html: diffLeft.join("") }}
            />
          </div>
          <div className="bg-gray-900 p-4 rounded border overflow-auto h-[300px]">
            <h3 className="text-white font-semibold mb-2">Text B</h3>
            <pre
              className="whitespace-pre-wrap text-white"
              dangerouslySetInnerHTML={{ __html: diffRight.join("") }}
            />
          </div>
        </div>
      )}

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <section className="mt-10 text-gray-300">
  <h2 className="text-xl font-semibold mb-3 text-white">
    What is a Text Diff Checker Tool?
  </h2>
  <p className="mb-4">
    A <strong>Text Diff Checker</strong> is an online tool that helps you find
    differences between two blocks of text. It visually highlights what’s been
    <span className="text-green-400 font-semibold"> added</span> or{" "}
    <span className="text-red-400 font-semibold">removed</span> — making it easy
    to compare files, paragraphs, code snippets, or document versions. This
    tool is especially useful for developers, writers, editors, and students who
    need to review revisions or track content changes efficiently.
  </p>

  <h3 className="font-semibold text-white mb-2">
    Why Use an Online Diff Checker?
  </h3>
  <ul className="list-disc list-inside mb-4 text-gray-300">
    <li>
      <strong>Code Review:</strong> Identify changes between two versions of
      code easily.
    </li>
    <li>
      <strong>Content Editing:</strong> Detect modifications between document
      drafts.
    </li>
    <li>
      <strong>Debugging:</strong> Compare log files, configuration changes, or
      JSON/XML data.
    </li>
    <li>
      <strong>Version Control:</strong> Preview differences before commits or
      merges.
    </li>
  </ul>

  <h3 className="font-semibold text-white mb-2">
    Features of This Text Diff Tool
  </h3>
  <ul className="list-disc list-inside mb-4 text-gray-300">
    <li>
      <strong>Line-by-Line Comparison:</strong> Ideal for comparing multi-line
      files or paragraphs.
    </li>
    <li>
      <strong>Word-by-Word Comparison:</strong> Great for sentence-level or
      detailed diff checking.
    </li>
    <li>
      <strong>Side-by-Side View:</strong> Clearly view original text (A) and
      modified text (B) together.
    </li>
    <li>
      <strong>Privacy-Focused:</strong> Runs entirely in your browser — no data
      is sent to any server.
    </li>
    <li>
      <strong>Performance Optimized:</strong> Handles up to 10,000 characters
      per input efficiently.
    </li>
  </ul>

  <h3 className="font-semibold text-white mb-2">
    How to Use the Text Diff Checker
  </h3>
  <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">
    <li>Paste or type your original text into the <strong>Text A</strong> box.</li>
    <li>Enter your updated or revised text into the <strong>Text B</strong> box.</li>
    <li>Select your preferred comparison mode: Line by Line or Word by Word.</li>
    <li>Click <strong>Compare</strong> to instantly view the highlighted differences.</li>
    <li>Added text is shown in <span className="text-green-400">green</span> and removed text in <span className="text-red-400">red</span>.</li>
  </ol>

  <h3 className="font-semibold text-white mb-2">
    Frequently Asked Questions (FAQs)
  </h3>
  <div className="space-y-4">
    <div>
      <h4 className="font-semibold">
        1. What does this text comparison tool do?
      </h4>
      <p>
        It compares two text blocks and highlights the differences — showing
        what’s been added, removed, or modified. Perfect for analyzing code or
        written content.
      </p>
    </div>

    <div>
      <h4 className="font-semibold">
        2. Is my text stored or uploaded anywhere?
      </h4>
      <p>
        No. This tool is fully client-side. All processing happens in your
        browser — no data is sent or stored on any external server.
      </p>
    </div>

    <div>
      <h4 className="font-semibold">
        3. What’s the difference between line and word diff?
      </h4>
      <p>
        Line diff compares entire lines, which is useful for code or
        multi-paragraph text. Word diff compares at the word level for a more
        detailed view of smaller changes.
      </p>
    </div>

    <div>
      <h4 className="font-semibold">
        4. Can I use this for comparing JSON or HTML?
      </h4>
      <p>
        Yes. You can compare structured formats like JSON, XML, or HTML.
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
          "name": "What does this text comparison tool do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It compares two text blocks and highlights the differences — showing what’s been added, removed, or modified. Useful for analyzing code or written content."
          }
        },
        {
          "@type": "Question",
          "name": "Is my text stored or uploaded anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool works entirely in your browser. Your input text never leaves your device, ensuring privacy and security."
          }
        },
        {
          "@type": "Question",
          "name": "What’s the difference between line and word diff?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Line diff compares full lines, while word diff shows detailed word-level changes. Choose based on your comparison needs."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for comparing JSON or HTML?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can use it to compare structured text like JSON, XML, or HTML as long as it's within the input limit."
          }
        }
      ]
    })
  }}
/>

    </ToolLayout>
  );
}
