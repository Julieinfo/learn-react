import React from 'react';
import { Link } from 'react-router-dom';

export default function Semaine8() {
  return (
    <div className="week-grid">
      <section className="week-card">
        <h2>🚦 Semaine 8 : Routing</h2>
        <h3>1. React Router : routes imbriquées et loaders (Lundi)</h3>
        <p>
          Configuration de routes avec <code>createBrowserRouter</code>,
          affichage des routes enfants avec <code>Outlet</code> et chargement
          déclaratif des données avec des loaders.
        </p>
        <Link to="/users">Découvrir la liste des utilisateurs</Link>
      </section>

      <section className="week-card">
        <h2>🛍️ Mini-projet multi-pages</h2>
        <h3>2. Application multi-pages (Mardi)</h3>
        <p>
          Navigation entre l'accueil, le catalogue, les fiches produits et la
          page À propos, avec loaders, chargement global et page 404.
        </p>
        <Link to="/products">Ouvrir le Mini-Shop →</Link>
      </section>

      <section className="week-card">
        <h2>⚡ Projet intégrateur S8</h2>
        <h3>3. App multi-pages, fetching réel et performance (Samedi)</h3>
        <p>
          Catalogue réel filtrable, code splitting par route et mesure des
          rendus avec <code>Profiler</code>.
        </p>
        <Link to="/perf-shop">Ouvrir la PerfApp S8 →</Link>
      </section>
    </div>
  );
}