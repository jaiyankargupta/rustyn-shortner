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

  const getShortUrl = async () => {
    const text = await handleShortUrl(Input, frontendUrl);
    if (text.startsWith("http")) {
      setShortUrl(text);
      setError("");
    } else {
      setError("Failed to shorten the URL.");
      setShortUrl("");
      setInput("");
    }
    setCopied(false);
  };

  return (
    <div className="min-h-screen m-8 ">
      {user && (
        <h2 className="text-2xl md:text-3xl font-bold  text-center">
          Welcome, {user.name}!
        </h2>
      )}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border rounded-lg mt-12 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 pl-3 text-center h-[58px] rounded-lg ">
          Shorten Your Links Instantly
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
          Paste your long URLs and get a short, easy-to-share link in seconds.
          Fast, reliable, and free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-3 rounded-lg border-1 focus:outline-none text-white"
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
          />
          <button
            onClick={getShortUrl}
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-indigo-50 transition "
          >
            Shorten URL
          </button>
        </div>
        {error ? (
          <div className="mt-6 text-lg text-red-700 font-semibold bg-white p-4 rounded-lg shadow flex items-center gap-4">
            {error || "Please enter a valid URL."}
          </div>
        ) : (
          shortUrl && (
            <div className="mt-6 text-lg text-white font-semibold bg-indigo-700 p-4 rounded-lg shadow flex items-center gap-4">
              <span>Your Shortened URL:</span>
              <a
                href={`${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                {`${shortUrl}`}
              </a>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(`${shortUrl}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="ml-2 px-3 py-1 bg-indigo-500 rounded hover:bg-indigo-400 text-white"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )
        )}
      </section>
      <section className="mt-16 flex flex-col items-center ">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside text-lg space-y-2 max-w-xl text-center">
          <li>Paste your long URL in the input box above.</li>
          <li>
            Click the{" "}
            <span className="font-semibold text-indigo-600">Shorten URL</span>{" "}
            button.
          </li>
          <li>Copy your new, short link and share it anywhere!</li>
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="rounded-lg p-6 shadow text-white max-w-xs bg-indigo-700">
            <h3 className="font-semibold text-xl mb-2">Fast & Reliable</h3>
            <p>Get your short link in seconds, with 99.9% uptime.</p>
          </div>
          <div className="rounded-lg p-6 shadow text-white max-w-xs bg-indigo-700">
            <h3 className="font-semibold text-xl mb-2">Easy to Use</h3>
            <p>No sign-up required. Just paste, shorten, and share.</p>
          </div>
          <div className="rounded-lg p-6 shadow text-white max-w-xs bg-indigo-700">
            <h3 className="font-semibold text-xl mb-2">Completely Free</h3>
            <p>Enjoy unlimited link shortening at no cost.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
