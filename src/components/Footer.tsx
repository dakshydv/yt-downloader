export function Footer() {
    return <footer className="w-full py-6 px-4 border-t border-gray-700">
    <div className="container max-w-6xl mx-auto text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} YT-Downloader. All rights reserved.</p>
      <p className="text-sm mt-2">This tool is for personal use only. Please respect copyright laws.</p>
    </div>
  </footer>
}