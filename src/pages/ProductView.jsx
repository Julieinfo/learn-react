/* Responsabilité : afficher le détail d'un produit dans la PerfApp S8. */
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// La route valide l'identifiant avant de rendre une fiche produit.
export const productViewLoader = async ({ params }) => {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!response.ok) {
    throw new Response('Produit non trouvé', { status: 404 });
  }

  return response.json();
};

export default function ProductView() {
  const product = useLoaderData();

  return (
    <article>
      <p><Link to="/perf-shop/products">← Retour au catalogue</Link></p>
      <h2>{product.title}</h2>
      <p><strong>Catégorie :</strong> {product.category}</p>
      <p><strong>Note :</strong> ⭐ {product.rating} / 5</p>
      <p>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
    </article>
  );
}