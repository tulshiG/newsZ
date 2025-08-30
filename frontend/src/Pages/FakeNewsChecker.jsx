import React, { useState } from "react";

export default function FakeNewsChecker() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/fake-news-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error detecting fake news:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mt-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        🕵️ Fake News Detection
      </h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste headline or news text here..."
        className="w-full p-3 border rounded-lg mb-4 text-gray-900 dark:text-gray-100"
        rows={4}
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check News"}
      </button>

      {result && !result.error && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-lg">
            <strong>Prediction:</strong>{" "}
            <span
              className={
                result.prediction === "FAKE"
                  ? "text-red-600 font-bold"
                  : "text-green-600 font-bold"
              }
            >
              {result.prediction}
            </span>
          </p>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            <strong>Confidence:</strong>{" "}
            {Math.round(result.confidence * 100)}%
          </p>
        </div>
      )}

      {result?.error && (
        <p className="mt-4 text-red-600">⚠️ {result.error}</p>
      )}
    </section>
  );
}
