import React, { createContext, useReducer, useEffect, useContext } from 'react';
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

  // Actions exposées
  const ajouterQuantite = (id) => dispatch({ type: 'AJOUTER_QUANTITE', payload: id });
  const diminuerQuantite = (id) => dispatch({ type: 'DIMINUER_QUANTITE', payload: id });
  const supprimerArticle = (id) => dispatch({ type: 'SUPPRIMER_ARTICLE', payload: id });
  const viderPanier = () => dispatch({ type: 'VIDER_PANIER' });
  const setFiltreActif = (filtre) => dispatch({ type: 'SET_FILTRE', payload: filtre });
  const ajouterNouveauProduit = (produit) => dispatch({ type: 'AJOUTER_NOUVEAU_PRODUIT', payload: produit });
  const appliquerPromo = (taux) => dispatch({ type: 'APPLIQUER_PROMO', payload: taux });

  // Données dérivées
  const produitsFiltres = state.produits.filter((p) =>
    state.filtreActif === 'PANIER' ? p.quantite > 0 : true
  );

  const brutTotal = state.produits.reduce(
    (acc, p) => acc + (p.prix || 0) * p.quantite,
    0
  );

  const totalPanier = brutTotal * (1 - (state.reduction || 0));
  const totalArticles = state.produits.filter((p) => p.quantite > 0).length;

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
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