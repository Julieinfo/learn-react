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
    }
  ]);

  // Fonction pour augmenter la quantité d'un produit par son id
  const ajouterAuPanier = (id) => {
    setProduits(produits.map(produit => {
      if (produit.id === id) {
        return { ...produit, quantite: produit.quantite + 1 };
      }
      return produit;
    }));
  };

  // Calcul du total du panier dynamiquement
  const totalPanier = produits.reduce((acc, produit) => {
    return acc + (produit.prix * produit.quantite);
  }, 0);

  return (
    <div>
      <h1>Mon apprentissage React</h1>
      
      <h2>Total du panier : {totalPanier} €</h2>

      {produits.map((produit) => (
        <CarteProduit 
          key={produit.id}
          nom={produit.nom}
          description={produit.description}
          prix={produit.prix}
          quantite={produit.quantite}
          onAjouter={() => ajouterAuPanier(produit.id)}
        />
      ))}
    </div>
  );
}

export default App;