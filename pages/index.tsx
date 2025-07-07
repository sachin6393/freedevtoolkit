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
    name: 'Base64 Encoder/Decoder',
    href: '/tools/base64-encoder-decoder',
    description:
      'Encode or decode Base64 strings quickly. Useful for data encoding, API requests, and file transfers.'
  },
  {
    name: 'URL Encoder/Decoder',
    href: '/tools/url-encoder-decoder',
    description:
      'Encode or decode URLs to ensure safe transmission over the web. Handles special characters and spaces.'
  },
  {
    name: 'Hex to Decimal Converter',
    href: '/tools/hex-to-decimal',
    description:
      'Convert hexadecimal numbers to decimal format easily. Useful for developers working with color codes, memory addresses, and more.'
  },
  {
    name: 'Decimal to Hex Converter',
    href: '/tools/decimal-to-hex',
    description:
      'Transform decimal numbers into hexadecimal format for programming, debugging, and data representation.'
  },
  {
    name: 'Binary to Decimal Converter',
    href: '/tools/binary-to-decimal',
    description:
      'Convert binary numbers into decimal format quickly. Ideal for computer science students and developers.'
  },
  {
    name: 'Decimal to Binary Converter',
    href: '/tools/decimal-to-binary',
    description:
      'Easily convert decimal numbers into binary format for programming, electronics, and data analysis.'
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
      <h1 className="text-3xl font-extrabold mb-5 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                🚀 List of Tools
      </h1>
      <div className="w-100% h-1 mx-auto mb-5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow"></div>

      {tools.map((tool, index) => (
        <div key={tool.href} className="mb-8">
          <h2 className="text-1xl font-semibold">

            <Link href={tool.href}
            className="text-blue-300 hover:text-blue-500 transition-colors duration-200 ease-in-out inline-block hover:scale-105 transform"
            >{tool.name}</Link>
          </h2>
          <p className="text-white-700 mt-2">{tool.description}</p>

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
