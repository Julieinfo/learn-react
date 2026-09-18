import React from 'react';
import { useCompoundSelect } from '../hooks/useCompoundSelect';

export default function CompoundSelectDemo() {
  const { selectedId, select, isSelected } = useCompoundSelect('option1', true);

  const options = [
    { id: 'option1', label: 'Option 1 : React' },
    { id: 'option2', label: 'Option 2 : Custom Hooks' },
    { id: 'option3', label: 'Option 3 : Compound Components' }
  ];

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h4>🪝 Démo Custom Hook `useCompoundSelect`</h4>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Sélection courante : <strong>{selectedId || 'Aucune'}</strong>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt) => {
          const active = isSelected(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => select(opt.id)}
              style={{
                padding: '10px',
                border: active ? '2px solid #2b6cb0' : '1px solid #e2e8f0',
                backgroundColor: active ? '#ebf8ff' : '#fff',
                color: active ? '#2b6cb0' : '#2d3748',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: active ? 'bold' : 'normal'
              }}
            >
              {opt.label} {active && '✓'}
            </button>
          );
        })}
      </div>
    </div>
  );
}