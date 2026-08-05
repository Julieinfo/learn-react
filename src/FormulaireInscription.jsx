import React, { useState, useEffect } from 'react';

function FormulaireInscription() {
  const [motDePasse, setMotDePasse] = useState('');
  const [messageSecurite, setMessageSecurite] = useState('');

  useEffect(() => {
    // 1. Si le champ est vide, réinitialisation directe
    if (!motDePasse) {
      setMessageSecurite('');
      return;
    }

    // 2. Debounce : on attend 300ms avant d'évaluer la sécurité
    const timer = setTimeout(() => {
      if (motDePasse.length < 6) {
        setMessageSecurite('Trop court ❌');
      } else if (motDePasse.length <= 10) {
        setMessageSecurite('Moyen ⚠️');
      } else {
        setMessageSecurite('Fort ✅');
      }
    }, 300);

    // 3. Cleanup : annule le timer si la saisie continue
    return () => clearTimeout(timer);
  }, [motDePasse]);

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ padding: '20px', maxWidth: '300px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>Mot de passe :</label>
      <input 
        type="password" 
        value={motDePasse} 
        onChange={(e) => setMotDePasse(e.target.value)} 
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {messageSecurite && (
        <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
          Sécurité : {messageSecurite}
        </p>
      )}
    </form>
  );
}

export default FormulaireInscription;