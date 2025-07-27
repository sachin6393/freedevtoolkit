'use client';

import { useState } from 'react';
import Head from 'next/head';
import { toolList } from '@/components/utils/toolList';
import ToolLayout from '@/components/ToolLayout';
import tinycolor from 'tinycolor2';

export default function ColorConverter() {
  const [colorInput, setColorInput] = useState('#30d96e');
  const color = tinycolor(colorInput);
  const isValid = color.isValid();

  const hex = isValid ? color.toHexString().toUpperCase() : 'Invalid';
  const rgb = isValid ? color.toRgbString() : 'Invalid';
  const hsl = isValid ? color.toHslString() : 'Invalid';

  const handleReset = () => {
    setColorInput('');
  };

  return (
    <>
      <ToolLayout tools={toolList}>
        <Head>
          <title>Color Converter - HEX, RGB, HSL | Converter Tools</title>
          <meta
            name="description"
            content="Convert colors between HEX, RGB, and HSL formats. Instantly preview and validate color codes with this fast, privacy-friendly color converter tool."
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Color Converter - HEX, RGB, HSL | Converter Tools" />
          <meta property="og:description" content="Convert colors between HEX, RGB, and HSL formats. Instantly preview and validate color codes with this fast, privacy-friendly color converter tool." />
          <meta property="og:type" content="website" />
        </Head>

        <h1 className="text-2xl font-bold mb-4">Color Converter</h1>
        <p className="mb-6 text-gray-300 max-w-1xl">
          Convert colors between HEX, RGB, and HSL formats. Enter a color code to see its conversions and a live preview.
        </p>

        <label className="block mb-2 font-medium">Enter Color (HEX, RGB, or HSL)</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 bg-gray-800 rounded border border-gray-700"
          placeholder="e.g. #3498db or rgb(52, 152, 219)"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
        />

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {colorInput && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-900 rounded border border-gray-700">
              <p className="font-medium mb-2">HEX</p>
              <p className="text-blue-400">{hex}</p>
            </div>
            <div className="p-4 bg-gray-900 rounded border border-gray-700">
              <p className="font-medium mb-2">RGB</p>
              <p className="text-green-400">{rgb}</p>
            </div>
            <div className="p-4 bg-gray-900 rounded border border-gray-700">
              <p className="font-medium mb-2">HSL</p>
              <p className="text-yellow-400">{hsl}</p>
            </div>
          </div>
        )}

        {isValid && (
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <p className="font-medium mb-2">Preview</p>
            <div
              className="w-full h-24 rounded"
              style={{ backgroundColor: color.toHexString() }}
            />
          </div>
        )}
      </ToolLayout>
    </>
  );
}
