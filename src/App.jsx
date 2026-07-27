import { useState } from 'react'
import CarteProduit from './CarteProduit'

function App() {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: 'Montre connectée',
      description: 'Mon premier produit',
      prix: 160,
      quantite: 0
    },
    {
      id: 2,
      nom: 'Ecouteur bluetooth',
      description: 'Mon deuxième produit',
      prix: 80,
      quantite: 0
    },
    {
      id: 3,
      nom: 'Casque gaming',
      quantite: 0
    }
  ]);

  const ajouterAuPanier = (id) => {
    setProduits(produits.map(produit => {
      if (produit.id === id) {
        return { ...produit, quantite: produit.quantite + 1 };
      }
      return produit;
    }));
  };

  // Diminuer la quantité d'un produit (sans descendre en dessous de 0)
  const diminuerAuPanier = (id) => {
    setProduits(produits.map(produit => {
      if (produit.id === id && produit.quantite > 0) {
        return { ...produit, quantite: produit.quantite - 1 };
      }
      return produit;
    }));
  };

  // Remettre toutes les quantités à 0
  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  const totalPanier = produits.reduce((acc, produit) => {
    const prix = produit.prix || 0; // Si le prix n'existe pas, on prend 0
    return acc + (prix * produit.quantite);
  }, 0);

  return (
    <div>
      <h1>Mon apprentissage React</h1>
      
      <h2>Total du panier : {totalPanier} €</h2>
      <button onClick={viderPanier} disabled={totalPanier === 0}>
        Vider le panier
      </button>

      <br /><br />

      {produits.map((produit) => (
        <CarteProduit 
          key={produit.id}
          nom={produit.nom}
          description={produit.description}
          prix={produit.prix}
          quantite={produit.quantite}
          onAjouter={() => ajouterAuPanier(produit.id)}
          onDiminuer={() => diminuerAuPanier(produit.id)}
        />
      ))}
    </div>
  );
}

export default App;