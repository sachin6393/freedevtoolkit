"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function PxRemConverter() {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [pxValue, setPxValue] = useState("");
  const [remValue, setRemValue] = useState("");

  const convertPxToRem = (px: number, base: number) =>
    (px / base).toFixed(4).replace(/\.?0+$/, "");

  const convertRemToPx = (rem: number, base: number) =>
    (rem * base).toFixed(2).replace(/\.?0+$/, "");

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPxValue(val);
    const px = parseFloat(val);
    if (!isNaN(px)) {
      setRemValue(convertPxToRem(px, baseFontSize));
    } else {
      setRemValue("");
    }
  };

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRemValue(val);
    const rem = parseFloat(val);
    if (!isNaN(rem)) {
      setPxValue(convertRemToPx(rem, baseFontSize));
    } else {
      setPxValue("");
    }
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = parseFloat(e.target.value);
    if (!isNaN(base)) {
      setBaseFontSize(base);
      if (pxValue) {
        const px = parseFloat(pxValue);
        setRemValue(convertPxToRem(px, base));
      } else if (remValue) {
        const rem = parseFloat(remValue);
        setPxValue(convertRemToPx(rem, base));
      }
    }
  };

  const handleReset = () => {
    setPxValue("");
    setRemValue("");
    setBaseFontSize(16);
  };

  return (
    <>
      <Head>
        <title>PX to REM & REM to PX Converter – Free Online CSS Unit Tool</title>
        <meta name="description" content="Convert PX to REM and REM to PX instantly with this free online CSS unit converter. Supports custom base font sizes for accurate, responsive design conversions. No login, no tracking." />
        <meta name="keywords" content="PX to REM, REM to PX, CSS unit converter, pixel to rem, rem to pixel, responsive design, web development, font size converter, free tool" />
        <meta name="author" content="DevToolbox" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tools/px-rem-converter" />
        {/* Open Graph tags */}
        <meta property="og:title" content="PX to REM & REM to PX Converter – Free Online CSS Unit Tool" />
        <meta property="og:description" content="Convert PX to REM and REM to PX instantly with this free online CSS unit converter. Supports custom base font sizes for accurate, responsive design conversions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/px-rem-converter" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="PX to REM & REM to PX Converter – Free Online CSS Unit Tool" />
        <meta name="twitter:description" content="Convert PX to REM and REM to PX instantly with this free online CSS unit converter. Supports custom base font sizes for accurate, responsive design conversions." />
        {/* JSON-LD WebApplication Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PX to REM & REM to PX Converter",
        "url": "https://yourdomain.com/tools/px-rem-converter",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "Convert PX to REM and REM to PX instantly with this free online CSS unit converter. Supports custom base font sizes for accurate, responsive design conversions.",
        "featureList": [
          "Convert PX to REM and REM to PX",
          "Set custom base font size",
          "Instant conversion for responsive CSS",
          "Free and privacy-friendly"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    `}
        </script>
      </Head>
      <ToolLayout tools={toolList}>
        <h1 className="text-2xl font-bold mb-4">
          PX to REM & REM to PX Converter
        </h1>
        <p className="mb-6 text-gray-300 ">
          Quickly convert between pixels (PX) and rem units with precision. Adjust the base font size to match your design setup and get instant results for responsive web development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Base Font Size (px)
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white mb-4"
              value={baseFontSize}
              onChange={handleBaseChange}
              min={1}
            />

            <label className="block text-sm font-semibold mb-2 text-white">
              PX
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white mb-4"
              placeholder="Enter PX value"
              value={pxValue}
              onChange={handlePxChange}
            />

            <label className="block text-sm font-semibold mb-2 text-white">
              REM
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
              placeholder="Enter REM value"
              value={remValue}
              onChange={handleRemChange}
            />

            <button
              onClick={handleReset}
              className="mt-4 bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 text-center text-sm text-gray-600 border rounded p-4 my-8">
          [Ad Placeholder: Insert AdSense Code Here]
        </div>

        {/* --- SEO Content for Education --- */}
        <div className="text-gray-300 text-sm max-w-2xl leading-7">
          <h2 className="text-lg font-semibold mb-2 text-white">
            What is PX to REM Conversion?
          </h2>
          <p className="mb-4">
            In CSS, <strong>PX (pixels)</strong> are absolute units, while <strong>REM (root em)</strong> are relative units based on the root HTML font size. Using REM makes your layouts more flexible and scalable across different devices.
          </p>

          <h3 className="font-semibold text-white mb-2">
            PX to REM Formula:
          </h3>
          <p className="mb-4">REM = PX / Base Font Size</p>

          <h3 className="font-semibold text-white mb-2">
            REM to PX Formula:
          </h3>
          <p className="mb-4">PX = REM × Base Font Size</p>

          <h3 className="font-semibold text-white mb-2">
            Why Use REM Instead of PX?
          </h3>
          <ul className="list-disc list-inside mb-4 text-gray-300">
            <li>Better scalability and responsiveness</li>
            <li>Improved accessibility and zoom support</li>
            <li>Cleaner media queries and consistent spacing</li>
          </ul>

          <p>
            This tool helps developers convert between px and rem for efficient responsive CSS development.
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
