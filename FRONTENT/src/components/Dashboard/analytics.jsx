import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/api.config.js";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const FetchCount = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/auth/analytic`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load analytics data.");
      }
    };
    FetchCount();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Dashboard Analytics</h2>
        <p className="text-xs text-slate-500 mt-1">Monitor your short URL usage and performance</p>
      </div>

      {error ? (
        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl text-center">
          {error}
        </div>
      ) : analyticsData ? (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Short Links</span>
              <span className="text-2xl font-bold text-slate-800">{analyticsData.totalUrls}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Clicks</span>
              <span className="text-2xl font-bold text-slate-800">{analyticsData.totalClicks}</span>
            </div>
          </div>

          {/* URLs Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 px-1">My Shortened URLs</h3>
            
            {analyticsData.urls && analyticsData.urls.length > 0 ? (
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full bg-white text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Short URL</th>
                      <th className="py-3 px-4">Destination URL</th>
                      <th className="py-3 px-4 text-center">Clicks</th>
                      <th className="py-3 px-4 text-right">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {analyticsData.urls.map((url) => (
                      <tr key={url._id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-medium">
                          <a
                            href={url.short_url}
                            className="text-indigo-600 hover:text-indigo-700 underline truncate block max-w-[200px]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.short_url}
                          </a>
                        </td>
                        <td className="py-3 px-4 font-normal max-w-[250px] truncate">
                          <a
                            href={url.full_url}
                            className="text-slate-500 hover:text-slate-700 hover:underline block truncate"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.full_url}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-slate-800">{url.clicks}</td>
                        <td className="py-3 px-4 text-right text-xs text-slate-400">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                No URLs created yet. Start by creating one from the Overview page!
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-12">
          <span className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></span>
        </div>
      )}
    </div>
  );
};

export default Analytics;
