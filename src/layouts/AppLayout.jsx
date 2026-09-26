import React, { Profiler } from 'react';
import { NavLink, Outlet, useNavigation } from 'react-router-dom';

function onRenderCallback(id, phase, actualDuration) {
  console.log(
    `[Profiler - ${id}] Phase: ${phase} | Durée: ${actualDuration.toFixed(2)}ms`
  );
}

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#007bff' : '#333',
    marginRight: '16px'
  });

  return (
    <Profiler id="PerfApp" onRender={onRenderCallback}>
      <div>
        <header>
          <h1>⚡ E-Commerce PerfApp (S8)</h1>
          <nav aria-label="Navigation PerfApp">
            <NavLink to="/perf-shop" end style={linkStyle}>Accueil</NavLink>
            <NavLink to="/perf-shop/products" style={linkStyle}>Boutique</NavLink>
          </nav>
          {isLoading && <p role="status">⌛ Chargement de la page et des données...</p>}
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Profiler>
  );
}