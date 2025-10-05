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
          <title>Free Color Converter – HEX, RGB, HSL | Free Online color converter Tool</title>
          <meta name="description" content="Convert colors between HEX, RGB, and HSL formats instantly. Live preview and precise color code conversions for designers and developers. Free, fast, and privacy-friendly." />
          <meta name="keywords" content="color converter, hex to rgb, rgb to hex, hsl converter, color format converter, css color, web design, frontend tools" />
          <meta name="author" content="DevToolbox" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://yourdomain.com/tools/color-converter" />
          {/* Open Graph tags */}
          <meta property="og:title" content="Color Converter – HEX, RGB, HSL | Free Online Tool" />
          <meta property="og:description" content="Convert colors between HEX, RGB, and HSL formats instantly. Live preview and precise color code conversions for designers and developers." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomain.com/tools/color-converter" />
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Color Converter – HEX, RGB, HSL | Free Online Tool" />
          <meta name="twitter:description" content="Convert colors between HEX, RGB, and HSL formats instantly. Live preview and precise color code conversions for designers and developers." />
          {/* JSON-LD SoftwareApplication Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Color Converter",
                "applicationCategory": "DeveloperTool",
                "operatingSystem": "Any",
                "description": "Free online color converter that instantly converts between HEX, RGB, and HSL formats with live preview support.",
                "url": "https://yourdomain.com/tools/color-converter",
                "keywords": "color converter, hex to rgb, rgb to hex, hsl converter, color format converter",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              })
            }}
          />
          {/* JSON-LD FAQ Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a Color Converter?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A color converter allows you to convert colors between HEX, RGB, and HSL formats. It helps designers and developers maintain consistent color values across platforms."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How to convert HEX to RGB?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Enter your HEX code (like #3498db) in the input box. The tool automatically displays its RGB and HSL equivalents instantly."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why use RGB or HSL instead of HEX?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RGB is often used in digital displays and CSS animations, while HSL provides intuitive control over hue, saturation, and lightness for design adjustments."
                    }
                  }
                ]
              })
            }}
          />
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

        {/* ✅ Ad Placeholder */}
        <div className="my-8 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
          [Ad Placeholder: Insert AdSense Code Here]
        </div>

        {/* ✅ SEO-Rich Section */}
        <section className="text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Why Use a Color Converter?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Quickly convert between HEX, RGB, and HSL formats for web design.</li>
            <li>See instant visual previews of your color conversions.</li>
            <li>Ensure consistent colors across CSS, Figma, and design systems.</li>
            <li>Free, fast, and privacy-friendly — no color data stored.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Common Use Cases</h3>
          <p className="mb-4">
            This tool is perfect for web designers, frontend developers, and UI/UX professionals who need to quickly
            convert and preview colors. Use it when styling websites, working with CSS variables, or generating themes.
          </p>

          <h3 className="text-lg font-semibold mb-2">Color Conversion Examples</h3>
          <p>
            Example: <code>#ff5733</code> → <code>rgb(255, 87, 51)</code> → <code>hsl(11°, 100%, 60%)</code>.
            Experiment with any HEX, RGB, or HSL code to understand how they relate.
          </p>
        </section>
      </ToolLayout>
    </>
  );
}
