import React, { useState } from "react";
import QRCodeGenerator from "../../services/qrGenearte";
import CreateShortLink from "../../services/createShortLink";

const Overview = () => {
  const [activeTab, setActiveTab] = useState("link"); // "link" or "qr"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quick Creators</h2>
          <p className="text-xs text-slate-500">Generate links or QR codes instantly</p>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-center">
          <button
            onClick={() => setActiveTab("link")}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-all duration-150 cursor-pointer ${activeTab === "link"
                ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Short Link
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`px-4 py-1.5 text-xs font-semibold rounded transition-all duration-150 cursor-pointer ${activeTab === "qr"
                ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
              }`}
          >
            QR Code
          </button>
        </div>
      </div>

      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-6 shadow-inner min-h-[300px] flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto">
          {activeTab === "link" ? (
            <CreateShortLink />
          ) : (
            <QRCodeGenerator />
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
