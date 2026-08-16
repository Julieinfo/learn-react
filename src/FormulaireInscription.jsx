/*
 * Mémo L3 - FormulaireInscription
 *
 * Rôle principal du composant : gérer un formulaire d'inscription en gardant
 * un état local pour le mot de passe, puis en affichant un feedback immédiat
 * sur sa sécurité. Dans une architecture React, il s'agit d'un composant
 * autonome : il reçoit peu ou pas de props, il garde sa logique interne et il
 * réagit aux événements utilisateur sans dépendre d'un état global.
 */

import React, { useState } from 'react';
import useDebounce from './useDebounce';

function FormulaireInscription() {
  // Note d'apprentissage : useState est le hook fondamental pour stocker un
  // état local. Ici, motDePasse appartient uniquement à ce composant ; il n'est
  // pas partagé avec d'autres composants. La mise à jour suit le principe
  // d'immutabilité du state : on ne modifie pas l'ancien tableau/objet/string en
  // place, on crée une nouvelle valeur via setMotDePasse.
  const [motDePasse, setMotDePasse] = useState('');

  // Mémo L3 : le hook personnalisé useDebounce encapsule un effet secondaire de
  // temporisation. On attend 300 ms avant de valider la dernière valeur saisie,
  // ce qui évite des recalculs inutiles à chaque frappe. Cette logique est
  // utile pour la réactivité et pour le contrôle de la fréquence d'exécution.
  const motDePasseDebounced = useDebounce(motDePasse, 300);

  // Note d'apprentissage : cette fonction représente la logique métier du
  // composant. Elle analyse la chaîne de caractères après temporisation et
  // renvoie un message de sécurité. On utilise ici une série de conditions,
  // mais on aurait pu écrire la même logique sous forme de ternaires ; dans
  // un cadre pédagogique, les conditions if/else restent plus lisibles.
  const getMessageSecurite = () => {
    if (!motDePasseDebounced) return '';
    if (motDePasseDebounced.length < 6) return 'Trop court ❌';
    if (motDePasseDebounced.length <= 10) return 'Moyen ⚠️';
    return 'Fort ✅';
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/*
       * Dans le JSX, le label est un élément de formulaire simple. L'input est
       * contrôlé par React : sa prop value est liée à l'état local motDePasse.
       * Cela garantit une synchronisation parfaite entre le DOM et le state.
       * L'événement onChange reçoit un objet événement, puis on met à jour le
       * state avec la valeur actuelle du champ.
       */}
      <label style={{ display: 'block', marginBottom: '8px' }}>Mot de passe :</label>
      <input
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
      />

      {/*
       * Rendu conditionnel : le message n'apparaît que si la valeur temporisée
       * existe. Le court-circuit logique && est ici particulièrement adapté :
       * tant que motDePasseDebounced est falsy, React ne rend pas le bloc.
       * C'est un bon exemple de réactivité conditionnelle dans JSX.
       */}
      {motDePasseDebounced && (
        <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
          Sécurité : {getMessageSecurite()}
        </p>
      )}
    </form>
  );
}

export default FormulaireInscription;