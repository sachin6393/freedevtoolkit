"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

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

    // Clone start date to avoid mutation
    let temp = new Date(start);
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Adjust for negative day difference
    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); // last day of previous month
      days += prevMonth.getDate();
    }

    // Adjust for negative month difference
    if (months < 0) {
      years--;
      months += 12;
    }

    // Now calculate full differences in other units
    const diffMs = end.getTime() - start.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const totalMonths = years * 12 + months;

    const output = [
      `${years} years ${months} months ${days} days`,
      `or ${totalMonths} months ${days} days`,
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
          Enter two dates to find the duration between them — in years, months,
          days, and more.
        </p>

        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To Date
            </label>
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
        <section className="mt-6 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">
            What is an Age Calculator?
          </h2>
          <p>
            An Age Calculator is a simple online tool that helps you calculate
            the exact time between two dates. Whether you're trying to find your
            exact age, determine the time passed since an event, or calculate
            the age of something historical, this tool gives you accurate
            results in years, months, days, hours, minutes, and seconds.
          </p>
          <p className="mt-2">
            This age calculator is especially useful for finding age on a
            specific date, comparing date ranges, or measuring time intervals in
            detail. It handles leap years, month wraparounds, and time zone
            issues with precision.
          </p>
          <p className="mt-2">
            You can use it for birthdays, anniversaries, historical timelines,
            or professional scenarios where exact time duration is important.
            All calculations happen instantly in your browser — no data is
            uploaded.
          </p>
        </section>
      </ToolLayout>
    </>
  );
}
