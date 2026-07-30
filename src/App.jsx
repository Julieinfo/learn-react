import { useState } from 'react'
import CarteProduit from './CarteProduit'

function App() {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: 'Casque Audio',
      description: 'Casque réducteur de bruit',
      prix: 150,
      quantite: 0
    },
    {
      id: 2,
      nom: 'Souris Gamer',
      description: 'Souris optique sans fil',
      prix: 50,
      quantite: 0
    },
    {
      id: 3,
      nom: 'Clavier Mécanique',
      description: 'Clavier RGB switch red',
      prix: 100,
      quantite: 0
    }
  ]);

  // 1. State du filtre actif
  const [filtreActif, setFiltreActif] = useState('TOUS');

  // Gestion des quantités
  const ajouterQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));
  };

  const diminuerQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p));
  };

  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  // 2. Filtrage (utilisation de filtreActif)
  const produitsFiltres = produits.filter(produit => {
    if (filtreActif === 'PANIER') {
      return produit.quantite > 0;
    } else {
      return true;
    }
  });

  const totalPanier = produits.reduce((acc, produit) => {
    const prix = produit.prix || 0;
    return acc + (prix * produit.quantite);
  }, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mon Panier d'Achat</h1>

      {/* Boutons de filtres */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFiltreActif('TOUS')}>
          Tous les produits
        </button>
        <button onClick={() => setFiltreActif('PANIER')}>
          Uniquement le panier ({produits.filter(p => p.quantite > 0).length})
        </button>
      </div>

      {/* 1. RENDU CONDITIONNEL AVEC TERNAIRE pour la liste de produits */}
      {produitsFiltres.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>
          🛒 Aucun produit à afficher ici.
        </p>
      ) : (
        <div>
          {produitsFiltres.map((produit) => (
            <CarteProduit
              key={produit.id}
              nom={produit.nom}
              description={produit.description}
              prix={produit.prix}
              quantite={produit.quantite}
              onAjouter={() => ajouterQuantite(produit.id)}
              onDiminuer={() => diminuerQuantite(produit.id)}
            />
          ))}
        </div>
      )}

      {/* 2. RENDU CONDITIONNEL AVEC && pour le résumé du panier */}
      {totalPanier > 0 && (
        <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '10px' }}>
          <h3>Total du panier : {totalPanier} €</h3>
          <button onClick={viderPanier} style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
            Vider le panier
          </button>
        </div>
      )}
    </div>
  );
}

export default App;