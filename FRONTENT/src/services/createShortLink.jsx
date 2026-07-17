import React, { useState } from "react";
import { handleShortUrl } from "../api/fetchProfile";

const CreateShortLink = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const frontendUrl = `${window.location.protocol}//${window.location.host}`;

  const getShortUrl = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const shortenerUrl = await handleShortUrl(input, frontendUrl);
      if (shortenerUrl && shortenerUrl.startsWith("http")) {
        setShortUrl(shortenerUrl);
        setError("");
      } else {
        setError("Failed to shorten the URL. Make sure the backend is active.");
        setShortUrl("");
      }
    } catch (err) {
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-1">
      <form className="flex flex-col sm:flex-row gap-2" onSubmit={getShortUrl}>
        <input
          type="text"
          placeholder="Enter long URL (e.g. https://...)"
          className="flex-grow px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 placeholder-slate-400 text-sm transition"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
            setShortUrl("");
          }}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-5 py-2 rounded-lg transition shadow-sm cursor-pointer text-sm"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            "Shorten"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      {shortUrl && !error && (
        <div className="mt-5 bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Shortened Link:</div>
          <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 p-2 px-3 rounded-lg">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold underline truncate select-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className={`px-3 py-1 rounded font-medium text-xs transition duration-150 cursor-pointer ${copied
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200"
                }`}
              type="button"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateShortLink;
