// // TranslationContext.jsx
// import React, { createContext, useContext, useState } from 'react';

// // You will import your helper function here

// import { translateText } from './translationService';
// const TranslationContext = createContext();

// export function useTranslation() {
//   return useContext(TranslationContext);
// }

// export function TranslationProvider({ children }) {
//   const [translations, setTranslations] = useState({});

//   const t = (key) => translations[key] || key;

//   const translateTexts = async (texts, sourceLang, targetLang) => {
//     const newTranslations = { ...translations };

//     try {
//       const translationPromises = texts.map(async (text) => {
//         // Call the imported helper function
//         const translatedText = await translateText(text, targetLang); 
//         return { original: text, translated: translatedText };
//       });

//       const translatedResults = await Promise.all(translationPromises);

//       translatedResults.forEach(({ original, translated }) => {
//         newTranslations[original] = translated;
//       });

//       setTranslations(newTranslations);

//     } catch (error) {
//       console.error('Translation error:', error);
//     }
//   };

//   const value = {
//     t,
//     translateTexts,
//   };

//   return (
//     <TranslationContext.Provider value={value}>
//       {children}
//     </TranslationContext.Provider>
//   );
// }
// src/context/TranslationContext.jsx
// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { translateText } from './translationService';

// const TranslationContext = createContext();

// export function useTranslation() {
//   return useContext(TranslationContext);
// }

// export function TranslationProvider({ children }) {
//   const [translations, setTranslations] = useState({});
//   const [currentLanguage, setCurrentLanguage] = useState('en');

//   // This is the main translation function that looks up a key.
//   const t = (key) => {
//     if (currentLanguage === 'en') {
//       return key;
//     }
//     return translations[key] || key;
//   };

//   // This is the new function to handle on-demand translation of dynamic text.
//   const getTranslation = useCallback(async (text, targetLang) => {
//     try {
//       if (currentLanguage === 'en' || !text) {
//         return text;
//       }
//       if (translations[text]) {
//         return translations[text];
//       }
      
//       const translated = await translateText(text, targetLang);
      
//       setTranslations(prev => ({
//         ...prev,
//         [text]: translated,
//       }));
//       return translated;
//     } catch (error) {
//       console.error("Translation error for:", text, error);
//       return text;
//     }
//   }, [currentLanguage, translations]);

//   // This function is for bulk translation of static content (e.g., from the Navbar).
//   const translateTexts = async (texts, targetLang) => {
//     if (targetLang === currentLanguage) {
//       return;
//     }
//     if (targetLang === 'en') {
//       setTranslations({});
//       setCurrentLanguage('en');
//       return;
//     }
//     try {
//       const translationPromises = texts.map(async (text) => {
//         const translatedText = await translateText(text, targetLang);
//         return { original: text, translated: translatedText };
//       });
//       const translatedResults = await Promise.all(translationPromises);
//       const newTranslations = {};
//       translatedResults.forEach(({ original, translated }) => {
//         newTranslations[original] = translated;
//       });
//       setTranslations(newTranslations);
//       setCurrentLanguage(targetLang);
//     } catch (error) {
//       console.error('Translation error:', error);
//     }
//   };

//   const value = {
//     t,
//     getTranslation, // <--- You were missing this line
//     translateTexts,
//     currentLanguage,
//   };

//   return (
//     <TranslationContext.Provider value={value}>
//       {children}
//     </TranslationContext.Provider>
//   );
// }
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