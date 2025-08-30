import React from "react";
import NewsCard from "./NewspaperCard"; // adjust path if needed

export default function Newspapers() {
  // Example newspapers data (you can fetch this from your backend instead)
  const newspapers = [
    {
      name: "The Times of India",
      description: "One of India's leading newspapers.",
      languages: ["English", "Hindi"],
      categories: ["Politics", "Business", "Sports"],
    },
    {
      name: "The Hindu",
      description: "National newspaper covering various topics.",
      languages: ["English", "Tamil"],
      categories: ["World", "Science", "Culture"],
    },
  ];

  return (
    <div className="pt-20 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newspapers.map((paper, i) => (
        <NewsCard key={i} newspaper={paper} />
      ))}
    </div>
  );
}
