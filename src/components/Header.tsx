import { Youtube } from "lucide-react";

export function Header() {
    return <header className="w-full py-6 px-4 flex justify-center items-center border-b border-gray-700">
    <div className="container max-w-6xl flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Youtube className="text-red-500" size={32} />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-red-500">YT</span>-Downloader
        </h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-red-400 transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-red-400 transition-colors">How It Works</a></li>
          <li><a href="#" className="hover:text-red-400 transition-colors">FAQ</a></li>
        </ul>
      </nav>
    </div>
  </header>
}