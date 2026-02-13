# AI Service - Gerador de Conteúdo Educacional 🤖📚

> Microsserviço de Inteligência Artificial para geração automática de posts educacionais utilizando **Google Vertex AI** com modelo **Gemini 2.5 Flash Lite**.

[![Python Version](https://img.shields.io/badge/python-3.11+-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Google Cloud](https://img.shields.io/badge/Vertex%20AI-Gemini-4285F4?logo=google-cloud)](https://cloud.google.com/vertex-ai)

---

## 📋 Índice

- [🎯 Objetivo](#-objetivo)
- [🏗️ Arquitetura](#️-arquitetura)
- [🛠️ Tecnologias](#️-tecnologias)
- [📂 Estrutura](#-estrutura)
- [⚙️ Configuração](#️-configuração)
- [🚀 Execução](#-execução)
- [📡 API Endpoints](#-api-endpoints)
- [🔒 Segurança](#-segurança)
- [☁️ Deploy](#️-deploy)

---

## 🎯 Objetivo

Este microsserviço utiliza IA generativa para auxiliar professores na criação de conteúdo educacional. Com base em um tópico fornecido, o serviço gera automaticamente:

- **Título criativo** para o post
- **Conteúdo didático** formatado em HTML básico
- **Tags relevantes** para categorização

### Exemplo de Uso

**Entrada:**
```json
{
  "topic": "Fotossíntese para alunos do 6º ano"
}
```

**Saída:**
```json
{
  "title": "A Mágica das Plantas: Entendendo a Fotossíntese",
  "content": "<p>Você já se perguntou como as plantas se alimentam?...</p>",
  "tags": ["ciências", "biologia", "fotossíntese", "6º ano"]
}
```

---

## 🏗️ Arquitetura

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Backend API   │──────►  │   AI Service    │──────►  │   Vertex AI     │
│   (Node.js)     │  HTTP   │   (FastAPI)     │  gRPC   │   (Gemini)      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │   Google Cloud  │
                            │   Credentials   │
                            └─────────────────┘
```

### Fluxo de Dados

1. **Backend** envia requisição POST com o tópico desejado
2. **AI Service** valida a API Key e processa a requisição
3. **Vertex AI** gera o conteúdo usando o modelo Gemini
4. **Resposta JSON** estruturada é retornada ao Backend

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Python](https://www.python.org/) | 3.11+ | Linguagem de programação |
| [FastAPI](https://fastapi.tiangolo.com/) | 0.115.0 | Framework web assíncrono |
| [Uvicorn](https://www.uvicorn.org/) | 0.32.0 | Servidor ASGI de alta performance |
| [Pydantic](https://docs.pydantic.dev/) | 2.10.0 | Validação de dados |
| [Vertex AI](https://cloud.google.com/vertex-ai) | 1.71.0 | Plataforma de IA do Google Cloud |
| [Gemini 2.5 Flash Lite](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini) | - | Modelo de IA generativa |

---

## 📂 Estrutura

```
📁 ai-service/
├── 📄 main.py                  # Aplicação FastAPI principal
├── 📄 requirements.txt         # Dependências Python
├── 📄 render.yaml              # Configuração de deploy (Render)
├── 📄 google_credentials.json  # Credenciais GCP (não versionado)
├── 📄 .env                     # Variáveis de ambiente (não versionado)
├── 📄 .gitignore               # Arquivos ignorados pelo Git
└── 📄 README.md                # Esta documentação
```

---

## ⚙️ Configuração

### Pré-requisitos

- **Python 3.11+**
- **Conta Google Cloud** com Vertex AI habilitado
- **Service Account** com permissões para Vertex AI

### 1️⃣ Criar Service Account no Google Cloud

1. Acesse o [Console do Google Cloud](https://console.cloud.google.com/)
2. Vá em **IAM & Admin > Service Accounts**
3. Crie uma nova conta de serviço
4. Adicione a role **Vertex AI User**
5. Gere uma chave JSON e salve como `google_credentials.json`

### 2️⃣ Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do ai-service:

```bash
# ID do projeto no Google Cloud
ID_PROJETO=seu-projeto-gcp

# Chave de API para autenticação interna
INTERNAL_API_KEY=sua_chave_secreta_aqui
```

### 3️⃣ Instalar Dependências

```bash
# Criar ambiente virtual (recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou: venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt
```

---

## 🚀 Execução

### Desenvolvimento Local

```bash
# Ativar ambiente virtual
source venv/bin/activate

# Iniciar servidor de desenvolvimento
uvicorn main:app --reload --port 8000
```

O serviço estará disponível em: `http://localhost:8000`

### Documentação Interativa

FastAPI gera documentação automática:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 📡 API Endpoints

### POST `/generate`

Gera conteúdo educacional baseado em um tópico.

#### Headers

| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `X-API-KEY` | string | Sim | Chave de autenticação interna |

#### Request Body

```json
{
  "topic": "string"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `topic` | string | Sim | Tópico para geração de conteúdo |

#### Response (200 OK)

```json
{
  "title": "string",
  "content": "string",
  "tags": ["string"]
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `title` | string | Título criativo para o post |
| `content` | string | Conteúdo em HTML básico (`<p>`, `<b>`, `<ul>`) |
| `tags` | array | Lista de tags relevantes |

#### Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| `200` | Conteúdo gerado com sucesso |
| `403` | API Key inválida ou ausente |
| `500` | Erro na geração do conteúdo |
| `503` | Serviço de IA não inicializado |

#### Exemplo com cURL

```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: sua_chave_aqui" \
  -d '{"topic": "Revolução Industrial para ensino médio"}'
```

---

## 🔒 Segurança

### Autenticação

- Todas as requisições requerem header `X-API-KEY`
- A chave é validada contra a variável de ambiente `INTERNAL_API_KEY`

### Arquivos Sensíveis

Os seguintes arquivos **NÃO devem ser versionados**:

- `google_credentials.json` - Credenciais do Google Cloud
- `.env` - Variáveis de ambiente

Estes arquivos já estão listados no `.gitignore`.

### Boas Práticas

- Rotacione a `INTERNAL_API_KEY` periodicamente
- Use credenciais GCP com permissões mínimas necessárias
- Mantenha as dependências atualizadas

---

## ☁️ Deploy

### Render

O serviço está configurado para deploy automático no [Render](https://render.com/).

#### Configuração (render.yaml)

```yaml
services:
  - type: web
    name: ensinai-ai-service
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: ID_PROJETO
        sync: false
      - key: INTERNAL_API_KEY
        sync: false
```

#### Variáveis de Ambiente no Render

Configure as seguintes variáveis no painel do Render:

| Variável | Descrição |
|----------|-----------|
| `ID_PROJETO` | ID do projeto no Google Cloud |
| `INTERNAL_API_KEY` | Chave de autenticação para o Backend |

#### Upload das Credenciais

Para o Render, você pode:

1. **Secret Files**: Fazer upload do `google_credentials.json` como arquivo secreto
2. **Environment Variable**: Codificar o JSON em base64 e decodificar no startup

---

## 🔗 Integração com Backend

O Backend Node.js deve chamar este serviço para gerar conteúdo:

```javascript
// Exemplo de integração no Backend
const response = await fetch(`${AI_SERVICE_URL}/generate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.AI_SERVICE_API_KEY
  },
  body: JSON.stringify({ topic: 'Matemática básica' })
});

const { title, content, tags } = await response.json();
```

---

## 📚 Recursos Adicionais

- [Documentação FastAPI](https://fastapi.tiangolo.com/)
- [Vertex AI Generative AI](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/quickstart-multimodal)
- [Gemini API Reference](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini)
