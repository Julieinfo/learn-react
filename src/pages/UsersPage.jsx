import React from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';

export const usersLoader = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=4'
  );

  if (!response.ok) {
    throw new Error('Erreur de chargement des utilisateurs');
  }

  return response.json();
};

export default function UsersPage() {
  const users = useLoaderData();

  return (
    <section>
      <h2>👥 Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={String(user.id)}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
}