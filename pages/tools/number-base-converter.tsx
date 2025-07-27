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
  { value: 16, label: 'Base 16 (Hex)' },
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
          <title>Base Converter - Binary, Decimal, Hex | Converter Tools</title>
          <meta
            name="description"
            content="Convert numbers between binary, decimal, octal, and hexadecimal bases. Fast and accurate base converter tool for developers and students."
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Base Converter - Binary, Decimal, Hex | Converter Tools" />
          <meta property="og:description" content="Convert numbers between binary, decimal, octal, and hexadecimal bases. Fast and accurate base converter tool for developers and students." />
          <meta property="og:type" content="website" />
        </Head>

        <h1 className="text-2xl font-bold mb-4">Base Converter</h1>
        <p className="mb-6 text-gray-300">
          Convert numbers between different bases (binary, decimal, octal, hexadecimal). 
          Enter a number in the selected base and convert it to another base.
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

        
      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
      
      </ToolLayout>
    </>
  );
}
