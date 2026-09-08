import React, { useState, useMemo, useCallback } from 'react';

// Composant enfant optimisé avec React.memo
const FastButton = React.memo(({ onClick, label }) => {
  console.log(`[Rendu] Bouton ${label}`);
  return (
    <button onClick={onClick} style={{ padding: '8px 16px', marginTop: '10px' }}>
      {label}
    </button>
  );
});

export default function GestionProduits() {
  const [produits] = useState([
    { id: 1, nom: 'Clavier', prix: 50 },
    { id: 2, nom: 'Souris', prix: 25 },
    { id: 3, nom: 'Écran', prix: 200 }
  ]);
  const [recherche, setRecherche] = useState('');
  const [compteur, setCompteur] = useState(0);

  // 1. USEMEMO : Mémorise le filtrage et le calcul du total
  const produitsFiltresEtTotal = useMemo(() => {
    console.log('[Calcul] Filtrage des produits...');
    const filtres = produits.filter((p) =>
      p.nom.toLowerCase().includes(recherche.toLowerCase())
    );
    const total = filtres.reduce((acc, p) => acc + p.prix, 0);
    return { filtres, total };
  }, [produits, recherche]);

  // 2. USECALLBACK : Mémorise l'instance de la fonction
  const incrementer = useCallback(() => {
    setCompteur((c) => c + 1);
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>⚡ Optimisation : useMemo vs useCallback</h2>

      <input
        type="text"
        placeholder="Filtrer un produit..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <p>Total retenu : <strong>{produitsFiltresEtTotal.total} €</strong></p>

      <p>Compteur indépendant : {compteur}</p>
      <FastButton onClick={incrementer} label="Incrémenter" />
    </div>
  );
}