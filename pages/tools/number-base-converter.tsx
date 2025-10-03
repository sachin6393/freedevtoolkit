'use client';

import { useState } from 'react';
import Head from 'next/head';
import { toolList } from '@/components/utils/toolList';
import ToolLayout from '@/components/ToolLayout';

export default function BaseConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState('');

  const baseOptions = [
    { value: 2, label: 'Base 2 (Binary)' },
    { value: 8, label: 'Base 8 (Octal)' },
    { value: 10, label: 'Base 10 (Decimal)' },
    { value: 16, label: 'Base 16 (Hexadecimal)' },
  ];

  const handleConvert = () => {
    try {
      const parsed = parseInt(inputValue, fromBase);
      if (isNaN(parsed)) {
        setResult('❌ Invalid input for selected base');
        return;
      }
      const converted = parsed.toString(toBase).toUpperCase();
      setResult(`${converted}`);
    } catch {
      setResult('❌ Conversion error');
    }
  };

  const handleReset = () => {
    setInputValue('');
    setFromBase(10);
    setToBase(2);
    setResult('');
  };

  return (
    <>
      <ToolLayout tools={toolList}>
        <Head>
          <title>Base Converter - Binary, Decimal, Octal, Hexadecimal | Converter Tools</title>
          <meta
            name="description"
            content="Easily convert numbers between binary, decimal, octal, and hexadecimal formats. A fast, accurate, and developer-friendly base converter tool for quick conversions."
          />
          <meta name="robots" content="index, follow" />
          <meta
            property="og:title"
            content="Base Converter - Binary, Decimal, Octal, Hexadecimal | Converter Tools"
          />
          <meta
            property="og:description"
            content="Easily convert numbers between binary, decimal, octal, and hexadecimal formats. Fast and accurate base converter tool for developers and students."
          />
          <meta property="og:type" content="website" />

          {/* FAQ Schema for SEO Rich Results */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is a Base Converter?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'A base converter is a tool that allows you to convert numbers between different numeral systems such as binary (base 2), decimal (base 10), octal (base 8), and hexadecimal (base 16).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why use a Base Converter?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'Developers and students use a base converter to easily convert numbers between different numeral systems used in programming, networking, and computer architecture.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How to convert binary to decimal?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text:
                        'To convert binary to decimal, select "Base 2 (Binary)" as the input and "Base 10 (Decimal)" as the output, then enter your binary number (e.g., 1010). The converter will display the decimal result (10).',
                    },
                  },
                ],
              }),
            }}
          />
        </Head>

        <h1 className="text-2xl font-bold mb-4">Base Converter</h1>
        <p className="mb-6 text-gray-300">
          Convert numbers between different bases such as binary, decimal, octal, and hexadecimal.
          Enter a number in one base and instantly convert it to another with this easy-to-use tool.
        </p>

        <label className="block mb-2 font-medium">Enter Number</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 bg-gray-800 rounded border border-gray-700"
          placeholder="e.g. 1010 or A3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">From Base</label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700"
            >
              {baseOptions.map((base) => (
                <option key={base.value} value={base.value}>
                  {base.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">To Base</label>
            <select
              value={toBase}
              onChange={(e) => setToBase(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700"
            >
              {baseOptions.map((base) => (
                <option key={base.value} value={base.value}>
                  {base.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleConvert}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Convert
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
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="mt-2 text-sm text-blue-500 hover:bg-blue-300 px-1 py-1 rounded"
            >
              Copy
            </button>
          </div>
        )}

        {/* Ad placeholder */}
        <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
          [Ad Placeholder: Insert AdSense Code Here]
        </div>

        {/* SEO Rich Text Section */}
        <div className="mt-10 text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Why Use a Base Converter?</h2>
          <p className="mb-4">
            In computer science and programming, different numeral systems like binary, octal, 
            decimal, and hexadecimal are widely used. Converting between these systems manually can 
            be error-prone. A base converter helps you perform accurate and instant conversions.
          </p>

          <h3 className="font-semibold text-white mb-2">Common Base Conversions</h3>
          <ul className="list-disc list-inside mb-4 text-gray-300">
            <li>Binary (Base 2) ↔ Decimal (Base 10)</li>
            <li>Decimal (Base 10) ↔ Hexadecimal (Base 16)</li>
            <li>Binary (Base 2) ↔ Hexadecimal (Base 16)</li>
            <li>Octal (Base 8) ↔ Decimal (Base 10)</li>
          </ul>

          <h3 className="font-semibold text-white mb-2">Where Is It Useful?</h3>
          <p>
            Base conversion is essential in programming, embedded systems, cryptography, and 
            computer architecture. Developers often use it to debug binary data, calculate 
            memory addresses, or convert color codes and bitwise operations.
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
