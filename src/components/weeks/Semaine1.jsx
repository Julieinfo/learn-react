import React from 'react';
import CarteProduit from '../CarteProduit';
import Conteneur from '../Conteneur';
import FormulaireInscription from '../FormulaireInscription';

export default function Semaine1({
  produitsFiltres,
  totalPanier,
  reduction,
  totalArticles,
  codePromo,
  setFiltreActif,
  ajouterQuantite,
  diminuerQuantite,
  viderPanier,
  handleValidationPromo,
  setCodePromo
}) {
  return (
    <div className="week-grid">
      <p className="week-days">Jours traités : lundi, mardi, mercredi et samedi.</p>
      <section className="week-card">
        <h2>🔒 Inscription & Validation du Mot de Passe</h2>
        <FormulaireInscription />
      </section>

      <Conteneur>
        <h2>🛒 Application Demo React</h2>
        <h3>🛍️ Catalogue Produits</h3>

        <div className="catalogue-filters">
          <button onClick={() => setFiltreActif('TOUS')}>Tous les produits</button>
          <button onClick={() => setFiltreActif('PANIER')}>
            Uniquement le panier ({totalArticles})
          </button>
        </div>

        {produitsFiltres.length === 0 ? (
          <p>Aucun produit à afficher dans cette vue.</p>
        ) : (
          <div className="product-grid">
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

        {totalPanier > 0 && (
          <div className="cart-summary">
            <h3>Total du panier : {totalPanier} €</h3>
            <button onClick={viderPanier}>Vider le panier</button>
          </div>
        )}

        <form onSubmit={handleValidationPromo} className="promo-form">
          <input
            type="text"
            placeholder="Entrez le code promo"
            value={codePromo}
            onChange={(event) => setCodePromo(event.target.value)}
          />
          <button type="submit">Appliquer</button>
        </form>

        {reduction > 0 && <p>Réduction appliquée : {reduction * 100}%</p>}
        <h3>Total du panier : {totalPanier.toFixed(2)} €</h3>
      </Conteneur>
    </div>
  );
}
