import React, { useState, createContext, useContext } from 'react';

// Context interne au composant composé FormModal
const ModalContext = createContext();

// 1. Composant Racine
export function FormModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '450px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// 2. Sous-composant Header
function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', pb: '10px', mb: '15px' }}>
      <h3 style={{ margin: 0 }}>{children}</h3>
      <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
        ✕
      </button>
    </div>
  );
}

// 3. Sous-composant Body
function ModalBody({ children }) {
  return <div style={{ marginBottom: '20px' }}>{children}</div>;
}

// 4. Sous-composant Footer
function ModalFooter({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', pt: '10px' }}>
      {children}
    </div>
  );
}

// Attachement des sous-composants
FormModal.Header = ModalHeader;
FormModal.Body = ModalBody;
FormModal.Footer = ModalFooter;