import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { panierReducer, PRODUITS_INITIAUX } from '../reducers/panierReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initialisation paresseuse avec useReducer & localStorage
  const [state, dispatch] = useReducer(
    panierReducer,
    null,
    () => {
      const sauvegardes = localStorage.getItem('app-cart');
      return {
        produits: sauvegardes ? JSON.parse(sauvegardes) : PRODUITS_INITIAUX,
        filtreActif: 'TOUS'
      };
    }
  );

  // 2. Synchronisation localStorage
  useEffect(() => {
    localStorage.setItem('app-cart', JSON.stringify(state.produits));
  }, [state.produits]);

  // 3. Fonctions Helper qui déclenchent le dispatch (Compatibilité ascendante)
  const ajouterQuantite = (id) => {
    dispatch({ type: 'AJOUTER_QUANTITE', payload: id });
  };

  const diminuerQuantite = (id) => {
    dispatch({ type: 'DIMINUER_QUANTITE', payload: id });
  };

  const viderPanier = () => {
    dispatch({ type: 'VIDER_PANIER' });
  };

  const setFiltreActif = (filtre) => {
    dispatch({ type: 'SET_FILTRE', payload: filtre });
  };

  // 4. Données dérivées
  const produitsFiltres = state.produits.filter((p) =>
    state.filtreActif === 'PANIER' ? p.quantite > 0 : true
  );

  const totalPanier = state.produits.reduce(
    (acc, p) => acc + (p.prix || 0) * p.quantite,
    0
  );

  const totalArticles = state.produits.filter((p) => p.quantite > 0).length;

  return (
    <CartContext.Provider
      value={{
        produits: state.produits,
        produitsFiltres,
        filtreActif: state.filtreActif,
        totalPanier,
        totalArticles,
        dispatch,
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