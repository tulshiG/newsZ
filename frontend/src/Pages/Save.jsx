import React, { useEffect, useState } from "react";

export default function Save() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedHeadlines = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setHeadlines([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:5000/saved-headlines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!res.ok) throw new Error("Failed to fetch saved headlines");
        const data = await res.json();

        // backend may return { headlines: [...] } or just [...]
        setHeadlines(data.headlines || data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load saved headlines.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedHeadlines();
  }, []);

  const handleDelete = async (headlineId) => {
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail || !headlineId) {
      alert("Could not delete headline. Missing user credentials or item ID.");
      console.error("Missing user email or headline ID. Cannot delete.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/delete_headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          headline_id: headlineId,
        }),
      });

      if (res.ok) {
        setHeadlines((prev) => prev.filter((h) => h.headline_id !== headlineId));
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete headline.");
        console.error("Delete failed with status:", res.status, "Error:", errorData);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong while deleting.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-lg py-16">Loading saved headlines...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg py-16">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen antialiased p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Your Saved Headlines
        </h1>
        {headlines.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-16">
            You haven't saved any headlines yet.
          </div>
        ) : (
          <div className="space-y-6">
            {headlines.map((headline, index) => (
              <div
                key={headline.headline_id || index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight pr-4">
                    {headline.title}
                  </h2>
                  <button
                    onClick={() => handleDelete(headline.headline_id)}
                    className="flex-shrink-0 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Delete headline"
                  >
                    🗑
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{headline.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-medium text-gray-600">
                    Source: {headline.source}
                  </span>
                  <span className="italic">
                    {new Date(headline.published_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}