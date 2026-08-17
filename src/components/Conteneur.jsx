/**
 * Conteneur.jsx — Composant de présentation « wrapper »
 *
 * Rôle dans l'architecture : composant générique et réutilisable qui n'apporte
 * qu'une structure visuelle (encadré). Il ne connaît pas son contenu à l'avance :
 * c'est le principe de composition de React, préféré à l'héritage.
 *
 * Mémo L3 : un composant sans état (stateless) et sans effet de bord est une
 * fonction pure de ses props → même props, même rendu.
 */

// Note d'apprentissage : depuis React 17+ (nouveau JSX runtime), cet import
// n'est plus obligatoire pour écrire du JSX ; on le garde ici par habitude
// et pour rester cohérent avec le reste du projet.
import React from 'react';

// Mémo L3 : destructuration des props directement dans la signature.
// `children` est une prop spéciale : React y place automatiquement tout ce qui
// est écrit entre la balise ouvrante et la balise fermante <Conteneur>...</Conteneur>.
function Conteneur({ children }) {
  return (
    // Note d'apprentissage : le style inline attend un objet JS (d'où la double
    // accolade {{ }}) et des clés en camelCase (borderRadius, non border-radius).
    <div style={{ border: '2px solid #4A90E2', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      {/* Point d'insertion du contenu transmis par le parent : le conteneur
          reste ainsi totalement agnostique de ce qu'il affiche. */}
      {children}
    </div>
  );
}

export default Conteneur;
