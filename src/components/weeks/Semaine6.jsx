import React from 'react';
import { Accordion } from '../Accordion';
import { Tabs } from '../Tabs';
import CompoundSelectDemo from '../CompoundSelectDemo';
import ProjetIntegrateurS6 from '../ProjetIntegrateurS6';

export default function Semaine6() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🧩 Semaine 6 : Composition Avancée</h2>

      {/* Lundi */}
      <section style={{ marginBottom: '30px' }}>
        <h3>1. Accordion Compound Component (Lundi)</h3>
        <Accordion defaultOpenId="1">
          <Accordion.Item id="1">
            <Accordion.Header>Section 1 : Design Patterns</Accordion.Header>
            <Accordion.Content>
              Les compound components créent une API déclarative et flexible.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="2">
            <Accordion.Header>Section 2 : Avantages</Accordion.Header>
            <Accordion.Content>
              L'état est partagé de façon transparente sans prop-drilling explicite.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      <hr style={{ margin: '30px 0' }} />

      {/* Mardi */}
      <section style={{ marginBottom: '30px' }}>
        <h3>2. Tabs Compound Component (Mardi)</h3>
        <Tabs defaultTab="react">
          <Tabs.List>
            <Tabs.Tab id="react">React</Tabs.Tab>
            <Tabs.Tab id="vite">Vite</Tabs.Tab>
            <Tabs.Tab id="js">JavaScript</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels>
            <Tabs.Panel id="react">
              <h4>React.js</h4>
              <p>Une bibliothèque pour créer des interfaces composables.</p>
            </Tabs.Panel>
            <Tabs.Panel id="vite">
              <h4>Vite</h4>
              <p>Un outil de build ultra-rapide pour le frontend.</p>
            </Tabs.Panel>
            <Tabs.Panel id="js">
              <h4>JavaScript</h4>
              <p>Le langage standard du web.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </section>

      <hr style={{ margin: '30px 0' }} />

      {/* Mercredi */}
      <section style={{ marginBottom: '30px' }}>
        <h3>3. Custom Hook Extrait (Mercredi)</h3>
        <CompoundSelectDemo />
      </section>

      <hr style={{ margin: '30px 0' }} />

      {/* Samedi */}
      <section style={{ marginBottom: '30px' }}>
        <h3>5. Projet Intégrateur S6 (Samedi)</h3>
        <ProjetIntegrateurS6 />
      </section>
    </div>
  );
}