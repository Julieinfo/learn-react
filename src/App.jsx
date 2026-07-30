/**
 * App.jsx — Composant racine (conteneur « intelligent »)
 *
 * Rôle dans l'architecture : c'est ici que vit l'état de l'application
 * (source unique de vérité) et toute la logique métier du panier. Les composants
 * enfants (CarteProduit) restent « présentationnels » : ils affichent des props
 * et signalent les actions de l'utilisateur via des callbacks.
 *
 * Mémo L3 : ce découpage correspond à la levée d'état (lifting state up) —
 * l'état est placé dans le plus proche ancêtre commun des composants qui en
 * dépendent, ici les trois cartes produit et le résumé du total.
 */

// Note d'apprentissage : `useState` retourne un couple [valeur, setter] ;
// muter la valeur à la main ne déclencherait aucun rendu, il faut passer par le setter.
import { useState } from 'react'
// Import du composant enfant : la composition remplace l'héritage en React.
import CarteProduit from './CarteProduit'

function App() {
  // État global (à l'échelle de l'application) : le catalogue et les quantités.
  // Mémo L3 : le tableau passé à useState n'est que la valeur INITIALE, évaluée
  // au premier rendu uniquement.
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: 'Casque Audio',
      description: 'Casque réducteur de bruit',
      prix: 150,
      quantite: 0
    },
    {
      id: 2,
      nom: 'Souris Gamer',
      description: 'Souris optique sans fil',
      prix: 50,
      quantite: 0
    },
    {
      id: 3,
      nom: 'Clavier Mécanique',
      description: 'Clavier RGB switch red',
      prix: 100,
      quantite: 0
    }
  ]);

  // 1. State du filtre actif
  // Note d'apprentissage : on stocke un critère ('TOUS' | 'PANIER'), pas la
  // liste filtrée. La liste affichée sera une donnée DÉRIVÉE, recalculée à
  // chaque rendu → pas de risque de désynchronisation entre deux états.
  const [filtreActif, setFiltreActif] = useState('TOUS');

  // Gestion des quantités
  // Mémo L3 — immutabilité du state : `.map()` est une fonction d'ordre
  // supérieur qui retourne un NOUVEAU tableau. On y remplace uniquement le
  // produit ciblé par une copie modifiée (spread `...p`), les autres objets
  // sont réutilisés tels quels. React compare les références pour détecter le
  // changement : muter `produits[i].quantite` ne provoquerait aucun re-rendu.
  const ajouterQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));
  };

  // Même logique immuable ; `Math.max(0, ...)` garantit l'invariant quantite >= 0.
  const diminuerQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p));
  };

  // Réinitialisation : on reconstruit une copie de chaque produit avec quantite à 0.
  // Note d'apprentissage : les parenthèses autour de ({ ...produit }) sont
  // obligatoires, sinon les accolades seraient interprétées comme un corps de fonction.
  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  // 2. Filtrage (utilisation de filtreActif)
  // Mémo L3 : `.filter()` produit un sous-tableau sans modifier l'original
  // (non destructif). Cette variable n'est pas un state : c'est un calcul
  // dérivé de (produits, filtreActif), donc toujours à jour.
  const produitsFiltres = produits.filter(produit => {
    if (filtreActif === 'PANIER') {
      return produit.quantite > 0;
    } else {
      return true;
    }
  });

  // Mémo L3 : `.reduce()` agrège un tableau en une seule valeur ; `acc` est
  // l'accumulateur et `0` sa valeur initiale (indispensable pour un tableau vide).
  // `produit.prix || 0` est un court-circuit logique qui sécurise le calcul
  // contre une donnée manquante et évite un résultat NaN.
  const totalPanier = produits.reduce((acc, produit) => {
    const prix = produit.prix || 0;
    return acc + (prix * produit.quantite);
  }, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mon Panier d'Achat</h1>

      {/* Boutons de filtres */}
      <div style={{ marginBottom: '20px' }}>
        {/* Fonction fléchée dans onClick : elle diffère l'appel du setter au
            moment du clic (indispensable dès qu'on doit passer un argument). */}
        <button onClick={() => setFiltreActif('TOUS')}>
          Tous les produits
        </button>
        <button onClick={() => setFiltreActif('PANIER')}>
          {/* Compteur calculé à la volée : filter() puis .length. */}
          Uniquement le panier ({produits.filter(p => p.quantite > 0).length})
        </button>
      </div>

      {/* 1. RENDU CONDITIONNEL AVEC TERNAIRE pour la liste de produits */}
      {/* Ternaire = on choisit entre DEUX rendus alternatifs (liste vide vs liste). */}
      {produitsFiltres.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'gray' }}>
          🛒 Aucun produit à afficher ici.
        </p>
      ) : (
        <div>
          {/* Note d'apprentissage : `.map()` transforme chaque donnée en élément
              JSX. La prop `key` doit être unique et STABLE (l'id, jamais l'index)
              pour que l'algorithme de réconciliation identifie correctement les
              éléments lors des ajouts, suppressions ou réordonnancements. */}
          {produitsFiltres.map((produit) => (
            <CarteProduit
              key={produit.id}
              /* Propagation des props : les données descendent du parent vers
                 l'enfant (flux de données unidirectionnel). */
              nom={produit.nom}
              description={produit.description}
              prix={produit.prix}
              quantite={produit.quantite}
              /* Props-callbacks : l'enfant ne connaît pas l'id, la closure
                 capture `produit.id` et remonte l'action jusqu'ici. */
              onAjouter={() => ajouterQuantite(produit.id)}
              onDiminuer={() => diminuerQuantite(produit.id)}
            />
          ))}
        </div>
      )}

      {/* 2. RENDU CONDITIONNEL AVEC && pour le résumé du panier */}
      {/* Court-circuit logique : si la condition est fausse, l'expression vaut
          `false` et React n'affiche rien. Attention au piège classique : avec
          une valeur numérique (ex. `totalPanier &&`), un 0 serait affiché tel
          quel → on compare explicitement avec `> 0`. */}
      {totalPanier > 0 && (
        <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '10px' }}>
          <h3>Total du panier : {totalPanier} €</h3>
          <button onClick={viderPanier} style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
            Vider le panier
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
