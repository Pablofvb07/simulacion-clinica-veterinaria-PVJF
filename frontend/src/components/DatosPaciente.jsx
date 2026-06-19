// src/components/DatosPaciente.jsx
import React from 'react';
import { UI_STYLES } from '../styles';

export default function DatosPaciente({ info }) {
  if (!info) return <p style={{ color: '#667085' }}>Cargando datos...</p>;
  
  const lineas = info.historia_clinica ? info.historia_clinica.split('\n').map(l => l.replace('-', '').trim()).filter(l => l.length > 0) : [];

  return (
    <section>
      <h3 style={{ color: '#00bfa5', margin: '0 0 16px 0' }}>📋 Expediente de Reseña y Motivo</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: '#1f242f', padding: '16px', borderRadius: '8px' }}>
          <strong>Paciente:</strong> {info.nombre} ({info.especie})<br/>
          <strong>Raza:</strong> {info.raza} | <strong>Edad:</strong> {info.edad}<br/>
          <strong>Peso:</strong> {info.peso} | <strong>Sexo:</strong> {info.sexo}
        </div>
        <div style={{ backgroundColor: '#1f242f', padding: '16px', borderRadius: '8px' }}>
          <strong>Tutor Responsable:</strong> {info.tutor}<br/>
          <strong>Motivo:</strong> "{info.motivo_consulta}"
        </div>
      </div>
      <div style={{ backgroundColor: '#1f242f', padding: '16px', borderRadius: '8px' }}>
        <strong>Historia Clínica Cronológica:</strong>
        {lineas.map((l, i) => <p key={i} style={{ margin: '6px 0', fontSize: '13.5px', color: '#e4e7ec' }}>• {l}</p>)}
      </div>
    </section>
  );
}