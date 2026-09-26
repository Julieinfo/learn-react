import React from 'react';
import RechercheProduits from '../RechercheProduits';

export default function Semaine2() {
  return (
    <div className="week-grid">
      <p className="week-days">Jours traités : lundi, mardi, mercredi et samedi.</p>
      <section className="week-card">
      <h2>🔎 Semaine 2 : Effets secondaires & API</h2>
      <RechercheProduits />
      </section>
    </div>
  );
}
