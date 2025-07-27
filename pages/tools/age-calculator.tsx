'use client';

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from '@/components/utils/toolList';

export default function AgeCalculator() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateAge = () => {
    if (!fromDate || !toDate) return;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setResult("Invalid date range");
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    const temp = new Date(start);
    temp.setFullYear(temp.getFullYear() + diffYears);
    temp.setMonth(temp.getMonth() + remainingMonths);
    const remainingDays = Math.floor((end.getTime() - temp.getTime()) / (1000 * 60 * 60 * 24));

    const output = [
      `${diffYears} years ${remainingMonths} months ${remainingDays} days`,
      `or ${diffMonths} months ${remainingDays} days`,
      `or ${diffWeeks} weeks ${diffDays % 7} days`,
      `or ${diffDays.toLocaleString()} days`,
      `or ${diffHours.toLocaleString()} hours`,
      `or ${diffMinutes.toLocaleString()} minutes`,
      `or ${diffSeconds.toLocaleString()} seconds`,
    ].join("\n");

    setResult(output);
  };

  const reset = () => {
    setFromDate("");
    setToDate("");
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
    //   alert("Copied to clipboard!");
    }
  };

  return (
    <>
      <Head>
        <title>Age Calculator — Years, Months, Days</title>
        <meta
          name="description"
          content="Calculate age or time duration between two dates. View the result in years, months, weeks, days, hours, minutes, and seconds."
        />
      </Head>
      <ToolLayout tools={toolList}>
          <h1 className="text-2xl font-bold mb-4">Age Calculator</h1>
          <p className="mb-6 text-gray-300">
            Enter two dates to find the duration between them — in years, months, days, and more.
          </p>

          <div className="flex gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={calculateAge}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Calculate
            </button>
            <button
              onClick={reset}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Reset
            </button>
            {result && (
              <button
                onClick={copyResult}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Copy Result
              </button>
            )}
          </div>

          {result && (
            <pre className="bg-gray-900 border border-gray-700 text-green-300 rounded p-4 whitespace-pre-wrap">
              {result}
            </pre>
          )}
          
      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>
      
      </ToolLayout>
    </>
  );
}

