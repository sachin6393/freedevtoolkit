"use client";

import React, { useState } from "react";
import Head from "next/head";
import ToolLayout from "@/components/ToolLayout";
import { toolList } from "@/components/utils/toolList";

export default function PxEmConverter() {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [pxValue, setPxValue] = useState("");
  const [emValue, setEmValue] = useState("");

  const convertPxToEm = (px: number, base: number) =>
    (px / base).toFixed(4).replace(/\.?0+$/, "");

  const convertEmToPx = (em: number, base: number) =>
    (em * base).toFixed(2).replace(/\.?0+$/, "");

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPxValue(val);
    const px = parseFloat(val);
    if (!isNaN(px)) {
      setEmValue(convertPxToEm(px, baseFontSize));
    } else {
      setEmValue("");
    }
  };

  const handleEmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmValue(val);
    const em = parseFloat(val);
    if (!isNaN(em)) {
      setPxValue(convertEmToPx(em, baseFontSize));
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
        setEmValue(convertPxToEm(px, base));
      } else if (emValue) {
        const em = parseFloat(emValue);
        setPxValue(convertEmToPx(em, base));
      }
    }
  };

  const handleReset = () => {
    setPxValue("");
    setEmValue("");
    setBaseFontSize(16);
  };

  return (
    <>
      <Head>
        <title>PX to EM & EM to PX Converter – Free Online CSS Unit Tool</title>
        <meta name="description" content="Convert PX to EM and EM to PX instantly with this free online CSS unit converter. Set base font size for accurate, responsive design conversions. No login, no tracking." />
        <meta name="keywords" content="PX to EM, EM to PX, CSS unit converter, pixel to em, em to pixel, responsive design, web development, font size converter, free tool" />
        <meta name="author" content="DevToolbox" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tools/px-em-converter" />
        {/* Open Graph tags */}
        <meta property="og:title" content="PX to EM & EM to PX Converter – Free Online CSS Unit Tool" />
        <meta property="og:description" content="Convert PX to EM and EM to PX instantly with this free online CSS unit converter. Set base font size for accurate, responsive design conversions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/px-em-converter" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="PX to EM & EM to PX Converter – Free Online CSS Unit Tool" />
        <meta name="twitter:description" content="Convert PX to EM and EM to PX instantly with this free online CSS unit converter. Set base font size for accurate, responsive design conversions." />
        {/* JSON-LD WebApplication Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PX to EM & EM to PX Converter",
        "url": "https://yourdomain.com/tools/px-em-converter",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": "Convert PX to EM and EM to PX instantly with this free online CSS unit converter. Set base font size for accurate, responsive design conversions.",
        "featureList": [
          "Convert PX to EM and EM to PX",
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
          PX to EM & EM to PX Converter
        </h1>
        <p className="mb-6 text-gray-300">
          Convert between pixels (PX) and em units with ease. Customize your
          base font size (default is 16px) to get accurate values for responsive
          web design.
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
              EM
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
              placeholder="Enter EM value"
              value={emValue}
              onChange={handleEmChange}
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

        <div className="text-gray-300 text-sm max-w-2xl leading-7">
          <h2 className="text-lg font-semibold mb-2 text-white">
            What is PX and EM?
          </h2>
          <p className="mb-4">
            <strong>PX (pixels)</strong> is an absolute unit, while{" "}
            <strong>EM</strong> is a relative unit in CSS based on the font size
            of the parent element. Converting PX to EM helps create scalable and
            responsive designs.
          </p>
          <p className="mb-4">
            EM units are relative to the font size of the current element’s
            parent. Unlike REM, which is based on the root, EM provides local
            control — making it ideal for component-level styles and nested
            element sizing.
          </p>
          <p>
            When choosing between px, rem, and em, EM units provide a powerful
            way to scale components relative to their context. This helps build
            responsive and accessible designs.
          </p>

          <h3 className="font-semibold text-white mb-2">PX to EM Formula:</h3>
          <p className="mb-4">EM = PX / Base Font Size</p>

          <h3 className="font-semibold text-white mb-2">EM to PX Formula:</h3>
          <p>PX = EM × Base Font Size</p>
          <h3 className="font-semibold text-white mb-2">
            Why Use EM Instead of PX?
          </h3>
          <ul className="list-disc list-inside mb-4 text-gray-300">
            <li>
              EM units scale based on the parent element’s font size, enabling
              more flexible layouts
            </li>
            <li>
              Great for creating modular, nested components with proportional
              sizing
            </li>
            <li>
              Improves accessibility by respecting user preferences and scaling
              behavior
            </li>
            <li>
              Works well for spacing, padding, and font sizes within reusable
              components
            </li>
          </ul>
        </div>
      </ToolLayout>
    </>
  );
}
