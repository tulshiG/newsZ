// translationService.js
export async function translateText(text, targetLang) {
  const response = await fetch('http://127.0.0.1:5000/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      target_lang: targetLang,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Translation failed');
  }

  const data = await response.json();
  return data.translated_text;
}