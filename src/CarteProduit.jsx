import React from 'react';

function CarteProduit({ nom, description, prix, quantite, onAjouter }) {
  return (
    <div>
      <h2>{nom}</h2>
      <p>{description}</p>
      <p>{prix} €</p>
      <button onClick={onAjouter}>Ajouter au panier</button>
      <p>Dans le panier : {quantite}</p>
    </div>
  );
}

export default CarteProduit;