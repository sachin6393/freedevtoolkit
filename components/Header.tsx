import Link from 'next/link';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className=" top-0 z-50 bg-[#222] border-b shadow px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
        🧰 Converters ToolKit
      </Link>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden bg-gray-700 text-white px-3 py-1 rounded text-sm"
      >
        {sidebarOpen ? '✖ Close' : '☰ Menu'}
      </button>
    </header>
  );
}
