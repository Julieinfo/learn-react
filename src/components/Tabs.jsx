import React, { useState, createContext, useContext } from 'react';

// Contexte partagé pour le composant Tabs
const TabsContext = createContext();

// 1. Composant Conteneur Racine
export function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ maxWidth: '500px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// 2. Conteneur des Boutons d'Onglets
function TabList({ children }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
      {children}
    </div>
  );
}

// 3. Bouton d'Onglet Individuel
function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '12px 16px',
        border: 'none',
        backgroundColor: isActive ? '#ffffff' : 'transparent',
        borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#007bff' : '#555',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </button>
  );
}

// 4. Panneau de Contenu Réparti
function TabPanels({ children }) {
  return <div style={{ padding: '16px' }}>{children}</div>;
}

// 5. Contenu associé à un Onglet Spécifique
function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;

  return <div>{children}</div>;
}

// Attachement des sous-composants
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;