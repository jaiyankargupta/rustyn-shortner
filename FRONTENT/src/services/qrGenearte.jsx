import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const qrRef = useRef(null);

  const generateQRCode = () => {
    const isValidURL = (string) => {
      try {
        new URL(string);
        return true;
      } catch {
        return false;
      }
    };
    if (isValidURL(link)) {
      setError("");
      if (link) {
        setQrGenerated(true);
      }
    } else {
      setError("Please enter a valid URL (including http:// or https://)");
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qrcode-rustynlink.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full max-w-md mx-auto p-1">
      <div className="flex flex-col items-center gap-5">
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={link}
            onChange={(e) => {
              setError("");
              setLink(e.target.value);
              setQrGenerated(false);
            }}
            placeholder="Enter URL to generate QR... (https://...)"
            className="flex-grow px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400 text-sm transition"
          />
          <button
            onClick={generateQRCode}
            disabled={!link.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-lg transition shadow-sm cursor-pointer text-sm"
          >
            Generate
          </button>
        </div>

        {error && (
          <div className="w-full flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        {link && qrGenerated && (
          <div className="flex flex-col items-center gap-4 bg-slate-50 border border-slate-200 p-6 rounded-xl w-full">
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm" ref={qrRef}>
              <QRCodeCanvas 
                value={link} 
                size={140} 
                level="H"
                includeMargin={true}
              />
            </div>
            
            <button
              onClick={downloadQRCode}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-5 py-2 rounded-lg transition shadow-sm flex items-center gap-2 text-xs cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
