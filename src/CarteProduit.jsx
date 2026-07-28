import { useState } from 'react'
import React from 'react';
import Conteneur from './Conteneur'; // On l'importe dans CarteProduit

function CarteProduit({
  nom = 'Produit sans nom',
  description = 'Aucune description disponible.',
  prix = 0, 
  quantite = 0,
  onAjouter,
  onDiminuer 
}) {
  
  // State local propre à CETTE carte uniquement
  const [estFavori, setFavori] = useState(false);

  // Fonction pour basculer l'état favori (true <-> false)
  const toggleFavori = () => {
    setFavori(!estFavori);
  };

  return (
    <Conteneur>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{nom}</h2>
        {/* Bouton de favori avec state local */}
        <button onClick={toggleFavori} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>
          {estFavori ? '❤️' : '🤍'}
        </button>
      </div>

      <p>{description}</p>
      <p>{prix} €</p>
      
      <div>
        <button onClick={onAjouter}>+</button>
        <button onClick={onDiminuer} disabled={quantite === 0}>-</button>
      </div>

      <p>Dans le panier : {quantite}</p>
    </Conteneur>
  );
}

export default CarteProduit;