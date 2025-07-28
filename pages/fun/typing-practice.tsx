// pages/tools/typing-practice.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ToolLayout from '@/components/ToolLayout';
import { toolList } from '@/components/utils/toolList';

const sampleSentences = [
  "Typing is a skill that improves with practice.\nKeep your fingers on the home row.",
  "Consistency and focus are keys to better typing.\nAvoid looking at the keyboard.",
  "Practice makes perfect. Don't give up easily.\nEven slow progress is progress.",
  "Accuracy is more important than speed at first.\nLater, both will improve together.",
  "Typing is a foundational skill for developers.\nSharpen it a little every day.",
];

function getRandomSentence(): string {
  return sampleSentences[Math.floor(Math.random() * sampleSentences.length)];
}

export default function TypingPractice() {
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setTargetText(getRandomSentence());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleNext = () => {
    setUserInput('');
    setTargetText(getRandomSentence());
  };

  const handleReset = () => {
    setUserInput('');
  };

  const renderFeedback = () => {
    const allChars = targetText.split('');
    return (
      <pre className="whitespace-pre-wrap font-mono text-lg">
        {allChars.map((char, idx) => {
          const typedChar = userInput[idx];
          const className =
            typedChar == null
              ? 'text-[#d0dd46]'
              : typedChar === char
              ? 'text-green-500'
              : 'text-red-500';

          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </pre>
    );
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        <title>Typing Practice Tool - Just for Fun</title>
        <meta
          name="description"
          content="A fun typing practice tool to help improve your speed and accuracy. See real-time feedback as you type!"
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Typing Practice Tool</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Practice your typing skills by matching the sentence shown below. Your typed characters will be color-coded in real-time.
      </p>

      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
        {renderFeedback()}
      </div>

      <textarea
        className="w-full h-32 p-4 rounded border text-lg font-mono focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleInputChange}
      />

      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          onClick={handleReset}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next Sentence
        </button>
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
    </ToolLayout>
  );
}
