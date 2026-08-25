export const PRODUITS_INITIAUX = [
    { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
    { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
    { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
];

export function panierReducer(state, action) {
    switch (action.type) {
        case 'AJOUTER_QUANTITE':
            return {
                ...state,
                produits: state.produits.map((p) =>
                p.id === action.payload ? { ...p, quantite: p.quantite + 1 } : p
                )
            };

        case 'DIMINUER_QUANTITE':
            return {
                ...state,
                produits: state.produits.map((p) =>
                p.id === action.payload ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p
                )
            };

        case 'SUPPRIMER_ARTICLE':
            return {
                ...state,
                produits: state.produits.filter((p) => p.id !== action.payload)
            };

        case 'AJOUTER_NOUVEAU_PRODUIT':
            return {
                ...state,
                produits: [...state.produits, action.payload]
            };

        case 'VIDER_PANIER':
            return {
                ...state,
                produits: state.produits.map((p) => ({ ...p, quantite: 0 }))
            };

        case 'SET_FILTRE':
            return {
                ...state,
                filtreActif: action.payload
            };

        case 'APPLIQUER_PROMO':
            return {
                ...state,
                reduction: action.payload // ex: 0.20 pour 20%
            };

        default:
            throw new Error(`Action non reconnue : ${action.type}`);
    }
}