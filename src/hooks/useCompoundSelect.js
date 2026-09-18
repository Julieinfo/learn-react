import { useState, useCallback } from 'react';

/**
 * Custom Hook réutilisable pour gérer la sélection d'un élément
 * au sein d'un composant composé (Accordion, Tabs, Select...).
 */
export function useCompoundSelect(defaultValue = null, allowToggle = false) {
  const [selectedId, setSelectedId] = useState(defaultValue);

  const select = useCallback((id) => {
    setSelectedId((prev) => {
      if (allowToggle && prev === id) {
        return null;
      }
      return id;
    });
  }, [allowToggle]);

  const isSelected = useCallback(
    (id) => selectedId === id,
    [selectedId]
  );

  return {
    selectedId,
    select,
    isSelected
  };
}