import React from "react";
import { useEffect } from "react";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = React.useState(null);

  useEffect(() => {
    const FetchCount = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.BACKEND_URL || "http://localhost:3001"
          }/api/auth/analytic`,
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
      }
    };
    FetchCount();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Dashboard Analytics</h1>

      {analyticsData ? (
        <div className="mt-4">
          <div className="mb-2">
            <strong>Your Email:</strong> {analyticsData.email}
          </div>
          <div className="mb-2">
            <strong>Total URLs:</strong> {analyticsData.totalUrls}
          </div>

          <div className="mb-2">
            <strong>Total Clicks:</strong> {analyticsData.totalClicks}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">URLs</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Short URL</th>
                  <th className="py-2 px-4 border-b">Full URL</th>
                  <th className="py-2 px-4 border-b">Clicks</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.urls.map((url) => (
                  <tr key={url._id}>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={url.short_url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.short_url}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={url.full_url}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.full_url}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">{url.clicks}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-4">Loading analytics...</div>
      )}
    </div>
  );
};

export default Analytics;
