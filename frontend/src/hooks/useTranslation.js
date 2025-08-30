// hooks/useTranslator.js
import { useState } from "react";

export function useTranslator() {
  const [lang, setLang] = useState("en");

  async function translateText(text) {
    if (lang === "en") return text; // no translation needed

    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: lang }),
    });
    const data = await response.json();
    return data.translation || text;
  }

  return { lang, setLang, translateText };
}
