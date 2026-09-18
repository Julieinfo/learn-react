import React from 'react';
import BoutonTheme from '../BoutonTheme';
import Conteneur from '../Conteneur';

export default function Semaine3() {
  return (
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
  );
}
