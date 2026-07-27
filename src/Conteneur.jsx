import React from 'react';

// On récupère "children" dans les props
function Conteneur({ children }) {
  return (
    <div style={{ border: '2px solid #4A90E2', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
      {children}
    </div>
  );
}

export default Conteneur;