import os
import json
import vertexai
from pydantic import BaseModel
from dotenv import load_dotenv
from functools import lru_cache
from google.oauth2 import service_account
from fastapi import FastAPI, HTTPException, Header
from vertexai.generative_models import GenerativeModel, SafetySetting

load_dotenv()

app = FastAPI()

ID_PROJETO = os.getenv("ID_PROJETO")
LOCATION = "us-central1"
NOME_ARQUIVO_CHAVE = "google_credentials.json"

model = None

class TopicRequest(BaseModel):
    topic: str


@lru_cache()
def get_gcp_credentials():
    """
    Carrega as credenciais do Google Cloud a partir do arquivo de chave de serviço.
    Usa @lru_cache para garantir que o arquivo seja lido do disco apenas uma vez.
    """
    try:
        credentials = service_account.Credentials.from_service_account_file(NOME_ARQUIVO_CHAVE)
        print("Credenciais do Google Cloud carregadas com sucesso.")
        return credentials
    except FileNotFoundError:
        print(f"Arquivo de credenciais '{NOME_ARQUIVO_CHAVE}' não encontrado.")
        return None
    except Exception as e:
        print("Erro ao carregar as credenciais do Google Cloud", extra={"error": str(e)})
        return None
    
    
def initialize_vertexai():
    """
    Inicializa o SDK do Vertex AI com as credenciais e projeto corretos.
    Deve ser chamada uma vez durante o startup da aplicação.
    """
    global model
    credentials = get_gcp_credentials()
    if not credentials or not ID_PROJETO:
        print("Não foi possível inicializar o Vertex AI. Credenciais ou ID do projeto ausentes.")
        return False
    
    try:
        vertexai.init(project=ID_PROJETO, credentials=credentials, location=LOCATION)
        model = GenerativeModel("gemini-2.5-flash-lite")
        print("Vertex AI SDK inicializado com sucesso.")
        return True
    except Exception as e:
        print(f"Falha ao inicializar o Vertex AI SDK: {e}")
        return False


@app.on_event("startup")
async def startup_event():
    """Inicializa o Vertex AI quando a aplicação inicia."""
    if not initialize_vertexai():
        print("AVISO: Aplicação iniciada sem Vertex AI configurado!")


@app.post("/generate")
async def generate_content(request: TopicRequest, x_api_key: str = Header(None)):
    if x_api_key != os.getenv("INTERNAL_API_KEY"):
        raise HTTPException(status_code=403, detail="Acesso negado")
    
    if model is None:
        raise HTTPException(status_code=503, detail="Serviço de IA não inicializado")

    prompt = f"""
    Atue como um especialista pedagógico.
    Crie um post de blog educacional sobre: "{request.topic}".
    
    Retorne APENAS um JSON válido com este formato:
    {{
        "title": "Título Criativo",
        "content": "Conteúdo didático em HTML básico (pode usar <p>, <b>, <ul>)",
        "tags": ["tag1", "tag2"]
    }}
    """

    try:
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Erro Vertex AI: {e}")
        raise HTTPException(status_code=500, detail="Erro na geração")
