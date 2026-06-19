// src/components/SelectorCaso.jsx
import React from 'react';
import { UI_STYLES } from '../styles';

// ── Constantes ────────────────────────────────────────────────────────────────
const CASOS_DISPONIBLES = [
  { value: 'bruno-traqueo',  label: 'Caso: Bruno (Canino - Arcadas/Tos)' },
  { value: 'luna-sarna',     label: 'Caso: Luna (Felino - Dermatológico)' },
  { value: 'milo-enteritis', label: 'Caso: Milo (Felino - Gastrointestinal)' },
];

// ── Componente ────────────────────────────────────────────────────────────────
export default function SelectorCaso({ casoSeleccionado, onCambiar }) {
  return (
    <div>
      <label
        htmlFor="select-caso"
        style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085', fontWeight: '500' }}
      >
        Seleccione el Paciente Asignado:
      </label>
      <select
        id="select-caso"
        value={casoSeleccionado}
        onChange={(e) => onCambiar(e.target.value)}
        style={UI_STYLES.selectInput}
      >
        {CASOS_DISPONIBLES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}