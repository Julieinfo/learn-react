import React, { useState, createContext, useContext } from 'react';

// Contexte interne : il partage l'élément ouvert entre les sous-composants.
const AccordionContext = createContext(null);

// Composant parent : il possède l'état partagé et fournit la logique de bascule.
export function Accordion({ children, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  const toggleItem = (id) => {
    setOpenId((previousId) => (previousId === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openId, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
}

// Item : clone ses enfants pour leur transmettre implicitement l'identifiant.
function AccordionItem({ id, children }) {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { itemId: id })
      )}
    </div>
  );
}

// Header : il lit le contexte et déclenche l'ouverture ou la fermeture de l'item.
function AccordionHeader({ itemId, children }) {
  const { openId, toggleItem } = useContext(AccordionContext);
  const isOpen = openId === itemId;

  return (
    <button
      type="button"
      onClick={() => toggleItem(itemId)}
      aria-expanded={isOpen}
      style={{
        width: '100%',
        padding: '12px',
        textAlign: 'left',
        background: isOpen ? '#f0f0f0' : '#fff',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {children}
      <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
    </button>
  );
}

// Content : il n'est rendu que lorsque l'identifiant correspond à l'item ouvert.
function AccordionContent({ itemId, children }) {
  const { openId } = useContext(AccordionContext);

  if (openId !== itemId) return null;

  return <div style={{ padding: '12px' }}>{children}</div>;
}

// API déclarative : les sous-composants sont accessibles via Accordion.Item, etc.
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
