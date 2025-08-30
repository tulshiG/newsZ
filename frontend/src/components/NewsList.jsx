import { useEffect, useState } from "react";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/news")
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Timeline Stack</h2>
      {news.map((item, idx) => (
        <div key={idx} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
          <h3>{item.headline}</h3>
          <p><strong>Source:</strong> {item.source}</p>
          <p><strong>Published:</strong> {item.time}</p>
        </div>
      ))}
    </div>
  );
}
