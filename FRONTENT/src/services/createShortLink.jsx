import React, { useState } from "react";
import { handleShortUrl } from "../api/fetchProfile";

const CreateShortLink = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const frontendUrl = `${window.location.protocol}//${window.location.host}`;

  const getShortUrl = async (e) => {
    e.preventDefault(); // ✅ Prevent page refresh

    const shortenerUrl = await handleShortUrl(input, frontendUrl);

    if (shortenerUrl) {
      setShortUrl(shortenerUrl);
      setError("");
    } else {
      setError("Failed to shorten the URL.");
      setShortUrl("");
    }
  };

  return (
    <div className="container w-120 mx-auto mt-12  rounded p-6">
      <form className="flex" onSubmit={getShortUrl}>
        <input
          type="text"
          placeholder="Enter URL"
          className="flex-grow p-2 border border-gray-300 rounded-l"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
            setShortUrl("");
          }}
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" type="submit">
          Create
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-700 font-semibold bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      {shortUrl && !error && (
        <div className="mt-4 flex items-center gap-2 bg-blue-100 p-2 rounded">
          <span className="text-blue-700">Shortened URL:</span>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(shortUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            type="button"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateShortLink;
