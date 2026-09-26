/* Responsabilité : regrouper les exercices de reducers et de transitions d'état. */
import React from 'react';
import TodoApp from '../TodoApp';
import GestionProduits from '../GestionProduits';

export default function Semaine4() {
  return (
    <div className="week-grid">
      <p className="week-days">Jours traités : lundi, mardi, mercredi et samedi.</p>
      <section className="week-card">
        <h2>📝 Semaine 4 : Reducers & historique</h2>
        <TodoApp />
      </section>
      <section className="week-card">
        <h2>🧩 Gestion des produits</h2>
        <GestionProduits />
      </section>
    </div>
  );
}
