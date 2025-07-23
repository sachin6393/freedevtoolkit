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
    </ToolLayout>
  );
}
