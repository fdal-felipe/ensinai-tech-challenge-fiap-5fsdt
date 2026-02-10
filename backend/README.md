# Ensinai Tech Challenge — Testes e Insomnia

Este README descreve como executar e testar a API localmente e como importar a coleção do Insomnia com os endpoints da aplicação e do agente de IA.

Pré-requisitos
- Docker & Docker Compose (para rodar PostgreSQL + app)
- Node.js (para executar scripts de teste localmente)
- Insomnia (opcional para testes manuais)

Arquivos importantes (workspace `backend`)
- `docker-compose.yml` — orquestra PostgreSQL + app
- `Insomnia_Collection_ready.json` — coleção pronta para importar no Insomnia
- `test-api.js` — script Node.js que executa uma suíte automatizada de testes
- `test-api.http` — requests HTTP prontos (REST Client / Insomnia compatible)

1) Iniciar aplicação (Docker)
Execute na pasta `backend`:

```bash
docker-compose up --build -d
```

Verifique containers:

```bash
docker ps
```

Os containers esperados: `ensinai_postgres` (healthy) e `ensinai_app` (running).

2) Obter token (exemplo via curl / PowerShell)
- Registrar usuário (ex.: professor):

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Prof","email":"test@local","password":"senha123","role":"professor"}'
```

- Fazer login e obter token:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@local","password":"senha123"}'
```

A resposta conterá o campo `token`. Use-o no header `Authorization: Bearer <token>`.

3) Importar coleção no Insomnia
- Abra Insomnia → File → Import → From File → selecione `Insomnia_Collection_ready.json` na pasta `backend`.
- Abra o Environment `Development` e atualize `base_url` (padrão `http://localhost:3000`) e `token` (cole o JWT no campo `token`).
- Grupo `🤖 AI` contém as requests:
  - `POST - AI Generate` → `/ai/generate`
  - `POST - AI Analyze` → `/ai/analyze`
  - `POST - AI Moderate` → `/ai/moderate`
  - `POST - AI Respond` → `/ai/respond`

4) Testes automatizados (script local)
- Rodar a suíte de testes que faz registro/login e chama vários endpoints:

```bash
# na pasta backend
node test-api.js
```

O script exibirá um resumo com testes passados/falhados.

5) Testes manuais via Insomnia
- Certifique-se de que o header `Authorization` em cada request esteja definido como `Bearer {{ token }}` (variável do Environment)
- Use os requests em `🔐 Autenticação` para registrar/login
- Depois execute as requests em `🤖 AI` (requer autenticação)

6) Observações e dicas
- Os endpoints de IA implementados no controller são, por enquanto, mocks (classe `AIService`) que simulam comportamento. Para integrar com OpenAI / Gemini substitua os métodos em `src/controllers/aiController.js` por chamadas reais à API escolhida.
- Se `docker-compose up` falhar por falta do Docker daemon, certifique-se de que o Docker Desktop esteja rodando.
- Logs da aplicação (container `ensinai_app`) podem ser acessados com:

```bash
docker logs ensinai_app
```

7) Problemas comuns
- 401 Unauthorized: verifique se o `token` foi copiado corretamente e inserido no Environment do Insomnia ou nos headers das requests.
- 404 Not Found: confira `base_url` e se a rota existe naquele nome.
- 500 Internal Server Error na criação de comentários/posts: verifique se a tabela `comments`/`posts` existe (o container do Postgres deve estar healthy e as migrations aplicadas automaticamente pelo app na inicialização).

Se quiser, eu posso:
- Gerar uma versão do `Insomnia_Collection_ready.json` com exemplos diferentes.
- Rodar os requests do Insomnia via script (usando `curl` ou `httpie`) e entregar um relatório detalhado.

---
Arquivo gerado automaticamente: `README.md` na pasta `backend`.
