# 🐾 Simulador Clínico Veterinario — UDLA

Aplicación web local para la Facultad de Medicina Veterinaria de la UDLA. Permite a los estudiantes practicar y ser evaluados con casos clínicos reales, guiados por una IA local (Ollama) que simula al tutor del paciente.

---

## ⚙️ Requisitos previos

Antes de correr el proyecto, asegúrate de tener instalado lo siguiente en tu computadora:

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| Python | 3.10 o superior | https://www.python.org/downloads/ |
| Node.js | 18 o superior | https://nodejs.org/ |
| Ollama | Última versión | https://ollama.com/download |

> 💡 Para verificar que los tienes instalados, abre una terminal y ejecuta:
> ```bash
> python --version
> node --version
> ollama --version
> ```

---

## 🚀 Instalación paso a paso

### 1. Clona o descarga el proyecto

```bash
git clone <url-del-repositorio>
cd Simulador-clinico-vet-udla
```

O si te pasaron la carpeta directamente, ábrela en tu terminal.

---

### 2. Descarga el modelo de IA con Ollama

Ollama necesita descargar el modelo de lenguaje la primera vez. Ejecuta:

```bash
ollama pull llama3
```

> ⚠️ Esto puede tardar varios minutos dependiendo de tu internet. El modelo pesa aproximadamente 4.7 GB.

Una vez descargado, inicia Ollama en una terminal aparte y déjala abierta:

```bash
ollama serve
```

> En Windows y Mac, Ollama puede iniciarse automáticamente al abrir la aplicación. Si ya está corriendo, puedes omitir este paso.

---

### 3. Configura y corre el backend (Python + FastAPI)

Abre una **nueva terminal** y ve a la carpeta del backend:

```bash
cd backend
```

Crea un entorno virtual para no instalar nada de forma global:

```bash
# Mac / Linux
python -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

Instala las dependencias:

```bash
pip install fastapi uvicorn ollama pydantic
```

Inicia el servidor:

```bash
uvicorn main:app --reload
```

Si todo salió bien, verás algo así en la terminal:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

> ✅ El backend está listo. **No cierres esta terminal.**

---

### 4. Configura y corre el frontend (React + Vite)

Abre **otra terminal nueva** y ve a la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias de Node:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Verás algo así:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

> ✅ El frontend está listo. **No cierres esta terminal.**

---

## 🌐 Abrir la aplicación

Con los tres servicios corriendo (Ollama + backend + frontend), abre tu navegador y ve a:

```
http://localhost:5173
```

---

## 🗂️ Estructura del proyecto

```
Simulador-clinico-vet-udla/
├── backend/
│   ├── main.py          # API con FastAPI — endpoints del chatbot y casos
│   └── casos.py         # Base de datos de casos clínicos
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Componente principal y flujo de pestañas
│   │   ├── constantes.js        # Configuración global (URL, casos, dificultad)
│   │   ├── styles.js            # Paleta de colores y estilos reutilizables
│   │   └── components/
│   │       ├── DatosPaciente.jsx          # Pestaña 1 — Presentación del caso
│   │       ├── AnamnesisChat.jsx          # Pestaña 2 — Chat con el tutor
│   │       ├── ExamenFisico.jsx           # Pestaña 3 — Examen físico
│   │       ├── ExamenesComplementarios.jsx # Pestaña 4 — Lab y radiografías
│   │       ├── PlanTratamiento.jsx        # Pestaña 5 — Diagnóstico y terapia
│   │       ├── ReporteCalificacion.jsx    # Reporte final con rúbrica
│   │       └── SelectorCaso.jsx          # Selector de caso (reutilizable)
└── Casos/
    ├── CASO CLÍNICO 2.docx   # Bruno — Traqueobronquitis
    ├── CASO CLÍNICO 3.docx   # Luna — Sarna notoédrica
    └── CASO CLÍNICO 4.docx   # Milo — Enteritis parasitaria
```

---

## 🐶 Casos clínicos disponibles

| ID | Paciente | Especie | Patología |
|---|---|---|---|
| `bruno-traqueo` | Bruno | Canino | Traqueobronquitis infecciosa (Bordetella) |
| `luna-sarna` | Luna | Felino | Sarna notoédrica (Notoedres cati) |
| `milo-enteritis` | Milo | Felino | Enteritis parasitaria (Toxocara cati) |

---

## 🎓 Niveles de dificultad

| Nivel | Nombre | Descripción |
|---|---|---|
| 1 | Asistido | Hallazgos del examen físico automáticos |
| 2 | Estándar | El estudiante escribe la maniobra para revelar el hallazgo |
| 3 | Crítico | Reporte semiológico libre sin asistencia |

---

## 🔧 Solución de problemas comunes

**El chat no responde / error de conexión**
- Verifica que Ollama esté corriendo (`ollama serve`)
- Verifica que el backend esté activo en `http://127.0.0.1:8000`
- Abre `http://127.0.0.1:8000/docs` en el navegador — si carga, el backend está bien

**El frontend no carga**
- Asegúrate de haber ejecutado `npm install` antes de `npm run dev`
- Verifica que estés en la carpeta `frontend/` cuando ejecutas los comandos

**Ollama tarda mucho en responder**
- Es normal la primera vez que se genera una respuesta, el modelo se carga en memoria
- Las respuestas siguientes serán más rápidas

**Error `ModuleNotFoundError` en el backend**
- Asegúrate de haber activado el entorno virtual antes de instalar las dependencias
- Vuelve a ejecutar `pip install fastapi uvicorn ollama pydantic` con el venv activo

---

## 📋 Resumen rápido (todo en orden)

```bash
# Terminal 1 — Ollama
ollama serve

# Terminal 2 — Backend
cd backend
source .venv/bin/activate   # o .venv\Scripts\activate en Windows
uvicorn main:app --reload

# Terminal 3 — Frontend
cd frontend
npm run dev
```

Luego abre `http://localhost:5173` en el navegador. 🎉
