import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Header from "./Header";

interface Tool {
  name: string;
  href: string;
}

interface Props {
  tools: Tool[];
  children: ReactNode;
}

export default function ToolLayout({ tools, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-gray-100 border-r w-64 p-4 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-40 h-full md:h-auto`}
        >
          <h2 className="text-lg text-black font-semibold mb-1">
              Tools
          </h2>
          <div className="w-full h-1 mb-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow"></div>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="text-sm text-black hover:text-blue-600 hover:scale-105 transition duration-200 inline-block"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-yellow-100 border border-yellow-300 text-center text-yellow-900 font-semibold text-base shadow rounded-lg">
            [Sidebar Advertisement]
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
