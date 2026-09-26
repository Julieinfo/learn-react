/* Responsabilité : fournir la navigation commune et le point d'insertion Outlet. */
import React from 'react';
import { NavLink, Outlet, useNavigation } from 'react-router-dom';

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#007bff' : '#333',
    marginRight: '16px'
  });

  return (
    <div>
      <header>
        <h1>🛍️ Mini-Shop Multi-pages</h1>
        <nav aria-label="Navigation principale">
          <NavLink to="/" style={linkStyle}>Accueil</NavLink>
          <NavLink to="/products" style={linkStyle}>Produits</NavLink>
          <NavLink to="/about" style={linkStyle}>À propos</NavLink>
          <NavLink to="/users" style={linkStyle}>Utilisateurs</NavLink>
          <NavLink to="/perf-shop" style={linkStyle}>PerfApp S8</NavLink>
          <NavLink to="/learning" style={linkStyle}>Parcours</NavLink>
        </nav>
        {isLoading && <p role="status">⏳ Chargement en cours...</p>}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}