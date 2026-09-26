import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();

  return (
    <section>
      <h2>404 — Page introuvable</h2>
      <p>{error?.data || "La page que vous cherchez n'existe pas."}</p>
      <Link to="/">Retourner à l'accueil</Link>
    </section>
  );
}