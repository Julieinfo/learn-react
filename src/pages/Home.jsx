import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <h2>Bienvenue sur le Mini-Shop</h2>
      <p>
        Cette application démontre la navigation multi-pages déclarative avec
        React Router v6.
      </p>
      <Link to="/products">Découvrir le catalogue →</Link>
    </section>
  );
}