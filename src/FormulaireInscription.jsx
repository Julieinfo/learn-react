/**
 * FormulaireInscription.jsx — Composant autonome de saisie et validation
 *
 * Rôle dans l'architecture : composant totalement indépendant du panier. Il
 * gère son propre état (champ contrôlé + message de sécurité) et n'expose
 * aucune prop : App se contente de l'instancier. Aucun état n'a besoin d'être
 * levé (lifting state up) tant que personne d'autre n'a besoin du mot de passe.
 *
 * Mémo L3 : illustration d'un effet secondaire (side effect) — la validation
 * temporisée n'est pas un simple calcul de rendu, elle programme un timer,
 * donc elle appartient à `useEffect` et non au corps du composant.
 */

// Note d'apprentissage : `useState` = état local persistant entre les rendus ;
// `useEffect` = code exécuté APRÈS le rendu (synchronisation avec l'extérieur :
// timers, requêtes réseau, abonnements…).
import React, { useState, useEffect } from 'react';

function FormulaireInscription() {
  // Champ contrôlé (controlled component) : le DOM ne détient pas la valeur,
  // c'est React qui en est la source unique de vérité via `motDePasse`.
  const [motDePasse, setMotDePasse] = useState('');
  // État dérivé du précédent, mais stocké car calculé de façon asynchrone
  // (après temporisation) : il ne peut donc pas être un simple calcul de rendu.
  const [messageSecurite, setMessageSecurite] = useState('');

  // Mémo L3 : le tableau de dépendances `[motDePasse]` indique à React de
  // ré-exécuter l'effet uniquement quand cette valeur change (et non à chaque
  // rendu). Un tableau vide `[]` = une seule exécution au montage ;
  // aucun tableau = exécution après chaque rendu.
  useEffect(() => {
    // 1. Si le champ est vide, réinitialisation directe
    // Sortie anticipée : pas de timer à programmer, donc pas de fonction de
    // nettoyage retournée dans cette branche.
    if (!motDePasse) {
      setMessageSecurite('');
      return;
    }

    // 2. Debounce : on attend 300ms avant d'évaluer la sécurité
    // Note d'apprentissage — temporisation (debounce) : à chaque frappe l'effet
    // est relancé, l'ancien timer est annulé (voir le cleanup ci-dessous) et un
    // nouveau démarre. Le calcul ne s'exécute donc qu'après 300 ms d'inactivité,
    // ce qui évite un travail inutile à chaque caractère saisi.
    const timer = setTimeout(() => {
      // Chaîne if/else if : classement de la robustesse par longueur.
      if (motDePasse.length < 6) {
        setMessageSecurite('Trop court ❌');
      } else if (motDePasse.length <= 10) {
        setMessageSecurite('Moyen ⚠️');
      } else {
        setMessageSecurite('Fort ✅');
      }
    }, 300);

    // 3. Cleanup : annule le timer si la saisie continue
    // Mémo L3 : la fonction de nettoyage (cleanup) est appelée avant chaque
    // ré-exécution de l'effet ET au démontage du composant. Sans elle, les
    // timers s'accumuleraient (fuite mémoire) et un ancien timer pourrait
    // écraser le message avec un résultat périmé (race condition).
    return () => clearTimeout(timer);
  }, [motDePasse]);

  return (
    // `onSubmit` avec `e.preventDefault()` : on bloque le rechargement de page
    // par défaut du navigateur, la logique reste côté React.
    <form onSubmit={(e) => e.preventDefault()} style={{ padding: '20px', maxWidth: '300px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Mot de passe :</label>
      {/* Liaison bidirectionnelle « manuelle » : `value` descend de l'état vers
          le DOM, `onChange` fait remonter la saisie vers l'état → réactivité.
          Sans `onChange`, le champ paraîtrait figé (lecture seule). */}
      <input 
        type="password" 
        value={motDePasse} 
        onChange={(e) => setMotDePasse(e.target.value)} 
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {/* Rendu conditionnel par court-circuit logique `&&` : le paragraphe
          n'existe dans l'arbre React que si le message est non vide.
          Astuce L3 : `&&` fonctionne bien ici car une chaîne vide est falsy et
          n'affiche rien — contrairement à un `0`, qui lui serait rendu. */}
      {messageSecurite && (
        <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
          Sécurité : {messageSecurite}
        </p>
      )}
    </form>
  );
}

export default FormulaireInscription;
