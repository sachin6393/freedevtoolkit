'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { toolList } from '@/components/utils/toolList';

export default function StringWordCounter() {
  const [text, setText] = useState('');

  const handleReset = () => setText('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCountWithSpaces = text.length;
  const charCountWithoutSpaces = text.replace(/\s/g, '').length;

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>String / Word Counter - Count Characters & Words Online</title>
        <meta
          name="description"
          content="Accurately count words, characters (with and without spaces) in your text using this online string/word counter tool. Fast, minimal, and SEO-friendly."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">String / Word Counter</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Paste or type your text below to instantly count words and characters (with and without spaces).
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
        <p><strong>Word Count:</strong> {wordCount}</p>
        <p><strong>Character Count (with spaces):</strong> {charCountWithSpaces}</p>
        <p><strong>Character Count (without spaces):</strong> {charCountWithoutSpaces}</p>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
