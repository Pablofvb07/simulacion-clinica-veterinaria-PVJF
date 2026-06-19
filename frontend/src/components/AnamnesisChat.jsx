// src/components/AnamnesisChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../constantes';

// ── Subcomponentes ────────────────────────────────────────────────────────────
function BurbujaMensaje({ mensaje }) {
  const esEstudiante = mensaje.rol === 'estudiante';

  const estilosBurbuja = {
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: esEstudiante ? '#00bfa5' : '#161b26',
    color: esEstudiante ? '#0c111d' : '#fff',
  };

  return (
    <div style={{ textAlign: esEstudiante ? 'right' : 'left', margin: '10px 0' }}>
      <span style={estilosBurbuja}>{mensaje.texto}</span>
    </div>
  );
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function AnamnesisChat({ idCaso, mensajes, onNuevoMensaje }) {
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  // Scroll automático al último mensaje cada vez que llega uno nuevo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const mensajeEstudiante = { rol: 'estudiante', texto: input };
    onNuevoMensaje((prev) => [...prev, mensajeEstudiante]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/anamnesis/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_caso: idCaso, mensaje_estudiante: input }),
      });

      const data = await res.json();
      const mensajeTutor = { rol: 'tutor', texto: data.respuesta_tutor };
      onNuevoMensaje((prev) => [...prev, mensajeTutor]);

    } catch {
      const mensajeError = { rol: 'sistema', texto: 'Error de conexión con el backend.' };
      onNuevoMensaje((prev) => [...prev, mensajeError]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="titulo-anamnesis">
      <h3
        id="titulo-anamnesis"
        style={{ color: '#00bfa5', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}
      >
        🗣️ Interrogatorio Dirigido (Anamnesis)
      </h3>

      {/* Historial de mensajes */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversación con el tutor"
        style={{ height: '260px', overflowY: 'auto', backgroundColor: '#1f242f', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #262c3a' }}
      >
        {mensajes.length === 0 && (
          <p style={{ color: '#667085', fontSize: '13px', fontStyle: 'italic' }}>
            Saluda al tutor e inicia el interrogatorio...
          </p>
        )}

        {mensajes.map((mensaje, i) => (
          <BurbujaMensaje key={i} mensaje={mensaje} />
        ))}

        {loading && (
          <p style={{ color: '#667085', fontSize: '12px' }}>El tutor está escribiendo...</p>
        )}

        {/* Ancla para el scroll automático */}
        <div ref={bottomRef} />
      </div>

      {/* Input de pregunta */}
      <form onSubmit={handleEnviar} style={{ display: 'flex', gap: '10px' }}>
        <label htmlFor="input-pregunta" style={{ display: 'none' }}>
          Pregunta al tutor
        </label>
        <input
          id="input-pregunta"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hazle una pregunta al dueño de la mascota..."
          disabled={loading}
          style={{ flex: 1, padding: '12px', backgroundColor: '#1f242f', color: '#fff', border: '1px solid #262c3a', borderRadius: '8px', outline: 'none' }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{ backgroundColor: loading ? '#1f242f' : '#00bfa5', color: loading ? '#667085' : '#0c111d', border: 'none', padding: '0 20px', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          Preguntar
        </button>
      </form>
    </section>
  );
}