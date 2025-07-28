import React from 'react';
import Link from 'next/link';
import ToolLayout from '@/components/ToolLayout';
import Head from 'next/dist/shared/lib/head';

const tools = [
  {
    name: 'Epoch Timestamp To Date',
    href: '/tools/epoch-to-date',
    description:
      'Convert Unix epoch timestamps into human-readable date and time formats with our fast, privacy-friendly tool. Supports both UTC and local timezones. Great for developers, data engineers, and log analysis.'
  },
  {
    name: 'XML to JSON Converter',
    href: '/tools/xml-to-json',
    description:
      'Easily convert structured XML data into clean, readable JSON format. This tool helps developers work across APIs, configurations, and data formats in real-time. Supports nested XML and attribute parsing.'
  },
  {
    name: 'JSON to XML Converter',
    href: '/tools/json-to-xml',
    description:
      'Transform JSON objects into XML structure with this lightweight online converter. Useful for integrating with legacy systems, SOAP APIs, or data migration workflows.'
  },
  {
    name: 'CSV to JSON Converter',
    href: '/tools/csv-to-json',
    description:
      'Convert CSV files into JSON format for API ingestion, databases, or structured data analysis. Upload a file or paste CSV directly to get structured JSON instantly.'
  },
  {
    name: 'CSV to XML Converter',
    href: '/tools/csv-to-xml',
    description:
      'Easily convert CSV spreadsheets into XML format for legacy systems, data exchange, and reporting. Supports custom delimiters and large datasets.'
  },
  {
    name: 'YAML to JSON Converter',
    href: '/tools/yaml-to-json',
    description:
      'Convert YAML configuration files into JSON with this instant converter. Ideal for Kubernetes configs, GitHub Actions, and DevOps pipelines.'
  },
  {
    name: 'JSON to YAML Converter',
    href: '/tools/json-to-yaml',
    description:
      'Transform JSON objects into clean YAML syntax for config files and DevOps use. Easy to use and fast, with support for nested data structures.'
  },
  {
    name: 'JSON Formatter',
    href: '/tools/json-formatter',
    description:
      'Format and beautify JSON data for better readability. This tool helps developers quickly debug and visualize JSON structures with syntax highlighting.'
  },
  {
    name: 'Text Case Converter',
    href: '/tools/text-case-converter',
    description:
      'Convert text between different cases: uppercase, lowercase, title case, sentence case, and capitalized words. Perfect for formatting text in documents, code comments, and more.'
  },
  {
    name: 'Base64 Encoder/Decoder',
    href: '/tools/base64-encoder-decoder',
    description:
      'Encode or decode Base64 strings quickly. Useful for data encoding, API requests, and file transfers.'
  },
  {
    name: 'JWT Decoder',
    href: '/tools/jwt-decoder',
    description:
      'Decode JSON Web Tokens (JWT) to inspect their payload and verify signatures. Useful for debugging and understanding JWTs.'
  },
  {
    name: 'URL Encoder/Decoder',
    href: '/tools/url-encoder-decoder',
    description:
      'Encode or decode URLs to ensure safe transmission over the web. Handles special characters and spaces.'
  },
  {
    name: 'HTML Entities Encoder/Decoder',
    href: '/tools/html-entities',
    description:
      'Encode or decode HTML entities like &lt;, &gt;, &amp;, ", &#39; instantly. Fast, SEO-friendly online tool for safe HTML string conversion.'
  },
  {
    name: 'UUID Generator',
    href: '/tools/uuid-generator',
    description:
      'Generate unique UUIDs (Universally Unique Identifiers) for database keys, session IDs, and more. Supports UUID versions 4.'
  },
  {
    name: 'SHA256 / MD5 Hash Generator',
    href: '/tools/hash-generator',
    description:
      'Generate secure SHA256 or MD5 hashes for strings. Useful for password hashing, data integrity checks, and secure encoding.'
  },
  {
    name: 'Text Diff Checker',
    href: '/tools/text-diff-checker',
    description:
      'Compare two blocks of text to see the differences highlighted. Useful for content comparison, developers, and copy editors.'
  },
  {
    name: 'String / Word Counter',
    href: '/tools/string-word-counter',
    description:
      'Count words, characters (with and without spaces) in your text. Fast and minimal online string/word counter tool.'
  },
  {
    name: 'Regex Tester',
    href: '/tools/regex-tester',
    description:
      'Test and debug regular expressions with real-time feedback. Supports syntax highlighting and error detection for efficient regex development.'
  },
  {
    name: 'Color Converter',
    href: '/tools/color-converter',
    description:
      'Convert color very fast from from hex to RGB with a live color checker .'
  },
  {
    name: 'Number Base Converter',
    href: '/tools/number-base-converter',
    description:
      'Convert numbers between different bases (e.g., binary, decimal, hexadecimal) easily. Useful for developers, data analysts, and anyone working with number systems.'
  },
  {
    name: 'Age Calculator',
    href: '/tools/age-calculator',
    description:
      'Calculate the exact age or duration between two dates in years, months, weeks, days, hours, minutes, and seconds. A fast and developer friendly tool for age calculations.'
  },
  {
    name: 'Typing Practice',
    href: '/fun/typing-practice',
    description:
      'A fun typing practice tool to help improve your speed and accuracy. See real-time feedback as you type!'
  }
];

export default function HomePage() {
  return (
    <>
        <Head>
        <title>Free Online Tools & Format Converters | Converters Toolkit</title>
        <meta name="description" content="Fast, free online tools like Epoch to Date, XML/JSON/YAML/CSV converters, built for developers & analysts. Privacy-friendly." />
      </Head>
    <ToolLayout tools={tools}>
      <h1 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                🚀 List of Tools
      </h1>
      <div className="w-100% h-1 mx-auto mb-5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow"></div>

      {tools.map((tool, index) => (
        <div key={tool.href} className="mb-8">
          <h2 className="text-xl font-semibold">

            <Link href={tool.href}
            className="text-blue-200 hover:text-blue-500 transition-colors duration-200 ease-in-out inline-block hover:scale-105 transform"
            >{tool.name}</Link>
          </h2>
          <p className="text-1xl text-white-700 mt-2">{tool.description}</p>

          {/* In-content Ad Placeholder */}
          {index > 0 && index % 2 === 0 && (
            <div className="my-6 p-4 border rounded bg-yellow-50 text-center text-sm text-gray-600">
              [Ad Placeholder: Insert AdSense Code Here]
            </div>
          )}
        </div>
      ))}
       <h1 className="text-1xl font-bold mb-6 text-center">2025 made by converter.com</h1>
       {/* <footer className="bg-yellow-50 text-center text-sm p-4 border-t">
  [Footer Ad Placeholder: Insert AdSense Code Here]
</footer> */}
    </ToolLayout>
    </>
  );
}
