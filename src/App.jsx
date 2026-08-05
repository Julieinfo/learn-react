/**
 * App.jsx — Composant racine (conteneur « intelligent »)
 *
 * Rôle dans l'architecture : point d'assemblage de l'application. Il détient
 * l'état global du catalogue/panier (source unique de vérité) et la logique
 * métier associée, puis compose deux sections indépendantes :
 *   1. <FormulaireInscription /> — composant autonome, état 100 % local ;
 *   2. la boutique — liste de <CarteProduit /> pilotée par l'état d'App.
 *
 * Mémo L3 : l'état vit dans le plus proche ancêtre commun des composants qui
 * en dépendent (levée d'état / lifting state up). Ce qui n'intéresse qu'un seul
 * composant (le mot de passe, le favori) reste au contraire local.
 */

// Note d'apprentissage : `useState` retourne le couple [valeur, setter] ;
// seul le setter déclenche un nouveau rendu.
import { useState } from 'react';
import CarteProduit from './CarteProduit';
// Composant autonome : App ne lui transmet aucune prop, il gère son propre état
// et son propre effet secondaire (validation temporisée).
import FormulaireInscription from './FormulaireInscription';

function App() {
  // État global du catalogue produit
  // Mémo L3 : le tableau passé à useState n'est que la valeur INITIALE,
  // évaluée uniquement au premier rendu.
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
    { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
    { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
  ]);

  // State du filtre actif ('TOUS' | 'PANIER')
  // Note d'apprentissage : on stocke le CRITÈRE, pas la liste filtrée. La liste
  // affichée sera recalculée à chaque rendu → aucun risque de désynchronisation
  // entre deux morceaux d'état redondants.
  const [filtreActif, setFiltreActif] = useState('TOUS');

  // Fonctions de gestion du panier (Immutabilité)
  // Mémo L3 : `.map()` est une fonction d'ordre supérieur qui retourne un
  // NOUVEAU tableau ; le spread `{ ...p }` crée une copie du produit ciblé.
  // React compare les références pour détecter un changement : muter
  // `produits[i].quantite` ne déclencherait aucun re-rendu.
  const ajouterQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));
  };

  // Même logique immuable ; `Math.max(0, …)` garantit l'invariant quantite >= 0.
  const diminuerQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p));
  };

  // Réinitialisation globale : on reconstruit une copie de chaque produit.
  // Les parenthèses autour de ({ ...produit }) sont obligatoires, sinon les
  // accolades seraient lues comme un corps de fonction fléchée.
  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  // Données dérivées (Calculées à la volée)
  // `.filter()` retourne un sous-tableau sans modifier l'original (non destructif).
  // Ce n'est PAS un state : c'est une valeur dérivée de (produits, filtreActif).
  const produitsFiltres = produits.filter(produit => {
    // Opérateur ternaire : forme condensée d'un if/else, utilisable en expression.
    return filtreActif === 'PANIER' ? produit.quantite > 0 : true;
  });

  // `.reduce()` agrège le tableau en une seule valeur : `acc` est l'accumulateur
  // et `0` sa valeur initiale (indispensable si le tableau est vide).
  // Le court-circuit `produit.prix || 0` sécurise le calcul contre une donnée
  // manquante et évite un résultat NaN.
  const totalPanier = produits.reduce((acc, produit) => {
    return acc + ((produit.prix || 0) * produit.quantite);
  }, 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🛒 Application Demo React
      </h1>

      {/* Section 1 : Formulaire de validation dynamique */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', color: '#495057' }}>
          🔒 Inscription & Validation du Mot de Passe
        </h2>
        {/* Intégration simple du composant autonome */}
        {/* Aucune prop transmise : ses états (motDePasse, messageSecurite) et son
            effet secondaire (debounce) sont entièrement encapsulés. */}
        <FormulaireInscription />
      </div>

      {/* Section 2 : Boutique & Panier */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', color: '#495057' }}>
          🛍️ Catalogue Produits
        </h2>

        {/* Boutons de Filtre */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          {/* Fonction fléchée dans onClick : elle diffère l'appel du setter au
              moment du clic (obligatoire dès qu'on passe un argument).
              Les couleurs sont pilotées par un ternaire → l'UI est une fonction
              de l'état : le bouton actif se met en surbrillance tout seul. */}
          <button 
            onClick={() => setFiltreActif('TOUS')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: filtreActif === 'TOUS' ? '#007bff' : '#e9ecef',
              color: filtreActif === 'TOUS' ? '#fff' : '#333',
              cursor: 'pointer'
            }}
          >
            Tous les produits
          </button>
          
          <button 
            onClick={() => setFiltreActif('PANIER')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: filtreActif === 'PANIER' ? '#007bff' : '#e9ecef',
              color: filtreActif === 'PANIER' ? '#fff' : '#333',
              cursor: 'pointer'
            }}
          >
            {/* Compteur calculé à la volée : .filter() puis .length. */}
            Uniquement le panier ({produits.filter(p => p.quantite > 0).length})
          </button>
        </div>

        {/* Rendu Conditionnel de la Liste */}
        {/* Ternaire = choix entre DEUX rendus alternatifs (message vs liste). */}
        {produitsFiltres.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#6c757d', textAlign: 'center', margin: '30px 0' }}>
            🛒 Aucun produit à afficher dans cette vue.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {/* `.map()` transforme chaque donnée en élément JSX. La prop `key`
                doit être unique et STABLE (l'id, jamais l'index) pour que
                l'algorithme de réconciliation identifie correctement les
                éléments lors des ajouts, suppressions ou réordonnancements. */}
            {produitsFiltres.map((produit) => (
              <CarteProduit
                key={produit.id}
                /* Propagation des props : les données descendent du parent vers
                   l'enfant (flux de données unidirectionnel), en lecture seule. */
                nom={produit.nom}
                description={produit.description}
                prix={produit.prix}
                quantite={produit.quantite}
                /* Props-callbacks : l'enfant ne connaît pas l'id ; la closure
                   capture `produit.id` et l'action remonte jusqu'ici
                   (communication enfant → parent). */
                onAjouter={() => ajouterQuantite(produit.id)}
                onDiminuer={() => diminuerQuantite(produit.id)}
              />
            ))}
          </div>
        )}

        {/* Total du Panier */}
        {/* Court-circuit logique `&&` : si la condition est fausse, React
            n'affiche rien. Piège classique : avec une valeur numérique brute
            (`totalPanier &&`) un 0 serait rendu tel quel → on compare
            explicitement avec `> 0`. */}
        {totalPanier > 0 && (
          <div style={{ 
            marginTop: '25px', 
            borderTop: '2px solid #e9ecef', 
            paddingTop: '15px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, color: '#28a745' }}>
              Total du panier : {totalPanier} €
            </h3>
            <button 
              onClick={viderPanier} 
              style={{ 
                backgroundColor: '#dc3545', 
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
