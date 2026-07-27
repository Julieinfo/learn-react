import React from 'react';

function CarteProduit({ nom, description, prix, quantite, onAjouter, onDiminuer }) {
  return (
    <div>
      <h2>{nom}</h2>
      <p>{description}</p>
      <p>{prix} €</p>
      <button onClick={onAjouter}>+</button>
      <button onClick={onDiminuer} disabled={quantite === 0}>-</button>
      <p>Dans le panier : {quantite}</p>
    </div>
  );
}

export default CarteProduit;