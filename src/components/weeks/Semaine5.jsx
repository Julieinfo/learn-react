import React from 'react';
import CompteurProfiler from '../CompteurProfiler';
import DashboardS5 from '../ProjetIntegrateurS5';

export default function Semaine5() {
  return (
    <div className="week-grid">
      <section className="week-card">
        <h2>📊 Profiling React</h2>
        <CompteurProfiler />
      </section>
      <section className="week-card">
        <h2>⚡ Optimisation et mémoïsation</h2>
        <DashboardS5 />
      </section>
    </div>
  );
}
