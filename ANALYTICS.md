# 📊 Sistema de Analytics e Painel Administrativo

Este documento descreve como configurar e usar o sistema de analytics do Portal LC 252/2016.

## 🎯 Funcionalidades

O sistema de analytics rastreia e armazena:

- ✅ **Visitas às páginas** - Cada acesso e navegação no portal
- ✅ **Sessões únicas** - Visitantes únicos identificados por sessão
- ✅ **Conversas do ChatBot** - Todas as perguntas e respostas da IA
- ✅ **Tempo de permanência** - Quanto tempo os usuários ficam em cada página
- ✅ **Páginas mais visitadas** - Ranking de páginas por popularidade
- ✅ **Gráficos e relatórios** - Visualizações interativas dos dados

## 🚀 Configuração do Supabase

### Passo 1: Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub, Google ou email

### Passo 2: Criar Novo Projeto

1. Clique em "New Project"
2. Escolha um nome para o projeto (ex: `portal-lc252-analytics`)
3. Defina uma senha forte para o banco de dados
4. Escolha uma região próxima (ex: South America)
5. Clique em "Create new project" e aguarde 1-2 minutos

### Passo 3: Executar o Script SQL

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **New query**
3. Abra o arquivo `supabase-setup.sql` na raiz do projeto
4. Copie TODO o conteúdo do arquivo
5. Cole no editor SQL do Supabase
6. Clique em **Run** (ou pressione Ctrl+Enter)
7. Verifique se apareceu a mensagem de sucesso

### Passo 4: Obter as Credenciais

1. Vá em **Settings** > **API** (no menu lateral)
2. Copie os seguintes valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Uma chave longa começando com `eyJ...`

### Passo 5: Configurar o Arquivo .env

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione suas credenciais:
   ```env
   # Supabase
   VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...

   # Senha do Painel Admin (altere para algo seguro!)
   VITE_ADMIN_PASSWORD=sua_senha_secreta_aqui
   ```

3. **IMPORTANTE**: Nunca commite o arquivo `.env` no Git! Ele já está no `.gitignore`.

### Passo 6: Reiniciar o Servidor

```bash
npm run dev
```

Agora o sistema de analytics está ativo! 🎉

## 📊 Acessando o Painel Administrativo

### Como Acessar

1. No portal, clique em **"📊 Painel Admin"** no menu lateral
2. Digite a senha configurada em `VITE_ADMIN_PASSWORD`
3. Clique em "Acessar Painel"

### Senha Padrão

- Se você NÃO configurou a senha no `.env`, a senha padrão é: `admin123`
- **ALTERE A SENHA** em produção para algo mais seguro!

### O que você verá no Painel

#### 1. Cards de Estatísticas
- **Total de Visitas**: Número total de acessos ao portal
- **Sessões Únicas**: Quantos visitantes únicos
- **Perguntas ao ChatBot**: Total de interações com a IA
- **Taxa de Engajamento**: Percentual de visitantes que usam o chat

#### 2. Gráfico de Visitas por Dia
- Linha do tempo mostrando visitas diárias
- Filtre por 7, 30 ou 90 dias

#### 3. Páginas Mais Visitadas
- Gráfico de barras com ranking de páginas
- Identifica o conteúdo mais popular

#### 4. Conversas do ChatBot
- Lista completa de todas as perguntas e respostas
- Busca por palavra-chave
- Inclui data/hora, tokens usados
- Use para identificar dúvidas frequentes

#### 5. Exportação de Dados
- Botão "Exportar Dados" gera arquivo JSON
- Contém todos os dados para análise externa

## 🔐 Segurança

### Proteção por Senha

- O painel admin está protegido por senha
- A senha é armazenada APENAS no `.env` (não no banco)
- A sessão expira quando você fecha o navegador

### Políticas de Segurança do Supabase (RLS)

O sistema usa Row Level Security (RLS) do Supabase:

- **INSERT público**: Qualquer visitante pode registrar visitas/conversas
- **SELECT autenticado**: Apenas usuários autenticados leem os dados
- Sem autenticação Supabase = sem acesso aos dados via API

### Melhorias Futuras de Segurança

Para produção, considere:

1. **Autenticação Supabase**: Usar login real em vez de senha simples
2. **2FA**: Autenticação de dois fatores
3. **Logs de auditoria**: Rastrear quem acessou o painel
4. **Rate limiting**: Limitar tentativas de login

## 📦 Estrutura das Tabelas

### `analytics_visitas`
Registra cada acesso individual ao portal.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único da visita |
| `created_at` | timestamp | Data/hora do acesso |
| `session_id` | text | ID da sessão do usuário |
| `pagina` | text | Página acessada |
| `secao` | text | Seção específica |
| `user_agent` | text | Navegador do usuário |
| `viewport_width` | int | Largura da tela |
| `duracao_segundos` | int | Tempo de permanência |

### `chatbot_conversas`
Armazena interações com o ChatBot.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único da conversa |
| `created_at` | timestamp | Data/hora da pergunta |
| `session_id` | text | ID da sessão |
| `pergunta` | text | Pergunta do usuário |
| `resposta` | text | Resposta da IA |
| `modelo` | text | Modelo usado (gpt-4o-mini) |
| `tokens_usados` | int | Custo em tokens |
| `tempo_resposta_ms` | int | Latência da resposta |

### `analytics_sessoes`
Agrupa visitas por sessão de usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `session_id` | text | ID único da sessão |
| `primeira_visita` | timestamp | Primeiro acesso |
| `ultima_visita` | timestamp | Último acesso |
| `total_paginas_vistas` | int | Páginas visitadas |
| `total_perguntas_chatbot` | int | Perguntas feitas |

## 🛠️ Troubleshooting

### "Supabase não configurado"

**Problema**: Mensagem vermelha no painel admin

**Solução**:
1. Verifique se o arquivo `.env` existe
2. Confira se as variáveis estão corretas (sem espaços extras)
3. Reinicie o servidor de desenvolvimento (`npm run dev`)

### "Erro ao registrar visita"

**Problema**: Console mostra erro ao salvar dados

**Soluções**:
1. Verifique se executou o script `supabase-setup.sql`
2. Vá no Supabase > Table Editor e confirme que as tabelas existem
3. Verifique se as políticas RLS estão ativas

### "Chave da API inválida"

**Problema**: Erro 401 ao acessar dados

**Solução**:
1. Copie novamente a chave do Supabase (Settings > API)
2. Use a chave **anon/public** (não a service_role)
3. Remova espaços antes/depois da chave no `.env`

### "Não consigo fazer login no painel"

**Problema**: Senha não aceita

**Solução**:
1. Verifique o valor de `VITE_ADMIN_PASSWORD` no `.env`
2. Se não configurou, use a senha padrão: `admin123`
3. Reinicie o servidor após alterar o `.env`

## 📈 Uso Avançado

### Criar Relatórios Customizados

Você pode criar consultas SQL personalizadas no Supabase:

```sql
-- Top 10 perguntas mais frequentes
SELECT
  pergunta,
  COUNT(*) as total
FROM chatbot_conversas
GROUP BY pergunta
ORDER BY total DESC
LIMIT 10;

-- Média de visitas por dia da semana
SELECT
  EXTRACT(DOW FROM created_at) as dia_semana,
  COUNT(*) as total_visitas
FROM analytics_visitas
GROUP BY dia_semana
ORDER BY dia_semana;
```

### Automatizar Agregações

Configure um cron job no Supabase para agregar dados diariamente:

1. Vá em **Database** > **Cron Jobs**
2. Adicione job para executar `atualizar_estatisticas_diarias()`
3. Configure para rodar diariamente à meia-noite

### Integrar com Google Analytics

Para comparar dados, você pode:
1. Exportar dados do painel (botão "Exportar Dados")
2. Importar o JSON em ferramentas de análise
3. Cruzar com dados do Google Analytics

## 💰 Custos

### Supabase (Free Tier)
- ✅ **Gratuito** até 500 MB de banco de dados
- ✅ **Gratuito** até 2 GB de transferência/mês
- ✅ **Gratuito** até 50.000 usuários autenticados

Para um portal com tráfego moderado (< 10.000 visitas/mês), o plano gratuito é suficiente.

### OpenAI (ChatBot)
- Custo por uso do GPT-4o-mini
- Aproximadamente $0.15 por 1 milhão de tokens
- 1 conversa média = ~500 tokens = $0.000075

**Exemplo**: 1.000 perguntas/mês = ~$0.08

## 📝 Notas Importantes

1. **Privacidade**: O sistema NÃO coleta dados pessoais identificáveis
2. **Sessões**: Sessões são geradas aleatoriamente e não rastreiam usuários individuais
3. **IP**: IPs podem ser coletados mas não são salvos por padrão (configurável)
4. **LGPD**: Recomenda-se adicionar aviso de cookies/analytics no site

## 🔄 Atualizações Futuras

Funcionalidades planejadas:
- [ ] Feedback nas respostas do chatbot (👍 👎)
- [ ] Heatmaps de cliques
- [ ] Funil de conversão
- [ ] Alertas por email (ex: muitas perguntas não respondidas)
- [ ] Dashboard em tempo real (WebSockets)

## 📞 Suporte

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Community**: https://github.com/supabase/supabase/discussions

---

**Última atualização**: Janeiro 2026
