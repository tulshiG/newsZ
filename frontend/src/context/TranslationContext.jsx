import React, { createContext, useContext, useState, useCallback } from 'react';
import { translateText } from './translationService';

const TranslationContext = createContext();

export function useTranslation() {
  return useContext(TranslationContext);
}

export function TranslationProvider({ children }) {
  const [translations, setTranslations] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Function to look up a key for static content
  const t = (key) => {
    if (currentLanguage === 'en') {
      return key;
    }
    return translations[key] || key;
  };

  // Function to handle on-demand translation of dynamic text
 const getTranslation = useCallback(
  async (text, targetLang) => {
    try {
      if (currentLanguage === "en" || !text) {
        return text;
      }

      // Use functional update to avoid stale translations
      if (translations[text]) {
        return translations[text];
      }

      const translated = await translateText(text, targetLang);

      setTranslations((prev) => ({
        ...prev,
        [text]: translated,
      }));

            return translated;
          } catch (error) {
            console.error("Translation error for:", text, error);
            return text;
          }
        },
        [currentLanguage] // ✅ remove translations from deps
      );


  // Function for bulk translation of static content
  const translateTexts = async (texts, targetLang) => {
    if (targetLang === currentLanguage) {
      return;
    }
    
    // Set loading state
    setIsTranslating(true);

    try {
      if (targetLang === 'en') {
        setTranslations({});
      } else {
        const translatedResults = await Promise.all(
          texts.map(text => translateText(text, targetLang))
        );
        const newTranslations = {};
        texts.forEach((original, index) => {
          newTranslations[original] = translatedResults[index];
        });
        setTranslations(newTranslations);
      }
      setCurrentLanguage(targetLang);
    } catch (error) {
      console.error('Translation error:', error);
      // In case of error, just set the language and show original text
      setCurrentLanguage(targetLang); 
    } finally {
      setIsTranslating(false);
    }
  };

  const value = {
    t,
    getTranslation,
    translateTexts,
    currentLanguage,
    setCurrentLanguage,
    isTranslating,
    setIsTranslating,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
