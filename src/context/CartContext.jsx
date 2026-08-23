import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

const PRODUITS_INITIAUX = [
    { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
    { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
    { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
];

export function CartProvider({ children }) {
    // 1. Initialisation avec persistance localStorage
    const [produits, setProduits] = useState(() => {
        const sauvegardes = localStorage.getItem('app-cart');
        return sauvegardes ? JSON.parse(sauvegardes) : PRODUITS_INITIAUX;
    });

    const [filtreActif, setFiltreActif] = useState('TOUS');

    // 2. Synchronisation localStorage
    useEffect(() => {
        localStorage.setItem('app-cart', JSON.stringify(produits));
    }, [produits]);

    // 3. Handlers d'actions
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

    // 4. Données dérivées
    const produitsFiltres = produits.filter((p) =>
        filtreActif === 'PANIER' ? p.quantite > 0 : true
    );

    const totalPanier = produits.reduce(
        (acc, p) => acc + (p.prix || 0) * p.quantite,
        0
    );

    const totalArticles = produits.filter((p) => p.quantite > 0).length;

    return (
        <CartContext.Provider
        value={{
            produits,
            produitsFiltres,
            filtreActif,
            totalPanier,
            totalArticles,
            setFiltreActif,
            ajouterQuantite,
            diminuerQuantite,
            viderPanier
        }}
        >
        {children}
        </CartContext.Provider>
    );
}

// Custom Hook dédié
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
    }
    return context;
}