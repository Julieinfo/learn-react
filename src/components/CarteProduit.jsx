import React, { useState, memo } from 'react';
import Conteneur from './Conteneur';

function CarteProduit({
  nom = 'Produit sans nom',
  description = 'Aucune description disponible.',
  prix = 0, 
  quantite = 0,
  onAjouter,
  onDiminuer 
}) {
  const [estFavori, setFavori] = useState(false);

  const toggleFavori = () => {
    setFavori(!estFavori);
  };

  return (
    <Conteneur>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#333' }}>{nom}</h2>
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

// 🟢 Utilisation de React.memo pour bloquer les re-rendus inutiles
export default memo(CarteProduit);