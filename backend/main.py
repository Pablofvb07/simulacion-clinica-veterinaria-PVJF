# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
from casos import CASOS_VETERINARIOS

app = FastAPI()

# Configuramos CORS para que React pueda comunicarse con Python sin bloqueos
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PeticionChat(BaseModel):
    id_caso: str
    mensaje_estudiante: str

@app.get("/api/casos")
async def listar_casos():
    return {id_caso: {"nombre": datos["nombre"], "motivo": datos["motivo_consulta"]} for id_caso, datos in CASOS_VETERINARIOS.items()}

@app.get("/api/caso/{id_caso}")
async def obtener_info_caso(id_caso: str):
    if id_caso not in CASOS_VETERINARIOS:
        raise HTTPException(status_code=404, detail="Caso no encontrado")
    return CASOS_VETERINARIOS[id_caso]

@app.post("/api/anamnesis/chat")
async def chat_tutor_dinamico(datos: PeticionChat):
    if datos.id_caso not in CASOS_VETERINARIOS:
        raise HTTPException(status_code=404, detail="El caso clínico seleccionado no existe.")
        
    info_caso = CASOS_VETERINARIOS[datos.id_caso]
    
    prompt_sistema = f"""
    Eres {info_caso['tutor']}, tutor/a de la mascota llamada {info_caso['nombre']}.
    Datos de la mascota: Especie {info_caso['especie']}, raza {info_caso['raza']}, edad {info_caso['edad']}, peso {info_caso['peso']}, estado reproductivo: {info_caso['estado_reproductivo']}.
    Estás en la consulta de la Facultad de Medicina Veterinaria de la UDLA, te encuentras muy preocupado/a.
    
    Tu conocimiento se limita ESTRICTAMENTE a los siguientes hechos del caso clínico:
    - Motivo por el que vienes: {info_caso['motivo_consulta']}
    - Todo lo que sabes de la historia de la enfermedad: {info_caso['historia_clinica']}
    
    REGLAS ABSOLUTAS DE COMPORTAMIENTO:
    1. Responde con la personalidad de un dueño preocupado. Usa un lenguaje natural, sencillo y respuestas relativamente cortas.
    2. Si el estudiante te hace preguntas sobre cosas que NO están explícitamente escritas en la información de arriba (por ejemplo, si te pregunta constantes como frecuencia cardíaca, temperatura, o detalles que no se mencionan), debes responder evasivamente: "No lo sé doctor/a, no me he fijado en eso", "No lo recuerdo exactamente" o "Yo lo veo normal en ese aspecto".
    3. ¡ESTÁ COMPLETAMENTE PROHIBIDO INVENTAR DATOS MÉDICOS, SÍNTOMAS O DIAGNÓSTICOS! Si no está en tu lista, no existe para ti.
    """
    
    try:
        response = ollama.chat(
            model='llama3',
            messages=[
                {'role': 'system', 'content': prompt_sistema},
                {'role': 'user', 'content': datos.mensaje_estudiante}
            ]
        )
        return {"respuesta_tutor": response['message']['content']}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en Ollama Local: {str(e)}")