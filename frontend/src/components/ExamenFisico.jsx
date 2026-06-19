// src/components/ExamenFisico.jsx
import React, { useState } from 'react';
import { UI_STYLES } from '../styles';

export default function ExamenFisico({ info, dificultad, onCompletar }) {
  const [maniobra, setManiobra]     = useState('');
  const [revelado, setRevelado]     = useState(false);
  const [libreDesc, setLibreDesc]   = useState('');
  const [completado, setCompletado] = useState(false);

  if (!info?.examen_fisiologico) {
    return <p style={{ color: '#667085' }}>Cargando constantes fisiológicas del backend...</p>;
  }

  const datosFisicos = info.examen_fisiologico;

  // Notifica al padre y marca localmente como completado
  const handleCompletar = () => {
    setCompletado(true);
    onCompletar();
  };

  return (
    <section aria-labelledby="titulo-examen">
      <h3
        id="titulo-examen"
        style={{ color: '#00bfa5', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}
      >
        🩺 Constantes Fisiológicas Obtenidas
      </h3>

      {/* Constantes — siempre visibles en todos los niveles */}
      <dl style={UI_STYLES.gridConstantes}>
        {Object.entries(datosFisicos.constantes).map(([param, val]) => (
          <div key={param} style={UI_STYLES.boxConstante}>
            <dt style={{ fontSize: '12px', color: '#667085', fontWeight: '600' }}>{param}</dt>
            <dd style={{ fontSize: '14.5px', fontWeight: 'bold', color: '#fff', margin: '4px 0 0 0' }}>{val}</dd>
          </div>
        ))}
      </dl>

      {/* Nivel 1 — hallazgos automáticos */}
      {dificultad === '1' && (
        <div style={{ padding: '16px', backgroundColor: '#1f242f', borderLeft: '4px solid #00bfa5', borderRadius: '6px', marginBottom: '16px' }}>
          <strong>Hallazgos Clínicos (Modo Asistido):</strong>
          <p style={{ margin: '6px 0 0 0', color: '#e4e7ec' }}>{datosFisicos.hallazgos}</p>
        </div>
      )}

      {/* Nivel 2 — el estudiante escribe la maniobra y revela el hallazgo */}
      {dificultad === '2' && (
        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="input-maniobra"
            style={{ fontWeight: '500', display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085' }}
          >
            Indique la maniobra semiológica a ejecutar:
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              id="input-maniobra"
              type="text"
              value={maniobra}
              onChange={(e) => setManiobra(e.target.value)}
              placeholder="Ej: Palpación abdominal, Reflejo tusígeno..."
              disabled={revelado}
              style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#1f242f', color: '#fff', border: '1px solid #262c3a', outline: 'none' }}
            />
            {!revelado && (
              <button
                onClick={() => setRevelado(true)}
                disabled={!maniobra.trim()}
                style={{ backgroundColor: maniobra.trim() ? '#00bfa5' : '#1f242f', color: maniobra.trim() ? '#0c111d' : '#667085', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: maniobra.trim() ? 'pointer' : 'not-allowed', fontWeight: '600' }}
              >
                Ejecutar
              </button>
            )}
          </div>
          {revelado && (
            <div style={{ padding: '16px', backgroundColor: '#1f242f', borderLeft: '4px solid #00bfa5', borderRadius: '6px', marginTop: '16px' }}>
              <strong>Resultado:</strong>
              <p style={{ margin: '6px 0 0 0', color: '#e4e7ec' }}>{datosFisicos.hallazgos}</p>
            </div>
          )}
        </div>
      )}

      {/* Nivel 3 — reporte libre del estudiante */}
      {dificultad === '3' && (
        <div style={{ marginBottom: '16px' }}>
          <label
            htmlFor="textarea-reporte"
            style={{ fontWeight: '500', display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085' }}
          >
            Ingrese su reporte semiológico formal:
          </label>
          <textarea
            id="textarea-reporte"
            value={libreDesc}
            onChange={(e) => setLibreDesc(e.target.value)}
            placeholder="Describa los hallazgos patológicos esperados para este paciente..."
            style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '8px', backgroundColor: '#1f242f', color: '#fff', border: '1px solid #262c3a', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
          />
        </div>
      )}

      {/* Botón para marcar el examen como completado — visible en todos los niveles */}
      {!completado ? (
        <button
          onClick={handleCompletar}
          disabled={
            (dificultad === '2' && !revelado) ||
            (dificultad === '3' && !libreDesc.trim())
          }
          style={{
            marginTop: '8px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ✅ Marcar Examen Físico como Completado
        </button>
      ) : (
        <p style={{ color: '#10b981', fontWeight: '600', marginTop: '8px' }}>
          ✅ Examen físico registrado — Complementarios y Diagnóstico desbloqueados
        </p>
      )}
    </section>
  );
}