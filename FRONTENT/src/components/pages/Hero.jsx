import React, { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { handleShortUrl } from "../../api/fetchProfile";

const Hero = () => {
  const { user } = useContext(UserContext);
  const [Input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const frontendUrl = `${window.location.protocol}//${window.location.host}`;
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const getShortUrl = async () => {
    if (!Input.trim()) {
      setError("Please paste a URL first.");
      return;
    }
    setLoading(true);
    try {
      const text = await handleShortUrl(Input, frontendUrl);
      if (text && text.startsWith("http")) {
        setShortUrl(text);
        setError("");
      } else {
        setError("Failed to shorten the URL. Please make sure it's valid.");
        setShortUrl("");
        setInput("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold">
            {user && user.name && user.email ? `Welcome back, ${user.name}` : "Welcome, User"}
          </span>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            Shorten Your Links Instantly
          </h1>
          <p className="text-slate-500 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Paste your long URLs and get a short, easy-to-share link in seconds. Fast, reliable, and free.
          </p>

          <div className="max-w-xl mx-auto text-left">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Paste your long link here
            </label>

            <input
              type="text"
              placeholder="https://example.com/my-long-url"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition mb-4 shadow-sm"
              value={Input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={getShortUrl}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-6 py-3 rounded-lg text-sm transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 shadow-sm"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    Get your link for free
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg font-medium">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {shortUrl && !error && (
            <div className="mt-6 bg-indigo-50/50 border border-indigo-100/80 p-5 rounded-xl max-w-lg mx-auto">
              <div className="text-xs text-indigo-600 font-semibold mb-2 text-left">Your Shortened URL:</div>
              <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 p-2.5 rounded-lg">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium underline truncate text-left text-sm select-all"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(shortUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium text-xs transition duration-150 cursor-pointer ${copied
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200"
                    }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Simple Features Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-center mb-8 text-slate-800">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <h3 className="font-semibold text-base mb-2 text-slate-900">Fast & Reliable</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Generate short links instantly. Redirects are processed quickly for maximum uptime.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <h3 className="font-semibold text-base mb-2 text-slate-900">Secure</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We handle your redirects safely to prevent malicious destination forwards.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <h3 className="font-semibold text-base mb-2 text-slate-900">Analytics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sign in to view link stats, track click counts, and manage your history.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
