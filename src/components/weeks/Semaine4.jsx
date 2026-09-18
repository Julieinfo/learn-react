import React from 'react';
import TodoApp from '../TodoApp';
import GestionProduits from '../GestionProduits';

export default function Semaine4() {
  return (
    <div className="week-grid">
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
