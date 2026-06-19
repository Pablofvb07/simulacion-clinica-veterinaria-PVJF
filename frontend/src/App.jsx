// src/App.jsx
import React, { useState, useEffect } from 'react';
import { UI_STYLES } from './styles';
import { API_BASE_URL, CASOS_DISPONIBLES, NIVELES_DIFICULTAD, MIN_PREGUNTAS_ANAMNESIS } from './constantes';
import DatosPaciente from './components/DatosPaciente';
import AnamnesisChat from './components/AnamnesisChat';
import ExamenFisico from './components/ExamenFisico';
import ExamenesComplementarios from './components/ExamenesComplementarios';
import PlanTratamiento from './components/PlanTratamiento';
import ReporteCalificacion from './components/ReporteCalificacion';

// ── Constantes locales ────────────────────────────────────────────────────────
const MODO_LABEL = { '1': 'ASISTIDO', '2': 'ESTÁNDAR', '3': 'CRÍTICO' };

const PESTANAS = [
  { id: 'presentacion',    label: '📋 Presentación' },
  { id: 'anamnesis',       label: '🗣️ Anamnesis' },
  { id: 'examen',          label: '🩺 Examen Físico' },
  { id: 'complementarios', label: '🔬 Complementarios' },
  { id: 'diagnostico',     label: '📝 Diagnóstico' },
];

// ── Subcomponentes internos ───────────────────────────────────────────────────
function PantallaConfiguracion({ casoSeleccionado, setCasoSeleccionado, dificultad, setDificultad, infoCaso, onIniciar }) {
  return (
    <div style={{ ...UI_STYLES.container, maxWidth: '650px', paddingTop: '60px' }}>
      <header style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ color: '#00bfa5', margin: '0 0 6px 0', fontSize: '26px' }}>
          Simulador Clínico Veterinario
        </h1>
        <span style={{ color: '#667085', fontSize: '11px', letterSpacing: '0.5px' }}>
          CONFIGURACIÓN ACADÉMICA PREVIA
        </span>
      </header>

      <div style={{ backgroundColor: '#161b26', padding: '24px', borderRadius: '16px', border: '1px solid #262c3a' }}>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="select-caso"
            style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#667085', fontWeight: '500' }}
          >
            1. Seleccione el Paciente Asignado:
          </label>
          <select
            id="select-caso"
            value={casoSeleccionado}
            onChange={(e) => setCasoSeleccionado(e.target.value)}
            style={UI_STYLES.selectInput}
          >
            {CASOS_DISPONIBLES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {infoCaso && (
          <p style={{ backgroundColor: '#1f242f', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px', borderLeft: '3px solid #00bfa5', color: '#cbd5e1' }}>
            <strong>Motivo preliminar:</strong> "{infoCaso.motivo_consulta}"
          </p>
        )}

        <fieldset style={{ border: 'none', padding: 0, marginBottom: '24px' }}>
          <legend style={{ display: 'block', marginBottom: '12px', fontSize: '14px', color: '#667085', fontWeight: '500' }}>
            2. Seleccione el Nivel de Dificultad:
          </legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {NIVELES_DIFICULTAD.map(({ id, titulo, descripcion }) => (
              <label
                key={id}
                style={{
                  display: 'block', padding: '14px', borderRadius: '8px',
                  backgroundColor: '#1f242f', cursor: 'pointer',
                  border: dificultad === id ? '2px solid #00bfa5' : '1px solid #262c3a',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={id}
                    checked={dificultad === id}
                    onChange={(e) => setDificultad(e.target.value)}
                    style={{ accentColor: '#00bfa5' }}
                  />
                  <strong style={{ color: dificultad === id ? '#00bfa5' : '#fff', fontSize: '14.5px' }}>
                    {titulo}
                  </strong>
                </div>
                <p style={{ margin: '6px 0 0 24px', fontSize: '12px', color: '#667085', lineHeight: '1.4' }}>
                  {descripcion}
                </p>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          onClick={onIniciar}
          style={{ width: '100%', backgroundColor: '#00bfa5', color: '#0c111d', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
        >
          Iniciar Simulación Activa
        </button>
      </div>
    </div>
  );
}

function HeaderSimulador({ infoCaso, dificultad }) {
  return (
    <header style={UI_STYLES.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ backgroundColor: '#00bfa5', padding: '8px 12px', borderRadius: '8px', color: '#0c111d', fontWeight: 'bold' }}>
          🐾
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px' }}>Simulador UDLA</h1>
          <span style={{ fontSize: '11px', color: '#667085' }}>MODO: {MODO_LABEL[dificultad]}</span>
        </div>
      </div>
      <span style={{ backgroundColor: '#1f242f', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid #262c3a' }}>
        Paciente: <strong>{infoCaso?.nombre ?? '...'}</strong>
      </span>
    </header>
  );
}

function NavPestanas({ pestanaActiva, onCambiar, pestanasHabilitadas }) {
  return (
    <nav aria-label="Fases clínicas" style={UI_STYLES.tabBar}>
      {PESTANAS.map(({ id, label }) => {
        const habilitada = pestanasHabilitadas.includes(id);
        return (
          <button
            key={id}
            onClick={() => habilitada && onCambiar(id)}
            aria-current={pestanaActiva === id ? 'page' : undefined}
            aria-disabled={!habilitada}
            title={!habilitada ? 'Completa la fase anterior para desbloquear' : undefined}
            style={{
              ...UI_STYLES.tabButton(pestanaActiva === id),
              opacity: habilitada ? 1 : 0.35,
              cursor: habilitada ? 'pointer' : 'not-allowed',
            }}
          >
            {label} {!habilitada && '🔒'}
          </button>
        );
      })}
    </nav>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [iniciado, setIniciado]                   = useState(false);
  const [casoSeleccionado, setCasoSeleccionado]   = useState('bruno-traqueo');
  const [dificultad, setDificultad]               = useState('1');
  const [infoCaso, setInfoCaso]                   = useState(null);
  const [pestana, setPestana]                     = useState('presentacion');
  const [reporteEvaluacion, setReporteEvaluacion] = useState(null);
  const [mensajesAnamnesis, setMensajesAnamnesis] = useState([]);
  const [examenCompletado, setExamenCompletado]   = useState(false);

  const preguntasHechas     = mensajesAnamnesis.filter((m) => m.rol === 'estudiante').length;
  const anamnesisCompletada = preguntasHechas >= MIN_PREGUNTAS_ANAMNESIS;

  const pestanasHabilitadas = [
    'presentacion',
    'anamnesis',
    ...(anamnesisCompletada ? ['examen']                           : []),
    ...(examenCompletado    ? ['complementarios', 'diagnostico']   : []),
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/caso/${casoSeleccionado}`)
      .then((res) => res.json())
      .then((data) => setInfoCaso(data))
      .catch((err) => console.error('Error al cargar el caso:', err));
  }, [casoSeleccionado]);

  const handleReiniciar = () => {
    setReporteEvaluacion(null);
    setMensajesAnamnesis([]);
    setExamenCompletado(false);
    setIniciado(false);
    setPestana('presentacion');
  };

  if (!iniciado) {
    return (
      <PantallaConfiguracion
        casoSeleccionado={casoSeleccionado}
        setCasoSeleccionado={setCasoSeleccionado}
        dificultad={dificultad}
        setDificultad={setDificultad}
        infoCaso={infoCaso}
        onIniciar={() => setIniciado(true)}
      />
    );
  }

  return (
    <div style={UI_STYLES.container}>
      <HeaderSimulador infoCaso={infoCaso} dificultad={dificultad} />

      {reporteEvaluacion ? (
        <ReporteCalificacion reporte={reporteEvaluacion} alReiniciar={handleReiniciar} />
      ) : (
        <main>
          <NavPestanas
            pestanaActiva={pestana}
            onCambiar={setPestana}
            pestanasHabilitadas={pestanasHabilitadas}
          />

          {!anamnesisCompletada && (
            <p style={{ fontSize: '12px', color: '#667085', margin: '0 0 16px 0' }}>
              🗣️ Realiza al menos {MIN_PREGUNTAS_ANAMNESIS} preguntas en la anamnesis para continuar
              ({preguntasHechas}/{MIN_PREGUNTAS_ANAMNESIS})
            </p>
          )}
          {anamnesisCompletada && !examenCompletado && (
            <p style={{ fontSize: '12px', color: '#667085', margin: '0 0 16px 0' }}>
              🩺 Completa el Examen Físico para desbloquear Complementarios y Diagnóstico
            </p>
          )}

          <div style={UI_STYLES.cardContainer}>
            {pestana === 'presentacion'    && <DatosPaciente info={infoCaso} />}
            {pestana === 'anamnesis'       && (
              <AnamnesisChat
                idCaso={casoSeleccionado}
                mensajes={mensajesAnamnesis}
                onNuevoMensaje={setMensajesAnamnesis}
              />
            )}
            {pestana === 'examen'          && (
              <ExamenFisico
                info={infoCaso}
                dificultad={dificultad}
                onCompletar={() => setExamenCompletado(true)}
              />
            )}
            {pestana === 'complementarios' && <ExamenesComplementarios info={infoCaso} />}
            {pestana === 'diagnostico'     && (
              <PlanTratamiento
                idCaso={casoSeleccionado}
                alCalificar={setReporteEvaluacion}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
}