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
        <title>Epoch to Human Date Converter - Converter Tools</title>
        <meta
          name="description"
          content="Convert Unix epoch timestamps to readable human dates online. Instant, privacy-friendly, supports GMT and local time."
        />
      </Head>

      <h1 className="text-2xl font-bold mb-4">
        Epoch & Unix Timestamp Converter
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Current Unix Timestamp (Seconds)
        </h2>
        <div className="flex items-center space-x-2">
          <code className="text-lg bg-gray-500 px-6.5 py-1 rounded">
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
          <code className="text-lg bg-gray-500 px-3 py-1 rounded">
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
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0"
            placeholder="Enter Unix timestamp (e.g. 1719857285 or 1719857285123)"
          />
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as "local" | "gmt")}
            className="border rounded px-2 py-2 bg-gray-500 text-white"
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
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0"
          />
          <input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="w-full sm:w-auto border px-3 py-2 rounded mb-2 sm:mb-0"
          />
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as "local" | "gmt")}
            className="border rounded px-2 py-2 bg-gray-500 text-white"
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
    </ToolLayout>
  );
}
