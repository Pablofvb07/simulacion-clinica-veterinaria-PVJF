// src/components/ReporteCalificacion.jsx
import React from 'react';
import { UI_STYLES, PALETTE } from '../styles';

export default function ReporteCalificacion({ reporte, alReiniciar }) {
  const score = reporte.criterios.reduce((acc, c) => acc + c.nota, 0);

  return (
    <section style={{ backgroundColor: '#161b26', padding: '24px', borderRadius: '12px', border: '1px solid #262c3a' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ ...UI_STYLES.scoreCircle, backgroundColor: score >= 50 ? PALETTE.success : PALETTE.danger, color: '#0c111d', fontWeight: 'bold', fontSize: '24px' }}>
          {score}
        </div>
        <div style={{ marginLeft: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>{score >= 50 ? "Evaluación Aprobada 🎉" : "Revisar Criterios Médicos 🩺"}</h2>
          <p style={{ margin: '4px 0 0 0', color: '#667085', fontSize: '14px' }}>Esperado: {reporte.diagnosticoCorrecto}</p>
        </div>
      </div>
      <div>
        {reporte.criterios.map((c, i) => (
          <div key={i} style={UI_STYLES.progressRow}>
            <span style={{ fontSize: '14px' }}>{c.nombre} ({c.peso})</span>
            <span style={{ fontWeight: 'bold', color: c.nota > 0 ? PALETTE.success : PALETTE.danger }}>{c.nota} pts</span>
          </div>
        ))}
      </div>
      <button onClick={alReiniciar} style={{ marginTop: '20px', width: '100%', backgroundColor: '#00bfa5', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cargar Nuevo Caso / Cambiar Dificultad</button>
    </section>
  );
}