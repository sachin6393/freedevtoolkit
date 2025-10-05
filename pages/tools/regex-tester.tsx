'use client';

import { useState } from 'react';
import Head from "next/head";
import { toolList } from "@/components/utils/toolList";
import ToolLayout from "@/components/ToolLayout";

export default function RegexTester() {
  const [regexInput, setRegexInput] = useState('');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState('');
  const [flags, setFlags] = useState({ i: false, m: false, g: false, s: false });

  const handleToggle = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleTest = () => {
    try {
      const enabledFlags = Object.entries(flags)
        .filter(([_, val]) => val)
        .map(([key]) => key)
        .join('');

      const regex = new RegExp(regexInput, enabledFlags);
      const match = regex.test(testString);
      setResult(match ? '✅ Matches test string' : '❌ No match found');
    } catch (err) {
      setResult('❌ Invalid regular expression');
    }
  };

  const handleReset = () => {
    setRegexInput('');
    setTestString('');
    setResult('');
    setFlags({ i: false, m: false, g: false, s: false });
  };

  return (
    <>
      <ToolLayout tools={toolList}>
        <Head>
          <title>Online Regex Tester & Validator – Free Regular Expression Tool</title>
          <meta name="description" content="Test and debug regular expressions online. Instantly validate regex patterns, check flags like i, g, m, s, and see matches in real-time. Free regex tester for developers." />
          <meta name="keywords" content="regex tester, regular expression, regex validator, online regex tool, regex flags, pattern matching, developer tools" />
          <meta name="author" content="FreeDevToolKit" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://yourdomain.com/tools/regex-tester" />
          {/* Open Graph tags */}
          <meta property="og:title" content="Online Regex Tester & Validator – Free Regular Expression Tool" />
          <meta property="og:description" content="Test and debug regular expressions online. Instantly validate regex patterns, check flags like i, g, m, s, and see matches in real-time. Free regex tester for developers." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomain.com/tools/regex-tester" />
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Online Regex Tester & Validator – Free Regular Expression Tool" />
          <meta name="twitter:description" content="Test and debug regular expressions online. Instantly validate regex patterns, check flags like i, g, m, s, and see matches in real-time. Free regex tester for developers." />
          {/* JSON-LD WebApplication Structured Data */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Regex Tester & Validator",
              "url": "https://yourdomain.com/tools/regex-tester",
              "applicationCategory": "DeveloperTool",
              "operatingSystem": "All",
              "description": "A free online regex tester that allows developers to test, debug, and validate regular expressions instantly.",
              "featureList": [
                "Test and validate regex patterns",
                "Toggle flags: i, g, m, s",
                "Instant match results",
                "Free and privacy-friendly"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }} />
          {/* JSON-LD FAQ Structured Data */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is a Regex Tester?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A regex tester allows you to validate regular expressions online and check how patterns match strings instantly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I test a regex pattern online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Enter your regex in the input box and provide a test string. Click 'Test Regex' to see if your pattern matches."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are regex flags?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flags like i (case-insensitive), g (global), m (multiline), and s (dotall) modify how your regex matches text."
                  }
                }
              ]
            })
          }} />
        </Head>

        <h1 className="text-2xl font-bold mb-4">Regex Tester & Validator</h1>
        <p className="mb-6 text-gray-300 max-w-1xl">
          This tool allows you to test and validate regular expressions in real-time.
          Enter your regex pattern and a test string to see if they match. You can also toggle flags like case-insensitive, global, and multiline to customize the behavior of your regex.
        </p>

        <label className="block mb-2 font-medium">Regular Expression</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 bg-gray-800 rounded border border-gray-700"
          placeholder="e.g. ^[a-z]+$"
          value={regexInput}
          onChange={(e) => setRegexInput(e.target.value)}
        />

        <label className="block mb-2 font-medium">Test String</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 mb-4 bg-gray-800 rounded border border-gray-700"
          placeholder="Enter test string..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
        />

        <div className="flex gap-6 mb-6 flex-wrap">
          {['i', 'm', 'g', 's'].map((flag) => (
            <label key={flag} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={flags[flag as keyof typeof flags]}
                onChange={() => handleToggle(flag as keyof typeof flags)}
                className="accent-blue-500 w-5 h-5"
              />
              <span className="text-sm">{flag} - {flagDescription(flag)}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleTest}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Test Regex
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
            <p className="text-lg font-medium">{result}</p>
          </div>
        )}

        {/* Ad Placeholder */}
        <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
          [Ad Placeholder: Insert AdSense Code Here]
        </div>

        {/* ✅ SEO Content */}
        <section className="text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Why Use a Regex Tester?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Instantly debug and validate complex regex patterns.</li>
            <li>Save time by testing your expressions before using them in code.</li>
            <li>Understand flag behavior like <code>i</code>, <code>g</code>, <code>m</code>, and <code>s</code>.</li>
            <li>Free and privacy-friendly — no data is sent to any server.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Common Use Cases</h3>
          <p className="mb-4">
            Regular expressions are powerful for pattern matching — used in validation, parsing, search-and-replace, and data cleaning.
            Whether you’re a frontend or backend developer, this regex tester makes it easier to experiment and learn.
          </p>

          <h3 className="text-lg font-semibold mb-2">Learn Regex Quickly</h3>
          <p>
            Not sure where to start? Try patterns like <code>^[a-z]+$</code> for lowercase validation or
            <code>\d{3}-\d{2}-\d{4}</code> for numeric formats. Experiment freely and learn by doing!
          </p>
        </section>
      </ToolLayout>
    </>
  );
}

function flagDescription(flag: string) {
  switch (flag) {
    case 'i': return 'case-insensitive';
    case 'm': return 'multiline';
    case 'g': return 'global';
    case 's': return 'dot matches all';
    default: return '';
  }
}
