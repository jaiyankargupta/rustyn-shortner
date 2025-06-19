import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [link, setLink] = React.useState("");
  const [error, setError] = React.useState("");

  const [qrGenerated, setQrGenerated] = React.useState(false);
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
      setError("Enter a valid URL");
    }
  };
  const qrRef = useRef(null);
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8  container mx-auto">
      <div className="flex flex-col items-center space-y-4  p-6 rounded max-w-md mx-auto">
        <input
          type="text"
          value={link}
          onChange={(e) => {
            setError("");
            setLink(e.target.value);
            setQrGenerated(false);
          }}
          placeholder="Enter a URL"
          className="border border-gray-300 px-3 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <div className="text-red-600 font-semibold">{error}</div>}

        {qrGenerated ? (
          <button
            onClick={downloadQRCode}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download QR Code
          </button>
        ) : (
          <button
            onClick={generateQRCode}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!link}
          >
            Generate QR Code
          </button>
        )}

        {link && qrGenerated && (
          <div className="p-2 bg-gray-100 rounded" ref={qrRef}>
            <QRCodeCanvas value={link} size={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
