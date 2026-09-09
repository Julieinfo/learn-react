import React, { useState, Profiler } from 'react';

// Composant non optimisé qui subit des re-rendus inutiles
function ListeLourde({ items }) {
  console.log('[Rendu] ListeLourde exécuté');
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function CompteurProfiler() {
  const [compteur, setCompteur] = useState(0);
  const [items] = useState(['Élément 1', 'Élément 2', 'Élément 3']);

  // Callback du Profiler pour mesurer le temps de rendu
  const onRenderCallback = (
    id, // l'identifiant du Profiler
    phase, // "mount" (premier rendu) ou "update" (mise à jour)
    actualDuration // temps passé à rendre l'arbre profilé (en ms)
  ) => {
    console.log(`⏱️ [Profiler - ${id}] Phase: ${phase} | Durée: ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>📊 Profiler React</h2>
      <p>Compteur : {compteur}</p>
      <button onClick={() => setCompteur((c) => c + 1)}>Incrémenter</button>

      {/* Le Profiler englobe la zone à analyser */}
      <Profiler id="ZoneListeLourde" onRender={onRenderCallback}>
        <ListeLourde items={items} />
      </Profiler>
    </div>
  );
}