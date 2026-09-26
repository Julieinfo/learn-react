/* Responsabilité : regrouper les exercices de gestion d'état serveur. */
import React from 'react';
import ReactQueryDemo from '../ReactQueryDemo';
import UserListMiniProject from '../UserListMiniProject';
import SuspenseFetchDemo from '../SuspenseFetchDemo';
import IntegratorProjectS7 from '../IntegratorProjectS7';

export default function Semaine7() {
  return (
    <div className="week-grid">
      <p className="week-days">Jours traités : lundi, mardi, mercredi et samedi.</p>
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

      <section className="week-card">
        <h2>🌀 Suspense et Error Boundary</h2>
        <h3>3. Entrelacement : Suspense + Error Boundary (Mercredi)</h3>
        <p>
          Le parent prend en charge le chargement avec <code>Suspense</code>
          et intercepte les erreurs de rendu avec un Error Boundary.
        </p>
        <SuspenseFetchDemo />
      </section>

      <section className="week-card">
        <h2>🚀 Projet intégrateur S7</h2>
        <h3>4. Dashboard TanStack Query (Samedi)</h3>
        <p>
          Combinaison des queries, mutations, invalidation du cache et Query
          Key Factory dans un gestionnaire de posts complet.
        </p>
        <IntegratorProjectS7 />
      </section>
    </div>
  );
}