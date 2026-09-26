/* Responsabilité : orchestrer le formulaire utilisateur et sa modal composée. */
import React, { useState } from 'react';
import { FormModal } from './FormModal';

export default function ProjetIntegrateurS6() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nom: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
    setIsOpen(false);
    setFormData({ nom: '', email: '' });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'center' }}>
      <h4>🚀 Projet Intégrateur S6 — Modal Compound Component</h4>
      
      <button 
        onClick={() => setIsOpen(true)}
        style={{ padding: '10px 16px', backgroundColor: '#3182ce', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Ouvrir la Modale
      </button>

      <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormModal.Header>Ajouter un Utilisateur</FormModal.Header>
        
        <FormModal.Body>
          <form id="modal-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85em', mb: '4px' }}>Nom :</label>
              <input 
                type="text" 
                required 
                value={formData.nom} 
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85em', mb: '4px' }}>Email :</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
          </form>
        </FormModal.Body>

        <FormModal.Footer>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            style={{ padding: '8px 12px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            form="modal-form"
            style={{ padding: '8px 12px', background: '#38a169', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Valider
          </button>
        </FormModal.Footer>
      </FormModal>
    </div>
  );
}