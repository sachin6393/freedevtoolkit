"use client";

import React, { useEffect, useState } from "react";
import ToolLayout from "../../components/ToolLayout";
import Head from "next/head";
import { toolList } from "@/components/utils/toolList";

export default function EpochToDate() {
  const [timestamp, setTimestamp] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [currentEpoch, setCurrentEpoch] = useState("");
  const [currentEpochMs, setCurrentEpochMs] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [convertedEpoch, setConvertedEpoch] = useState("");
  const [timezone, setTimezone] = useState<"local" | "gmt">("local");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000).toString());
      setCurrentEpochMs(Date.now().toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConvert = () => {
    const ts = parseInt(timestamp, 10);
    if (!isNaN(ts)) {
      const date = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
      const formatted =
        timezone === "gmt" ? date.toUTCString() : date.toLocaleString();
      setConvertedDate(formatted);
    } else {
      setConvertedDate("Invalid timestamp");
    }
  };

  const handleDateToEpoch = () => {
    if (!dateInput) {
      setConvertedEpoch("Please select a date");
      return;
    }
    const time = timeInput || "00:00";
    const combined = `${dateInput}T${time}${timezone === "gmt" ? "Z" : ""}`;
    const date = new Date(combined);
    if (!isNaN(date.getTime())) {
      setConvertedEpoch(Math.floor(date.getTime() / 1000).toString());
    } else {
      setConvertedEpoch("Invalid date or time format");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout tools={toolList}>
      <Head>
        {/* <link rel="canonical" href="https://yourdomain.com/epoch-to-date-converter" /> */}

        <title>Epoch to Date Converter | Convert Unix Timestamp to Human Date Online</title>
        <meta name="description"
          content="Free online Epoch to Date Converter. Convert Unix timestamps to readable human dates or back instantly. Supports both GMT and local timezones."
        />
        <meta
          name="keywords"
          content="epoch to date, unix timestamp converter, convert epoch to date, human readable date, online epoch converter"
        />
        <meta property="og:title" content="Epoch to Date Converter | Convert Unix Timestamp to Human Date" />
        <meta property="og:description" content="Free online epoch converter — convert Unix timestamps to readable human dates or back instantly." />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://yourdomain.com/epoch-to-date-converter" /> */}

        <script type="application/ld+json">
          {`
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Epoch to Date Converter",
                "url": "https://yourdomain.com/epoch-to-date-converter",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "All",
                "description": "Convert Unix timestamps to readable dates or vice versa online.",
                "featureList": [
                  "Convert epoch to human date",
                  "Convert date to epoch timestamp",
                  "Support for GMT and local time",
                  "Real-time current epoch display"
  ]
              }
              `}
        </script>

      </Head>

      <h1 className="text-xl font-bold mb-4">
        Epoch & Unix Timestamp Converter
      </h1>
      <p className="mb-6 text-gray-300 text-sm">
        Convert Unix epoch timestamps to human-readable dates and vice
        versa,i.e. convert human-readable dates to Unix timestamps. Supports
        both seconds and milliseconds precision.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Current Unix Timestamp (Seconds)
        </h2>
        <div className="flex items-center space-x-2">
          <code className="text-lg bg-gray-700 px-6.5 py-1 border rounded text-white">
            {currentEpoch}
          </code>
          <button
            onClick={() => copyToClipboard(currentEpoch)}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded transition duration-200 hover:bg-blue-700 hover:scale-105 shadow hover:shadow-lg"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Current Unix Timestamp (Milliseconds)
        </h2>
        <div className="flex items-center space-x-2">
          <code className="text-lg bg-gray-700 px-6.5 py-1 border rounded text-white">
            {currentEpochMs}
          </code>
          <button
            onClick={() => copyToClipboard(currentEpochMs)}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded transition duration-200 hover:bg-blue-600 hover:scale-105 shadow hover:shadow-lg"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Convert Epoch to Date</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0 text-white bg-gray-700"
            placeholder="Enter Unix timestamp (e.g. 1719857285 or 1719857285123)"
          />
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as "local" | "gmt")}
            className="border rounded px-2 py-2 bg-gray-700 text-white"
          >
            <option value="local">Local</option>
            <option value="gmt">GMT/UTC</option>
          </select>
          <button
            onClick={handleConvert}
            className="bg-green-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-green-700 hover:scale-105 shadow hover:shadow-lg"
          >
            Convert
          </button>
        </div>
        {convertedDate && (
          <div className="mt-4 text-amber-500 flex items-center space-x-2">
            <span>
              <strong>{convertedDate}</strong>
            </span>
            <button
              onClick={() => copyToClipboard(convertedDate)}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-blue-600 hover:scale-105 shadow hover:shadow-lg"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Convert Date to Epoch</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0 text:white bg-gray-700"
          />
          <input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0 text:white bg-gray-700"
          />
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as "local" | "gmt")}
            className="border rounded px-2 py-2 bg-gray-700 text-white"
          >
            <option value="local">Local</option>
            <option value="gmt">GMT/UTC</option>
          </select>
          <button
            onClick={handleDateToEpoch}
            className="bg-green-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-green-700 hover:scale-105 shadow hover:shadow-lg"
          >
            Convert
          </button>
        </div>
        {convertedEpoch && (
          <div className="mt-4 text-amber-500 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span>
                Epoch Timestamp: <strong>{convertedEpoch}</strong>
              </span>
              <button
                onClick={() => copyToClipboard(convertedEpoch)}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-blue-600 hover:scale-105 shadow hover:shadow-lg"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                In milliseconds:{" "}
                <strong>
                  {convertedEpoch !== "" && !isNaN(Number(convertedEpoch))
                    ? Number(convertedEpoch) * 1000
                    : ""}
                </strong>
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    convertedEpoch !== "" && !isNaN(Number(convertedEpoch))
                      ? (Number(convertedEpoch) * 1000).toString()
                      : ""
                  )
                }
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-blue-600 hover:scale-105 shadow hover:shadow-lg"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
        [Ad Placeholder: Insert AdSense Code Here]
      </div>

      <section className="mt-10 text-gray-300 leading-relaxed text-sm">
        <h2 className="text-xl font-semibold mb-2">
          About Epoch & Unix Timestamp Converter
        </h2>
        <p>
          This free online <strong>Epoch & Unix Timestamp Converter</strong>{" "}
          allows you to convert Unix timestamps to human-readable dates and vice
          versa. Whether you're a developer, engineer, data analyst, or curious
          user, this tool makes it easy to work with <strong>epoch time</strong>{" "}
          — the number of seconds (or milliseconds) that have passed since
          January 1, 1970 (UTC).
        </p>
        <p className="mt-2">
          Convert <strong>epoch to date</strong> in both{" "}
          <strong>GMT/UTC</strong> and your local timezone. Or select a date and
          time to get the corresponding Unix timestamp instantly. You can also
          view the
          <strong> current Unix time</strong> in both seconds and milliseconds,
          updated in real-time.
        </p>
        <p className="mt-2">
          No server processing, no delays — all calculations are done in your
          browser to ensure your privacy and performance. It's the perfect
          utility for debugging APIs, logging time values, or working with
          databases, cron jobs, and more.
        </p>
      </section>
      <section className="mt-10 text-gray-300 leading-relaxed text-sm">
        <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
        <h3 className="font-semibold mt-3">What is an Epoch Timestamp?</h3>
        <p>Epoch or Unix time is the number of seconds that have elapsed since January 1, 1970 (UTC). It is commonly used in programming and data storage.</p>

        <h3 className="font-semibold mt-3">How do I convert a timestamp to a readable date?</h3>
        <p>Enter the epoch timestamp and click convert. The tool will display a local or GMT date instantly.</p>

        <h3 className="font-semibold mt-3">Can I convert human date back to Unix time?</h3>
        <p>Yes, select a date and time to see the corresponding Unix epoch timestamp in seconds and milliseconds.</p>
      </section>

    </ToolLayout>
  );
}
