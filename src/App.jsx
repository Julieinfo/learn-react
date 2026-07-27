import { useState } from 'react'
import CarteProduit from './CarteProduit'

function App() {
  const [quantite1, setQuantite1] = useState(0);
  const [quantite2, setQuantite2] = useState(0);

  const produit1 = {
    nom: 'Montre connectée',
    description: 'Mon premier produit',
    prix: 160
  };

  const produit2 = {
    nom: 'Ecouteur bluetooth',
    description: 'Mon deuxième produit',
    prix: 80
  };

  // Calcul du prix total du panier
  const totalPanier = (quantite1 * produit1.prix) + (quantite2 * produit2.prix);

  return (
    <div>
      <h1>Mon apprentissage React</h1>
      
      <h2>Total du panier : {totalPanier} €</h2>
      
      <CarteProduit 
        nom={produit1.nom} 
        description={produit1.description} 
        prix={produit1.prix} 
        quantite={quantite1}
        onAjouter={() => setQuantite1(quantite1 + 1)}
      />
      <br />
      <CarteProduit 
        nom={produit2.nom} 
        description={produit2.description} 
        prix={produit2.prix} 
        quantite={quantite2}
        onAjouter={() => setQuantite2(quantite2 + 1)}
      />
    </div>
  );
}

export default App;