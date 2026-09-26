/* Responsabilité : afficher le détail d'un utilisateur fourni par le loader. */
import React from 'react';
import { useLoaderData } from 'react-router-dom';

// Le paramètre de route détermine la ressource sans faire remonter l'accès réseau dans l'UI.
export const userDetailLoader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );

  if (!response.ok) {
    throw new Error('Utilisateur introuvable');
  }

  return response.json();
};

export default function UserDetail() {
  const user = useLoaderData();

  return (
    <article>
      <h3>Détails : {user.name}</h3>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Ville :</strong> {user.address.city}</p>
      <p><strong>Entreprise :</strong> {user.company.name}</p>
    </article>
  );
}