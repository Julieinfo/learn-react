import React from 'react';
import Conteneur from './Conteneur'; // On l'importe dans CarteProduit

function CarteProduit({ nom, description, prix, quantite, onAjouter, onDiminuer }) {
  return (
    <Conteneur>
      <h2>{nom}</h2>
      <p>{description}</p>
      <p>{prix} €</p>
      <button onClick={onAjouter}>+</button>
      <button onClick={onDiminuer} disabled={quantite === 0}>-</button>
      <p>Dans le panier : {quantite}</p>
    </Conteneur>
  );
}

export default CarteProduit;