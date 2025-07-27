'use client';

import { useState } from 'react';
import Head from "next/head";
import { toolList} from "@/components/utils/toolList";
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
        <title>Online Regex Tester & Validator - Converter Tools</title>
        <meta
          name="description"
          content="Test and debug regular expressions online. Instantly validate regex patterns, see matches, and learn flag meanings. Fast, privacy-friendly regex tester for developers."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Online Regex Tester & Validator - Converter Tools" />
        <meta property="og:description" content="Test and debug regular expressions online. Instantly validate regex patterns, see matches, and learn flag meanings. Fast, privacy-friendly regex tester for developers." />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://convertertools.com/tools/regex-tester" />
        <meta property="og:image" content="https://convertertools.com/og-image.png" /> */}
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
