import React, { createContext, useReducer, useEffect, useContext, useCallback, useMemo } from 'react';
import { panierReducer, PRODUITS_INITIAUX } from '../reducers/panierReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    panierReducer,
    null,
    () => {
      const sauvegardes = localStorage.getItem('app-cart');
      return {
        produits: sauvegardes ? JSON.parse(sauvegardes) : PRODUITS_INITIAUX,
        filtreActif: 'TOUS',
        reduction: 0
      };
    }
  );

  useEffect(() => {
    localStorage.setItem('app-cart', JSON.stringify(state.produits));
  }, [state.produits]);

  // 🟢 Handlers stables stabilisés avec useCallback
  const ajouterQuantite = useCallback((id) => dispatch({ type: 'AJOUTER_QUANTITE', payload: id }), []);
  const diminuerQuantite = useCallback((id) => dispatch({ type: 'DIMINUER_QUANTITE', payload: id }), []);
  const supprimerArticle = useCallback((id) => dispatch({ type: 'SUPPRIMER_ARTICLE', payload: id }), []);
  const viderPanier = useCallback(() => dispatch({ type: 'VIDER_PANIER' }), []);
  const setFiltreActif = useCallback((filtre) => dispatch({ type: 'SET_FILTRE', payload: filtre }), []);
  const ajouterNouveauProduit = useCallback((produit) => dispatch({ type: 'AJOUTER_NOUVEAU_PRODUIT', payload: produit }), []);
  const appliquerPromo = useCallback((taux) => dispatch({ type: 'APPLIQUER_PROMO', payload: taux }), []);

  // Données dérivées mémorisées avec useMemo
  const produitsFiltres = useMemo(() => {
    return state.produits.filter((p) =>
      state.filtreActif === 'PANIER' ? p.quantite > 0 : true
    );
  }, [state.produits, state.filtreActif]);

  const totalPanier = useMemo(() => {
    const brutTotal = state.produits.reduce((acc, p) => acc + (p.prix || 0) * p.quantite, 0);
    return brutTotal * (1 - (state.reduction || 0));
  }, [state.produits, state.reduction]);

  const totalArticles = useMemo(() => {
    return state.produits.filter((p) => p.quantite > 0).length;
  }, [state.produits]);

  // 🟢 Mémorisation globale de la valeur du context
  const contextValue = useMemo(() => ({
    produits: state.produits,
    produitsFiltres,
    filtreActif: state.filtreActif,
    reduction: state.reduction,
    totalPanier,
    totalArticles,
    dispatch,
    setFiltreActif,
    ajouterQuantite,
    diminuerQuantite,
    supprimerArticle,
    viderPanier,
    ajouterNouveauProduit,
    appliquerPromo
  }), [
    state.produits,
    state.filtreActif,
    state.reduction,
    produitsFiltres,
    totalPanier,
    totalArticles,
    setFiltreActif,
    ajouterQuantite,
    diminuerQuantite,
    supprimerArticle,
    viderPanier,
    ajouterNouveauProduit,
    appliquerPromo
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
}