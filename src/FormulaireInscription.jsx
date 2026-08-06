// ============================================================================
// 📘 FormulaireInscription.jsx
// ----------------------------------------------------------------------------
// 🧠 Note d'apprentissage : ce composant est totalement AUTONOME. Il gère lui-
// même son ÉTAT LOCAL (la saisie du mot de passe et le message de sécurité
// affiché) via useState, sans recevoir ni renvoyer aucune prop à son parent
// (App.jsx). C'est un excellent exemple d'isolation des composants : personne
// d'autre dans l'application n'a besoin de connaître le contenu du mot de
// passe, donc cet état n'a aucune raison d'être remonté (Lifting State Up).
// Il illustre également un EFFET SECONDAIRE (side effect) piloté par
// useEffect, avec temporisation (debounce) et fonction de nettoyage (cleanup).
// ============================================================================

import React, { useState, useEffect } from 'react';

function FormulaireInscription() {
  // --------------------------------------------------------------------------
  // 🏠 ÉTAT LOCAL (useState)
  // --------------------------------------------------------------------------
  // Mémo L3 : useState('') déclare une variable d'état initialisée à une
  // chaîne vide. motDePasse reflète en temps réel la saisie de l'utilisateur
  // (formulaire CONTRÔLÉ : la valeur de l'input provient TOUJOURS du state,
  // jamais du DOM seul). messageSecurite est un état DÉRIVÉ de motDePasse,
  // recalculé de façon réactive dans l'effet ci-dessous.
  const [motDePasse, setMotDePasse] = useState('');
  const [messageSecurite, setMessageSecurite] = useState('');

  // --------------------------------------------------------------------------
  // ⚡ EFFET SECONDAIRE (useEffect) — Validation réactive avec DEBOUNCE
  // --------------------------------------------------------------------------
  // Mémo L3 : useEffect(fn, [dep]) exécute fn après le rendu, et la ré-exécute
  // à chaque fois qu'une valeur du TABLEAU DE DÉPENDANCES change. Ici, le
  // tableau [motDePasse] indique : "relance cet effet dès que motDePasse change".
  useEffect(() => {
    // 1. Si le champ est vide, réinitialisation directe (guard clause) :
    //    on sort immédiatement, aucun besoin de programmer un timer inutile.
    if (!motDePasse) {
      setMessageSecurite('');
      return;
    }

    // 2. TEMPORISATION (debounce) : au lieu de recalculer le niveau de sécurité
    //    à CHAQUE frappe (ce qui serait coûteux si le calcul était lourd, par
    //    ex. un appel API), on attend 300ms d'inactivité avant d'évaluer.
    //    setTimeout programme cette évaluation différée.
    const timer = setTimeout(() => {
      if (motDePasse.length < 6) {
        setMessageSecurite('Trop court ❌');
      } else if (motDePasse.length <= 10) {
        setMessageSecurite('Moyen ⚠️');
      } else {
        setMessageSecurite('Fort ✅');
      }
    }, 300);

    // 3. FONCTION DE NETTOYAGE (cleanup) : React l'exécute AVANT de relancer
    //    l'effet suivant (donc à chaque nouvelle frappe) et juste avant le
    //    démontage du composant. clearTimeout(timer) annule ainsi le minuteur
    //    précédent : seule la DERNIÈRE frappe déclenchera réellement le calcul
    //    du niveau de sécurité, une fois la saisie stabilisée.
    return () => clearTimeout(timer);
  }, [motDePasse]);

  // --------------------------------------------------------------------------
  // 🎨 RENDU JSX
  // --------------------------------------------------------------------------
  return (
    // onSubmit intercepte la soumission native du formulaire HTML et empêche
    // le rechargement de page (e.preventDefault()) — indispensable dans une SPA.
    <form onSubmit={(e) => e.preventDefault()} style={{ padding: '20px', maxWidth: '300px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Mot de passe :</label>
      {/* Input CONTRÔLÉ : value provient du state motDePasse, et onChange met
          à jour ce state à chaque frappe (e.target.value), ce qui redéclenche
          un rendu ET, via le tableau de dépendances, relance l'effet ci-dessus. */}
      <input 
        type="password" 
        value={motDePasse} 
        onChange={(e) => setMotDePasse(e.target.value)} 
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {/* Court-circuit logique && : ce paragraphe n'est rendu QUE si
          messageSecurite est une chaîne non vide (donc truthy). Tant que le
          debounce n'a pas abouti ou que le champ est vide, rien ne s'affiche. */}
      {messageSecurite && (
        <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
          Sécurité : {messageSecurite}
        </p>
      )}
    </form>
  );
}

export default FormulaireInscription;
