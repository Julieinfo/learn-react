import React from 'react';
import { Accordion } from '../Accordion';
import { Tabs } from '../Tabs';

export default function Semaine6() {
  return (
    <div className="week-grid">
      <section className="week-card">
        <h2>🧩 Accordion Compound Component</h2>
        <Accordion defaultOpenId="patterns">
          <Accordion.Item id="patterns">
            <Accordion.Header>Section 1 : Design Patterns</Accordion.Header>
            <Accordion.Content>
              Les compound components créent une API déclarative et flexible.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="advantages">
            <Accordion.Header>Section 2 : Avantages</Accordion.Header>
            <Accordion.Content>
              L'état est partagé entre les sous-composants sans prop-drilling.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      <section className="week-card">
        <h2>📑 Tabs Compound Component</h2>
        <Tabs defaultTab="react">
          <Tabs.List>
            <Tabs.Tab id="react">React</Tabs.Tab>
            <Tabs.Tab id="vite">Vite</Tabs.Tab>
            <Tabs.Tab id="js">JavaScript</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel id="react">
              <h3>React.js</h3>
              <p>Une bibliothèque pour créer des interfaces composables.</p>
            </Tabs.Panel>
            <Tabs.Panel id="vite">
              <h3>Vite</h3>
              <p>Un outil de build rapide pour les projets frontend.</p>
            </Tabs.Panel>
            <Tabs.Panel id="js">
              <h3>JavaScript</h3>
              <p>Le langage au cœur de l'écosystème Web moderne.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </section>
    </div>
  );
}
