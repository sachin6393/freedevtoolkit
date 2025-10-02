"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function StringWordCounter() {
  const [text, setText] = useState("");

  const handleReset = () => setText("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCountWithSpaces = text.length;
  const charCountWithoutSpaces = text.replace(/\s/g, "").length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "String / Word Counter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "Free online String / Word Counter that counts words and characters (with or without spaces) instantly in your browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Your Website Name",
      url: "https://yourwebsite.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Word Counter?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A word counter is a free online tool that counts the total number of words, characters, and spaces in your text. It helps writers, students, and editors meet content length limits.",
        },
      },
      {
        "@type": "Question",
        name: "Is this Word Counter tool accurate?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. This Word Counter provides real-time, highly accurate counts for words, characters (with spaces), and characters (without spaces).",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool store my text?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Your input is processed entirely within your browser. No text or data is uploaded or stored on any server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this tool for essays or tweets?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Absolutely. This tool is perfect for tracking character limits for essays, tweets, captions, or articles.",
        },
      },
    ],
  };
  

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>String / Word Counter - Count Characters & Words Online</title>
        <meta
          name="description"
          content="Free String / Word Counter that accurately counts words and characters (with or without spaces). Use this fast, minimal, browser-based tool to analyze your text."
        />
        <meta
          name="keywords"
          content="string counter, word counter, character counter, count words online, count characters online, free word counter tool"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">String / Word Counter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Paste or type your text below to instantly count words and characters
        (with and without spaces).
      </p>

      <textarea
        className="w-full h-48 p-4 border rounded bg-gray-900 text-white resize-none"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleReset}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          disabled={!text}
        >
          Reset
        </button>
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded p-4 text-gray-900 dark:text-green-300">
        <p>
          <strong>Word Count:</strong> {wordCount}
        </p>
        <p>
          <strong>Character Count (with spaces):</strong> {charCountWithSpaces}
        </p>
        <p>
          <strong>Character Count (without spaces):</strong>{" "}
          {charCountWithoutSpaces}
        </p>
      </div>
      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
       <section className="mt-10 text-gray-300 leading-relaxed">
        <h2 className="text-xl font-semibold mb-2">
          About This String / Word Counter Tool
        </h2>
        <p>
          This free online <strong>String / Word Counter</strong> is designed
          for writers, editors, students, developers, and anyone who needs to
          quickly analyze their text. It instantly calculates the{" "}
          <strong>word count</strong>,
          <strong>character count with spaces</strong>, and{" "}
          <strong>character count without spaces</strong> as you type or paste
          your content.
        </p>
        <p className="mt-2">
          Whether you're writing an article, preparing for a social media post,
          submitting an essay with a word limit, or just need a fast and
          accurate <strong>character counter</strong>, this tool gets the job
          done in real-time — right in your browser.
        </p>
        <p className="mt-2">
          No data is stored or uploaded; all processing happens locally, making
          it both secure and lightning fast. Use this tool to improve
          readability, track your progress, or meet strict content limits
          without the need for any signup or installation.
        </p>
      </section>
    </ToolLayout>
  );
}
