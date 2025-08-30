// const API_URL = import.meta.env.VITE_API_URL;

// export async function getNews(source = "All") {
//   const res = await fetch(`${API_URL}/api/news?source=${encodeURIComponent(source)}`);
//   if (!res.ok) throw new Error("Failed to fetch news");
//   return await res.json();
// }
// src/components/Api.js
export async function getNews(source = "All") {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/news?source=${encodeURIComponent(source)}`);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getNews:", error);
    return [];
  }
}
