import { useState } from 'react';
import CarteProduit from './CarteProduit';
import FormulaireInscription from './FormulaireInscription';

function App() {
  // État global du catalogue produit
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
    { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
    { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
  ]);

  // State du filtre actif ('TOUS' | 'PANIER')
  const [filtreActif, setFiltreActif] = useState('TOUS');

  // Fonctions de gestion du panier (Immutabilité)
  const ajouterQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));
  };

  const diminuerQuantite = (id) => {
    setProduits(produits.map(p => p.id === id ? { ...p, quantite: Math.max(0, p.quantite - 1) } : p));
  };

  const viderPanier = () => {
    setProduits(produits.map(produit => ({ ...produit, quantite: 0 })));
  };

  // Données dérivées (Calculées à la volée)
  const produitsFiltres = produits.filter(produit => {
    return filtreActif === 'PANIER' ? produit.quantite > 0 : true;
  });

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
            Uniquement le panier ({produits.filter(p => p.quantite > 0).length})
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