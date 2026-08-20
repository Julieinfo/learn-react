import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Conteneur({ children, titre }) {
  const { theme } = useTheme(); // 🟢 Consommation directe du contexte

  const styleConteneur = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d',
    color: theme === 'light' ? '#333333' : '#f1f1f1',
    border: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #444444',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: theme === 'light' 
      ? '0 4px 6px rgba(0,0,0,0.05)' 
      : '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={styleConteneur}>
      {titre && <h2 style={{ marginTop: 0 }}>{titre}</h2>}
      {children}
    </div>
  );
}

export default Conteneur;