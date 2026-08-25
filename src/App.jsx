// ============================================================================
// 📘 App.jsx
// ----------------------------------------------------------------------------
// 🧠 Note d'apprentissage : ce composant est le "chef d'orchestre" de l'application.
// La logique métier du panier est entièrement déléguée au Custom Hook `usePanier`.
// Le thème dynamique est consommé via `useTheme` (ThemeContext).
// ============================================================================

import CarteProduit from './components/CarteProduit';
import FormulaireInscription from './components/FormulaireInscription';
import Conteneur from './components/Conteneur';
import { useTheme } from './context/ThemeContext';
import BoutonTheme from './components/BoutonTheme';
import { useCart } from './context/CartContext';
import { useState } from 'react';

const PRODUITS_INITIAUX = [
  { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
  { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
  { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
];

function App() {
  const { theme } = useTheme();

  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  // 🟢 Extraction complète de la logique métier via le Custom Hook `useCart`
  const {
    produitsFiltres,
    filtreActif,
    totalPanier,
    reduction,
    appliquerPromo,
    totalArticles,
    setFiltreActif,
    ajouterQuantite,
    diminuerQuantite,
    viderPanier
  } = useCart();

  const [codePromo, setCodePromo] = useState('');

  const handleValidationPromo = (e) => {
    e.preventDefault();
    
    // On extrait la valeur numérique saisie dans l'input
    const valeurSaisie = parseFloat(codePromo.trim());

    // Verification : est-ce un nombre valide compris entre 1 et 100 ?
    if (!isNaN(valeurSaisie) && valeurSaisie >= 1 && valeurSaisie <= 100) {
      const taux = valeurSaisie / 100; // Conversion en décimal (ex: 20 => 0.20)
      appliquerPromo(taux);
      alert(`Code promo appliqué : ${valeurSaisie}% de réduction !`);
      setCodePromo(''); // Optionnel : réinitialise le champ après validation
    } else {
      alert('Veuillez entrer un pourcentage valide compris entre 1 et 100 !');
    }
  };

  // --------------------------------------------------------------------------
  // 🎨 RENDU JSX
  // --------------------------------------------------------------------------
  return (
    <div style={appStyle}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <BoutonTheme />
      </header>

      <Conteneur>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🛒 Application Demo React
        </h1>

        {/* Section 1 : Formulaire d'inscription */}
        <div style={{
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#2b2b2b',
          border: theme === 'light' ? '1px solid #e9ecef' : '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>
            🔒 Inscription & Validation du Mot de Passe
          </h2>
          <FormulaireInscription />
        </div>

        {/* Section 2 : Boutique & Panier */}
        <div style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#2b2b2b',
          border: theme === 'light' ? '1px solid #dee2e6' : '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>
            🛍️ Catalogue Produits
          </h2>

          {/* Boutons de Filtre */}
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
              Uniquement le panier ({totalArticles})
            </button>
          </div>

          {/* Rendu Conditionnel de la Liste */}
          {produitsFiltres.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#6c757d', textAlign: 'center', margin: '30px 0' }}>
              🛒 Aucun produit à afficher dans cette vue.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
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

          {/* Total du Panier */}
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

          {/* Bloc Code Promo */}
          <form onSubmit={handleValidationPromo} style={{ marginTop: '1rem'}}>
            <input
              type="text"
              placeholder="Entrez le code promo"
              value={codePromo}
              onChange={(e) => setCodePromo(e.target.value)}
            />
            <button type="submit">Appliquer</button>
          </form>

          {/* Affichage du total et de la réduction */}
          {reduction > 0 && <p style={{ color: 'green' }}>Réduction appliquée : {reduction * 100}%</p>}
          <h3>Total du panier : {totalPanier.toFixed(2)} €</h3>
        </div>
      </Conteneur>
    </div>
  );
}

export default App;