export async function getNews(source = "All") {
  try {
    const res = await fetch(`https://newsz-2.onrender.com/api/news?source=${encodeURIComponent(source)}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getNews:", error);
    return [];
  }
}
