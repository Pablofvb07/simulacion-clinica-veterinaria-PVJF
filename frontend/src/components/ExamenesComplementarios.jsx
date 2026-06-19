// src/components/ExamenesComplementarios.jsx
import React, { useState } from 'react';
import { UI_STYLES } from '../styles';

export default function ExamenesComplementarios({ info }) {
  const [seleccionado, setSeleccionado] = useState('');
  const [historial, setHistorial] = useState([]);

  // Consumimos el diccionario del caso actual provisto por el backend
  const examenesDisponibles = info?.examenes_complementarios || {};

  const handleSolicitud = (e) => {
    e.preventDefault();
    if (!seleccionado || historial.some(item => item.nombre === seleccionado)) return;
    
    // Agregamos al historial la prueba con su respectivo resultado del backend
    setHistorial([...historial, { nombre: seleccionado, info: examenesDisponibles[seleccionado] }]);
    setSeleccionado('');
  };

  return (
    <section aria-labelledby="titulo-laboratorio">
      <h3 id="titulo-laboratorio" style={{ color: '#00bfa5', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        IV. Pruebas Diagnósticas de Laboratorio y Gabinete (UDLA)
      </h3>

      <form onSubmit={handleSolicitud} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <label htmlFor="select-examen" style={{ display: 'none' }}>Seleccionar examen de laboratorio</label>
        <select 
          id="select-examen"
          value={seleccionado} 
          onChange={(e) => setSeleccionado(e.target.value)}
          style={{ 
            flexGrow: 1, 
            padding: '12px 16px', 
            borderRadius: '8px', 
            backgroundColor: '#1f242f', 
            color: '#fff', 
            border: '1px solid #262c3a',
            outline: 'none',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="">-- Seleccionar examen clínico complementario --</option>
          {Object.keys(examenesDisponibles).map(key => (
            <option 
              key={key} 
              value={key} 
              disabled={historial.some(h => h.nombre === key)}
              style={{ backgroundColor: '#161b26', color: '#fff' }}
            >
              {key} {historial.some(h => h.nombre === key) ? '(Ya procesado)' : ''}
            </option>
          ))}
        </select>
        
        <button 
          type="submit" 
          disabled={!seleccionado}
          style={{ 
            backgroundColor: seleccionado ? '#10b981' : '#1f242f', 
            color: seleccionado ? '#fff' : '#667085', 
            border: 'none', 
            padding: '0 24px', 
            borderRadius: '8px', 
            fontWeight: '600', 
            cursor: seleccionado ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            transition: 'background-color 0.2s'
          }}
        >
          Correr Análisis 🧪
        </button>
      </form>

      <div aria-live="polite">
        <h4 style={{ fontSize: '14px', color: '#667085', fontWeight: '500', marginBottom: '12px' }}>
          Resultados del Expediente Médico:
        </h4>
        
        {historial.length === 0 ? (
          <p style={{ color: '#667085', fontStyle: 'italic', fontSize: '13.5px', textAlign: 'center', padding: '20px' }}>
            Ninguna prueba complementaria ha sido ordenada para este paciente todavía.
          </p>
        ) : (
          <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {historial.map((item, i) => (
              <li 
                key={i} 
                style={{ 
                  padding: '16px', 
                  backgroundColor: '#1f242f', 
                  borderLeft: '4px solid #10b981', 
                  borderRadius: '8px',
                  borderTop: '1px solid #262c3a',
                  borderRight: '1px solid #262c3a',
                  borderBottom: '1px solid #262c3a'
                }}
              >
                <strong style={{ color: '#10b981', fontSize: '14.5px', display: 'block', marginBottom: '6px' }}>
                  🔬 {item.nombre}
                </strong>
                <p style={{ margin: 0, color: '#e4e7ec', fontSize: '13.5px', lineHeight: '1.5' }}>
                  {item.info}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}