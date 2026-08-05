/**
 * CarteProduit.jsx — Composant enfant réutilisable (une carte = un produit)
 *
 * Rôle dans l'architecture : composant « feuille » de l'arbre. Il reçoit ses
 * données d'affichage via les props (descendantes, en lecture seule) et remonte
 * les intentions de l'utilisateur au parent via des props-callbacks
 * (onAjouter / onDiminuer) → communication enfant → parent.
 *
 * Mémo L3 : les props sont immuables côté enfant ; seul le composant qui
 * détient l'état (ici App) peut le modifier via son setter.
 */

// Note d'apprentissage : `useState` est un hook → il permet à un composant
// fonction de posséder un état local persistant entre deux rendus.
import { useState } from 'react'
import React from 'react';
// Composition : la carte délègue son habillage visuel au conteneur générique.
import Conteneur from './Conteneur'; // On l'importe dans CarteProduit

// Mémo L3 : destructuration des props + valeurs par défaut (default props).
// Si le parent oublie une prop (ou passe `undefined`), la valeur par défaut
// s'applique → l'affichage reste robuste, pas de « undefined » ni de NaN.
function CarteProduit({
  nom = 'Produit sans nom',
  description = 'Aucune description disponible.',
  prix = 0, 
  quantite = 0,
  onAjouter,
  onDiminuer 
}) {
  
  // Note d'apprentissage : état LOCAL vs état GLOBAL.
  // `estFavori` n'intéresse que cette carte : inutile de le remonter dans App
  // (pas de lifting state up). Chaque instance de CarteProduit possède sa
  // propre copie de cet état, totalement indépendante des autres.
  const [estFavori, setFavori] = useState(false);

  // Note d'apprentissage : on ne modifie JAMAIS l'état directement
  // (estFavori = !estFavori serait inefficace et invisible pour React).
  // On passe par le setter, qui déclenche un nouveau rendu du composant.
  const toggleFavori = () => {
    setFavori(!estFavori);
  };

  return (
    // Composition : tout le JSX ci-dessous est transmis à <Conteneur> via la
    // prop implicite `children`.
    <Conteneur>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Interpolation d'une prop dans le JSX grâce aux accolades. */}
        <h2 style={{ color: '#333' }}>{nom}</h2>
        {/* Note d'apprentissage : on passe la RÉFÉRENCE de la fonction
            (onClick={toggleFavori}) et non son appel (toggleFavori()), sinon
            elle serait exécutée dès le rendu. */}
        <button onClick={toggleFavori} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>
          {/* Rendu conditionnel via l'opérateur ternaire : une expression, donc
              utilisable directement dans le JSX (contrairement à un if/else). */}
          {estFavori ? '❤️' : '🤍'}
        </button>
      </div>

      <p>{description}</p>
      <p>{prix} €</p>
      
      <div>
        {/* Ces handlers viennent du parent : l'enfant déclenche, le parent
            décide comment l'état global évolue (inversion de contrôle). */}
        <button onClick={onAjouter}>+</button>
        {/* L'attribut `disabled` est piloté par une expression booléenne :
            l'UI est une fonction de l'état → impossible de descendre sous 0. */}
        <button onClick={onDiminuer} disabled={quantite === 0}>-</button>
      </div>

      {/* `quantite` est une donnée dérivée de l'état du parent : la carte se
          re-rend automatiquement quand cette prop change. */}
      <p>Dans le panier : {quantite}</p>
    </Conteneur>
  );
}

export default CarteProduit;
