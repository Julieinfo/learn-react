/* Responsabilité : fournir une sélection réutilisable aux Compound Components. */
import { useState, useCallback } from 'react';

/**
 * Custom Hook réutilisable pour gérer la sélection d'un élément
 * au sein d'un composant composé (Accordion, Tabs, Select...).
 */
export function useCompoundSelect(defaultValue = null, allowToggle = false) {
  const [selectedId, setSelectedId] = useState(defaultValue);

  // La fonction stable peut être transmise aux sous-composants sans invalider leur mémoïsation.
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