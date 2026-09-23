import React from 'react';
import ReactQueryDemo from '../ReactQueryDemo';
import UserListMiniProject from '../UserListMiniProject';

export default function Semaine7() {
  return (
    <div className="week-grid">
      <section className="week-card">
        <h2>🌐 Semaine 7 : Data Fetching</h2>
        <h3>1. React Query : queries, cache et invalidation (Lundi)</h3>
        <p>
          Chargement de données avec <code>useQuery</code>, gestion de la
          fraîcheur du cache et invalidation manuelle avec
          <code>invalidateQueries</code>.
        </p>
        <ReactQueryDemo />
      </section>

      <section className="week-card">
        <h2>📋 Fetching et gestion des erreurs</h2>
        <h3>2. Mini-projet : liste avec fetching et erreurs (Mardi)</h3>
        <p>
          Gestion des états de chargement, d'erreur et de rechargement manuel,
          avec simulation d'une panne réseau.
        </p>
        <UserListMiniProject />
      </section>
    </div>
  );
}