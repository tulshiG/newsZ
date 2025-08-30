// src/hooks/useTranslatedItems.js
import { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';

export const useTranslatedItems = (items) => {
  const { t, currentLanguage, translateTexts } = useTranslation();
  const [translatedItems, setTranslatedItems] = useState(items);

  useEffect(() => {
    const translateDynamicContent = async () => {
      if (items.length === 0) {
        setTranslatedItems([]);
        return;
      }
      
      // Collect all dynamic texts to be translated
      const dynamicTexts = items.reduce((acc, item) => {
        acc.push(item.title);
        acc.push(item.source);
        if (item.summary) acc.push(item.summary);
        if (item.sentiment) acc.push(item.sentiment);
        return acc;
      }, []);

      // The translateTexts function updates the global translation state.
      await translateTexts(dynamicTexts, currentLanguage); 
      
      // After translations are loaded, create a NEW array with the translated text.
      const newTranslatedItems = items.map(item => ({
        ...item, // Spread the existing properties
        // Use the 't' function to get the translated version for each property
        title: t(item.title), 
        source: t(item.source),
        summary: item.summary ? t(item.summary) : item.summary,
        sentiment: item.sentiment ? t(item.sentiment) : item.sentiment,
      }));

      // Update the state with the NEW translated array.
      setTranslatedItems(newTranslatedItems);
    };

    // Only run this effect if the items or language change.
    translateDynamicContent();
  }, [items, currentLanguage, translateTexts]);

  // Return the translated items from the state.
  return translatedItems;
};