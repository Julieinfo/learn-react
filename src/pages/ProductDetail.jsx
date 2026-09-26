import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

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