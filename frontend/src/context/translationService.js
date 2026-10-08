// translationService.js
export async function translateText(text, targetLang) {
  const response = await fetch('https://newsz-2.onrender.com/translate', {
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
