import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorView() {
  const error = useRouteError();

  return (
    <section>
      <h2>❌ Une erreur est survenue</h2>
      <p>{error?.statusText || error?.data || "Impossible d'afficher cette page."}</p>
      <Link to="/">← Retourner à l'accueil</Link>
    </section>
  );
}