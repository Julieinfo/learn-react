/* Responsabilité : afficher une fiche produit résolue par le paramètre de route. */
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Une ressource absente devient une erreur de route exploitable par le fallback.
export const productDetailLoader = async ({ params }) => {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!response.ok) {
    throw new Response('Produit non trouvé', { status: 404 });
  }

  return response.json();
};

export default function ProductDetail() {
  const product = useLoaderData();

  return (
    <article>
      <p><Link to="/products">← Retour au catalogue</Link></p>
      <h2>{product.title}</h2>
      <p><strong>Marque :</strong> {product.brand}</p>
      <p><strong>Catégorie :</strong> {product.category}</p>
      <p>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
    </article>
  );
}