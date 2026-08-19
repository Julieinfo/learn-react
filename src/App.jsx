// ============================================================================
// 📘 App.jsx
// ----------------------------------------------------------------------------
// 🧠 Note d'apprentissage : ce composant est le "chef d'orchestre" (composant
// conteneur) de l'application. Il centralise l'ÉTAT GLOBAL (le catalogue de
// produits et le filtre actif) et toute la logique métier associée (ajout,
// diminution, réinitialisation du panier, calculs dérivés).
// Il assemble ensuite deux sections indépendantes : le formulaire d'inscription
// (état 100 % local, encapsulé dans FormulaireInscription) et la boutique
// (état global, remonté ici via le pattern Lifting State Up).
// ============================================================================

import { useState } from 'react';
import CarteProduit from './components/CarteProduit';
import FormulaireInscription from './components/FormulaireInscription';
import Conteneur from './components/Conteneur';
import {useTheme} from './context/ThemeContext';
import BoutonTheme from './components/BoutonTheme';

function App() {
  const { theme } = useTheme();
  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };
  // --------------------------------------------------------------------------
  // 🗂️ ÉTAT GLOBAL (State)
  // --------------------------------------------------------------------------
  // Mémo L3 : useState renvoie une paire [valeur actuelle, fonction de mise à
  // jour]. Ce state est dit "global" car il est déclaré ici, au niveau du
  // composant parent, puis PROPAGÉ (via props) aux composants enfants qui en
  // ont besoin (CarteProduit). C'est le principe du Lifting State Up : on
  // remonte l'état au plus proche ancêtre commun de tous les composants qui
  // doivent le lire ou le modifier.
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
    { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
    { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
  ]);

  // 🔍 State du filtre actif ('TOUS' | 'PANIER')
  // Note d'apprentissage : une simple chaîne de caractères suffit ici comme
  // "mode" de filtrage ; elle pilote le calcul dérivé produitsFiltres ci-dessous.
  const [filtreActif, setFiltreActif] = useState('TOUS');

  // --------------------------------------------------------------------------
  // 🔧 HANDLERS — Logique métier & IMMUTABILITÉ DU STATE
  // --------------------------------------------------------------------------
  // Mémo L3 : React détecte qu'un composant doit se re-render en comparant la
  // RÉFÉRENCE de l'ancien et du nouveau state, pas son contenu profond. On ne
  // modifie donc JAMAIS un tableau/objet de state "en place" (mutation) : on
  // utilise systématiquement des fonctions d'ordre supérieur comme .map() et
  // .filter(), qui renvoient un TOUT NOUVEAU tableau à chaque appel.

  // ➕ Incrémente la quantité d'un produit ciblé par son id.
  // L'opérateur ternaire choisit, pour CHAQUE élément du tableau, s'il faut
  // renvoyer une copie modifiée ({ ...p, quantite: ... }) ou l'élément inchangé.
  const ajouterQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));
  };

  // ➖ Diminue la quantité, sans jamais descendre sous 0 (Math.max sécurise la borne basse).
  const diminuerQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p));
  };

  // 🧹 Réinitialise toutes les quantités à 0, tout en gardant la structure du tableau
  // (même nombre de produits, mêmes infos, seule la quantité change).
  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  // --------------------------------------------------------------------------
  // 📊 DONNÉES DÉRIVÉES (calculées à chaque rendu, jamais stockées dans un state)
  // --------------------------------------------------------------------------
  // Mémo L3 : règle d'or — "ne stocker dans le state que ce qui ne peut pas
  // être recalculé à partir d'autre chose". produitsFiltres et totalPanier
  // dépendent entièrement de produits/filtreActif : ils sont donc recalculés
  // à chaque rendu via .filter() et .reduce(), sans jamais dupliquer le state
  // source (on évite ainsi tout risque de désynchronisation).

  // 🔎 .filter() renvoie un sous-tableau : tous les produits si filtreActif
  // vaut 'TOUS', sinon uniquement ceux déjà présents dans le panier (quantite > 0).
  const produitsFiltres = produits.filter(produit => {
    return filtreActif === 'PANIER' ? produit.quantite > 0 : true;
  });

  // 💰 .reduce() agrège le tableau en une seule valeur numérique : le total du panier.
  // (produit.prix || 0) sécurise le calcul si jamais prix venait à être undefined/falsy.
  const totalPanier = produits.reduce((acc, produit) => {
    return acc + ((produit.prix || 0) * produit.quantite);
  }, 0);

  // --------------------------------------------------------------------------
  // 🎨 RENDU JSX
  // --------------------------------------------------------------------------
  return (
    <div style={appStyle}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <BoutonTheme />
      </header>

      <Conteneur>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          🛒 Application Demo React
        </h1>

        {/* --------------------------------------------------------------------
            Section 1 : Formulaire de validation dynamique
            Note d'apprentissage : FormulaireInscription est intégré ici SANS
            aucune prop. Il gère intégralement son propre état LOCAL (mot de
            passe saisi + message de sécurité). App.jsx n'a aucune connaissance
            ni aucun contrôle sur cet état interne : c'est une bonne illustration
            de l'isolation des composants (state local vs state global remonté).
        -------------------------------------------------------------------- */}
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
          <FormulaireInscription />
        </div>

        {/* --------------------------------------------------------------------
            Section 2 : Boutique & Panier
            Ici, en revanche, l'état (produits, filtreActif) est bien GLOBAL :
            il est déclaré dans App.jsx puis PROPAGÉ vers CarteProduit via props.
        -------------------------------------------------------------------- */}
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

          {/* Boutons de Filtre
              Note d'apprentissage : chaque bouton appelle setFiltreActif au clic,
              ce qui déclenche un re-render. Le style de fond/texte est calculé
              dynamiquement via un opérateur ternaire comparant filtreActif à la
              valeur du bouton, pour surligner visuellement le filtre actif. */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
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
              {/* .filter().length recalcule à la volée le nombre de produits déjà
                  dans le panier, sans passer par un state dédié (donnée dérivée) */}
              Uniquement le panier ({produits.filter(p => p.quantite > 0).length})
            </button>
          </div>

          {/* Rendu Conditionnel de la Liste
              Mémo L3 : opérateur ternaire (condition ? A : B) — on choisit ici
              entre DEUX rendus mutuellement exclusifs : un message "liste vide"
              ou la grille de cartes produits. On boucle bien sur produitsFiltres
              (le tableau DÉRIVÉ), jamais sur produits (le tableau source), sinon
              le filtre n'aurait aucun effet visible à l'écran. */}
          {produitsFiltres.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#6c757d', textAlign: 'center', margin: '30px 0' }}>
              🛒 Aucun produit à afficher dans cette vue.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {/* .map() transforme chaque produit du tableau filtré en un composant
                  CarteProduit. La prop key (produit.id, identifiant stable) est
                  indispensable pour que React puisse suivre chaque élément lors
                  des réconciliations du DOM virtuel.
                  Les callbacks onAjouter/onDiminuer illustrent le pattern
                  "data down, actions up" : la donnée descend en props, l'action
                  utilisateur remonte vers les handlers définis plus haut. */}
              {produitsFiltres.map((produit) => (
                <CarteProduit
                  key={produit.id}
                  nom={produit.nom}
                  description={produit.description}
                  prix={produit.prix}
                  quantite={produit.quantite}
                  onAjouter={() => ajouterQuantite(produit.id)}
                  onDiminuer={() => diminuerQuantite(produit.id)}
                />
              ))}
            </div>
          )}

          {/* Total du Panier
              Mémo L3 : court-circuit logique && — ce bloc entier n'est rendu QUE
              si totalPanier > 0 est vrai ; sinon, l'expression s'arrête à `false`
              et React n'affiche rien du tout (contrairement au ternaire, qui
              choisit entre DEUX rendus, ici on choisit entre "un rendu" et "rien"). */}
          {totalPanier > 0 && (
            <div style={{ 
              marginTop: '25px', 
              borderTop: '2px solid #e9ecef', 
              paddingTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
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
      </Conteneur>
    </div>
    );
}

export default App;