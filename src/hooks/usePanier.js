import { useState } from 'react';

export function usePanier(produitsInitiaux = []) {
    const [produits, setProduits] = useState(produitsInitiaux);
    const [filtreActif, setFiltreActif] = useState('TOUS');

    // Actions d'immuabilité
    const ajouterQuantite = (id) => {
        setProduits((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantite: p.quantite + 1 } : p))
        );
    };

    const diminuerQuantite = (id) => {
        setProduits((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p
        )
        );
    };

    const viderPanier = () => {
        setProduits((prev) => prev.map((p) => ({ ...p, quantite: 0 })));
    };

    // Données dérivées (calculées à la volée)
    const produitsFiltres = produits.filter((p) =>
        filtreActif === 'PANIER' ? p.quantite > 0 : true
    );

    const totalPanier = produits.reduce(
        (acc, p) => acc + (p.prix || 0) * p.quantite,
        0
    );

    const totalArticles = produits.filter((p) => p.quantite > 0).length;

    return {
        produits,
        produitsFiltres,
        filtreActif,
        totalPanier,
        totalArticles,
        setFiltreActif,
        ajouterQuantite,
        diminuerQuantite,
        viderPanier,
    };
}