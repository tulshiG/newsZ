export async function translateText(text, targetLang = "hi") {
  try {
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });

    const data = await response.json();
    return data.translation || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}
