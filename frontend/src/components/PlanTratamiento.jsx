// src/components/PlanTratamiento.jsx
import React, { useState } from 'react';
import { UI_STYLES } from '../styles';

// ── Constantes ────────────────────────────────────────────────────────────────
const DIAGNOSTICOS_ESPERADOS = {
  'bruno-traqueo': {
    texto: 'Traqueobronquitis Infecciosa Canina (Bordetella)',
    palabrasClave: ['traqueo', 'perrera', 'bordetella'],
  },
  'luna-sarna': {
    texto: 'Sarna Notoédrica Felina',
    palabrasClave: ['sarna', 'notoedres'],
  },
  'milo-enteritis': {
    texto: 'Enteritis Infecciosa / Parasitosis (Coccidias/Giardia)',
    palabrasClave: ['enteritis', 'diarrea', 'coccid'],
  },
};

// ── Helper ────────────────────────────────────────────────────────────────────

// Revisa si el diagnóstico del estudiante contiene alguna palabra clave del caso
function evaluarDiagnostico(idCaso, diagnosticoEstudiante) {
  const casoEsperado = DIAGNOSTICOS_ESPERADOS[idCaso];
  if (!casoEsperado) return 0;

  const textoNormalizado = diagnosticoEstudiante.toLowerCase().trim();
  const acerto = casoEsperado.palabrasClave.some((palabra) =>
    textoNormalizado.includes(palabra)
  );

  return acerto ? 30 : 0;
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function PlanTratamiento({ idCaso, alCalificar }) {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const puntajeDiagnostico = evaluarDiagnostico(idCaso, diagnostico);
    const aprobo = puntajeDiagnostico > 0;

    alCalificar({
      diagnosticoCorrecto: DIAGNOSTICOS_ESPERADOS[idCaso]?.texto ?? 'Desconocido',
      criterios: [
        { nombre: 'Identificó signos clínicos',        peso: '25%', nota: aprobo ? 25 : 0 },
        { nombre: 'Anamnesis e Interrogatorio Dirigido',peso: '25%', nota: aprobo ? 20 : 0 },
        { nombre: 'Diagnóstico Nosológico Exacto',      peso: '30%', nota: puntajeDiagnostico },
        { nombre: 'Plan de Manejo Farmacológico',       peso: '20%', nota: aprobo ? 15 : 0 },
      ],
    });
  };

  return (
    <section aria-labelledby="titulo-diagnostico">
      <h3
        id="titulo-diagnostico"
        style={{ color: '#00bfa5', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}
      >
        📝 Conclusión del Caso y Diagnóstico
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div>
          <label
            htmlFor="input-diagnostico"
            style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085' }}
          >
            Diagnóstico Definitivo:
          </label>
          <input
            id="input-diagnostico"
            type="text"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            placeholder="Escribe tu sospecha diagnóstica..."
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1f242f', color: '#fff', border: '1px solid #262c3a', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <div>
          <label
            htmlFor="textarea-tratamiento"
            style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085' }}
          >
            Terapéutica y Dosificación:
          </label>
          <textarea
            id="textarea-tratamiento"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
            placeholder="Describe el plan de manejo farmacológico y las dosis..."
            required
            style={{ width: '100%', height: '120px', padding: '12px', borderRadius: '8px', backgroundColor: '#1f242f', color: '#fff', border: '1px solid #262c3a', boxSizing: 'border-box', outline: 'none', resize: 'none' }}
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#f43f5e', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
        >
          Emitir Rúbrica de Evaluación
        </button>

      </form>
    </section>
  );
}