import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <header>
        <h1>🚦 React Router : Routes imbriquées &amp; Loaders</h1>
        <nav aria-label="Navigation principale">
          <Link to="/">Accueil</Link>{' '}
          <Link to="/users">Utilisateurs (Nested)</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}