"use client"
import { Download, Youtube } from 'lucide-react';
import { useRef, useState } from 'react';
import axios from 'axios'

export default function YTDownloaderLanding() {
  const backendUrl: string = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '';
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const linkRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      setError('Please enter a valid YouTube URL');
      setTimeout(() => setError(''), 3000);
      return;
    }

    axios.post(backendUrl, {
      url: url
    })

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setUrl('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 flex justify-center items-center border-b border-gray-700">
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

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Download YouTube Videos <span className="text-red-500">Easily</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Quickly save your favorite YouTube videos directly to your device with our simple downloader tool.
          </p>

          {/* Download Input Area */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative bg-gray-800 rounded-lg p-1">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow relative">
                    <input
                      ref={linkRef}
                      type="text"
                      placeholder="Paste YouTube video URL here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-gray-900 text-white border-0 rounded-l-lg py-4 px-6 md:text-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    {error && (
                      <p className="absolute -bottom-8 left-0 text-red-400 text-sm">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className={`mt-3 md:mt-0 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg md:rounded-l-none py-4 px-8 font-medium flex items-center justify-center transition-all duration-300 ${
                      isLoading ? 'opacity-70' : 'hover:from-red-500 hover:to-red-400'
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Download className="mr-2" size={20} />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-300">Simply paste the YouTube URL and click download. No technical knowledge required.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <path d="M13 2v7h7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-300">Download videos in various formats and quality options to suit your needs.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V8"></path>
                  <path d="M17 11h-5v5"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Download</h3>
              <p className="text-gray-300">Our efficient processing ensures your videos are downloaded quickly and reliably.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-gray-700">
        <div className="container max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} YT-Downloader. All rights reserved.</p>
          <p className="text-sm mt-2">This tool is for personal use only. Please respect copyright laws.</p>
        </div>
      </footer>
    </div>
  );
}