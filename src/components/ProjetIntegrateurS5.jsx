import React, { useState, useMemo, useCallback, Profiler } from 'react';

// Item de données optimisé avec React.memo
const DataRow = React.memo(({ item, onSelect }) => {
  console.log(`[Rendu Row] ID: ${item.id}`);
  return (
    <div>
      <strong>{item.title}</strong>
      <span>{item.category}</span>
      <span>{item.value} €</span>
      <button onClick={() => onSelect(item.id)} style={{ padding: '4px 8px' }}>
        Détails
      </button>
    </div>
);
});

// Bouton d'action réutilisable et mémorisé
const ActionButton = React.memo(({ onClick, label }) => {
console.log(`[Rendu Button] ${label}`);
return (
  <button onClick={onClick}>{label}</button>
);
});

export default function DashboardS5() {
const [query, setQuery] = useState('');
const [category, setCategory] = useState('ALL');
const [selectedId, setSelectedId] = useState(null);
const [darkTheme, setDarkTheme] = useState(false);

// Données de démonstration
const [items] = useState([
{ id: 1, title: 'Analyse Ventes Q1', category: 'Finance', value: 1250 },
{ id: 2, title: 'Campagne Google Ads', category: 'Marketing', value: 800 },
{ id: 3, title: 'Audit Sécurité API', category: 'Tech', value: 2100 },
{ id: 4, title: 'Refonte UI Dashboard', category: 'Tech', value: 1500 },
{ id: 5, title: 'Optimisation SEO', category: 'Marketing', value: 650 }
]);

// 1. USEMEMO : Filtrage et agrégation statistiques
const metrics = useMemo(() => {
console.log('[Calcul Heavy] Filtrage & Stats Dashboard');
const filtered = items.filter((item) => {
const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
const matchCat = category === 'ALL' || item.category === category;
return matchQuery && matchCat;
});

const total = filtered.reduce((acc, item) => acc + item.value, 0);
const avg = filtered.length ? total / filtered.length : 0;

return { filtered, total, avg };
}, [items, query, category]);

// 2. USECALLBACK : Handlers stables
const handleSelect = useCallback((id) => {
setSelectedId(id);
}, []);

const handleResetFilters = useCallback(() => {
setQuery('');
setCategory('ALL');
setSelectedId(null);
}, []);

const onRenderMetrics = (id, phase, actualDuration) => {
console.log(`[Profiler - Dashboard] Phase: ${phase} | Durée: ${actualDuration.toFixed(2)}ms`);
};

const cardStyle = {
maxWidth: '450px',
margin: '20px auto',
padding: '20px',
borderRadius: '8px',
border: '1px solid #ccc',
backgroundColor: darkTheme ? '#222' : '#fff',
color: darkTheme ? '#fff' : '#000'
};

return (
  <Profiler id="Dashboard" onRender={onRenderMetrics}>
    <main style={cardStyle}>
      <h1>Dashboard</h1>
      <ActionButton onClick={() => setDarkTheme((theme) => !theme)} label="Changer de thème" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher"
      />
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="ALL">Toutes les catégories</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Tech">Tech</option>
      </select>
      <p>Total : {metrics.total} € | Moyenne : {metrics.avg.toFixed(2)} €</p>
      {metrics.filtered.map((item) => (
        <DataRow key={item.id} item={item} onSelect={handleSelect} />
      ))}
      <p>Sélection : {selectedId ?? 'Aucune'}</p>
      <ActionButton onClick={handleResetFilters} label="Réinitialiser" />
    </main>
  </Profiler>
);
}