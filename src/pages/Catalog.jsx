/* Responsabilité : filtrer et afficher le catalogue réel de la PerfApp S8. */
import React, { useMemo, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Le loader prépare les données avant le montage de la page lazy.
export const catalogLoader = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=12');

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }

  const data = await response.json();
  return data.products;
};

export default function Catalog() {
  const products = useLoaderData();
  const [search, setSearch] = useState('');
  // Le calcul dépend uniquement des produits chargés et du texte de recherche.
  const filteredProducts = useMemo(
    () => products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    ),
    [products, search]
  );

  return (
    <section>
      <h2>🛍️ Catalogue Produits</h2>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Rechercher un produit"
        aria-label="Rechercher un produit"
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price} €</p>
            <Link to={`/perf-shop/products/${product.id}`}>Voir détails →</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}