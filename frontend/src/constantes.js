// src/constantes.js

// ── URL base del backend ──────────────────────────────────────────────────────
export const API_BASE_URL = 'http://127.0.0.1:8000';

// ── Casos disponibles ─────────────────────────────────────────────────────────
export const CASOS_DISPONIBLES = [
  { value: 'bruno-traqueo',  label: 'Caso: Bruno (Canino - Arcadas/Tos)' },
  { value: 'luna-sarna',     label: 'Caso: Luna (Felino - Dermatológico)' },
  { value: 'milo-enteritis', label: 'Caso: Milo (Felino - Gastrointestinal)' },
];

// ── Niveles de dificultad ─────────────────────────────────────────────────────
export const NIVELES_DIFICULTAD = [
  {
    id: '1',
    titulo: 'Baja (Modo Asistido)',
    descripcion: '✅ Constantes completas. ✅ Hallazgos del Examen Físico se muestran automáticamente.',
  },
  {
    id: '2',
    titulo: 'Media (Manejo Estándar)',
    descripcion: '✅ Constantes visibles. ❌ Debes tipear la maniobra semiológica para revelar el hallazgo.',
  },
  {
    id: '3',
    titulo: 'Alta (Examen Crítico)',
    descripcion: '❌ Sin asistencia. Debes redactar tu reporte semiológico formal completo sin pistas.',
  },
];

// ── Configuración general ─────────────────────────────────────────────────────
export const MIN_PREGUNTAS_ANAMNESIS = 3;