/* Responsabilité : regrouper les exercices de Context API et de thème. */
import React from 'react';
import BoutonTheme from '../BoutonTheme';
import Conteneur from '../Conteneur';

export default function Semaine3() {
  return (
    <div className="week-grid">
      <p className="week-days">Jours traités : lundi, mardi, mercredi et samedi.</p>
      <section className="week-card">
      <h2>🎨 Semaine 3 : Context API & thème</h2>
      <Conteneur>
        <p>
          Le thème est partagé par la Context API et persiste entre les
          sessions grâce au localStorage.
        </p>
        <BoutonTheme />
      </Conteneur>
      </section>
    </div>
  );
}
