/* Responsabilité : afficher le catalogue du Mini-Shop à partir de données préchargées. */
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Le loader déclare la dépendance réseau au niveau de la route, avant le rendu.
export const productsLoader = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=8');

  if (!response.ok) {
    throw new Error('Impossible de charger les produits');
  }

  const data = await response.json();
  return data.products;
};

export default function Products() {
  const products = useLoaderData();

  return (
    <section>
      <h2>Catalogue des produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price} €</p>
            <Link to={`/products/${product.id}`}>Voir la fiche →</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}