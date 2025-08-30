import { useState } from "react";

export default function NewsCard({ newspaper }) {
  const [open, setOpen] = useState(false);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHeadlines = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/news"); // ✅ full backend URL
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setHeadlines(data.data || []);
    } catch (err) {
      console.error("Error fetching headlines:", err);
      setHeadlines([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Card */}
      <div className="p-4 shadow-md rounded-2xl bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold">{newspaper.name}</h2>
        <p className="text-gray-500">{newspaper.description}</p>

        <div className="flex gap-2 flex-wrap mt-2">
          {newspaper.categories.map((cat, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          {newspaper.languages.map((lang, i) => (
            <span
              key={i}
              className="text-sm bg-gray-100 px-2 py-1 rounded-md"
            >
              {lang}
            </span>
          ))}
        </div>

        <button
          className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          onClick={() => {
            fetchHeadlines();
            setOpen(true);
          }}
        >
          Read Headlines
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Top Headlines</h2>

            {loading ? (
              <p className="text-center py-4">Loading headlines...</p>
            ) : headlines.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No headlines found.</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {headlines.map((news, i) => (
                  <a
                    key={i}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <h3 className="font-semibold text-lg">{news.title}</h3>
                    <p className="text-sm text-gray-500">{news.category}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
