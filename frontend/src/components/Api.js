export async function getNews(source = "All") {
  try {
    // const res = await fetch(`http://127.0.0.1:5000/api/news?source=${encodeURIComponent(source)}`);
    const res = await fetch(`https://newsz-2.onrender.com/newspapers`);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getNews:", error);
    return [];
  }
}
