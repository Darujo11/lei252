-- ============================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS DO SUPABASE
-- Portal LC 252/2016 - Sistema de Analytics
-- ============================================

-- TABELA 1: Analytics de Visitas
-- Registra cada acesso ao site
CREATE TABLE IF NOT EXISTS analytics_visitas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Identificação da sessão
  session_id TEXT NOT NULL,

  -- Informações do usuário
  user_agent TEXT,
  ip_address INET,

  -- Informações da página
  pagina TEXT,
  secao TEXT,

  -- Dados técnicos
  viewport_width INTEGER,
  viewport_height INTEGER,
  referrer TEXT,

  -- Localização (se disponível)
  country TEXT,
  city TEXT,

  -- Tempo de permanência
  duracao_segundos INTEGER,

  -- Índice para buscas rápidas
  INDEX idx_session (session_id),
  INDEX idx_created (created_at),
  INDEX idx_pagina (pagina)
);

-- TABELA 2: Conversas do ChatBot
-- Registra todas as interações com a IA
CREATE TABLE IF NOT EXISTS chatbot_conversas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Identificação da sessão
  session_id TEXT NOT NULL,

  -- Mensagem do usuário
  pergunta TEXT NOT NULL,

  -- Resposta da IA
  resposta TEXT NOT NULL,

  -- Metadados
  modelo TEXT DEFAULT 'gpt-4o-mini',
  tokens_usados INTEGER,
  tempo_resposta_ms INTEGER,

  -- Feedback do usuário (para implementar no futuro)
  feedback_positivo BOOLEAN,
  feedback_comentario TEXT,

  -- Índices
  INDEX idx_session (session_id),
  INDEX idx_created (created_at)
);

-- TABELA 3: Sessões Agregadas
-- Resume as sessões para analytics mais rápidos
CREATE TABLE IF NOT EXISTS analytics_sessoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  session_id TEXT UNIQUE NOT NULL,

  -- Primeira e última atividade
  primeira_visita TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultima_visita TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contadores
  total_paginas_vistas INTEGER DEFAULT 1,
  total_perguntas_chatbot INTEGER DEFAULT 0,

  -- Duração total da sessão
  duracao_total_segundos INTEGER DEFAULT 0,

  -- Índices
  INDEX idx_session (session_id),
  INDEX idx_created (created_at)
);

-- TABELA 4: Estatísticas Diárias (Agregação)
-- Pré-calcula estatísticas por dia para dashboards rápidos
CREATE TABLE IF NOT EXISTS analytics_diarias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE UNIQUE NOT NULL,

  -- Contadores gerais
  total_visitas INTEGER DEFAULT 0,
  total_sessoes_unicas INTEGER DEFAULT 0,
  total_perguntas_chatbot INTEGER DEFAULT 0,

  -- Métricas de engajamento
  media_duracao_segundos INTEGER DEFAULT 0,
  media_paginas_por_sessao FLOAT DEFAULT 0,

  -- Páginas mais visitadas (JSON)
  paginas_populares JSONB,

  -- Perguntas mais frequentes (JSON)
  perguntas_frequentes JSONB,

  -- Índice
  INDEX idx_data (data)
);

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- ============================================

-- Habilita RLS em todas as tabelas
ALTER TABLE analytics_visitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversas ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_diarias ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT anônimo (para registrar visitas)
CREATE POLICY "Permitir INSERT público" ON analytics_visitas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir INSERT público" ON chatbot_conversas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir INSERT público" ON analytics_sessoes
  FOR INSERT WITH CHECK (true);

-- Política: Permitir UPDATE em sessões (para atualizar contadores)
CREATE POLICY "Permitir UPDATE público" ON analytics_sessoes
  FOR UPDATE USING (true);

-- Política: Apenas leitura autenticada para o painel admin
-- (Você precisará criar um usuário admin no Supabase)
CREATE POLICY "Admin pode ler tudo" ON analytics_visitas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin pode ler tudo" ON chatbot_conversas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin pode ler tudo" ON analytics_sessoes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin pode ler tudo" ON analytics_diarias
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- FUNÇÕES AUXILIARES
-- ============================================

-- Função para atualizar estatísticas diárias (pode ser chamada por trigger ou cron job)
CREATE OR REPLACE FUNCTION atualizar_estatisticas_diarias()
RETURNS void AS $$
BEGIN
  INSERT INTO analytics_diarias (
    data,
    total_visitas,
    total_sessoes_unicas,
    total_perguntas_chatbot,
    media_duracao_segundos,
    media_paginas_por_sessao
  )
  SELECT
    DATE(created_at) as data,
    COUNT(*) as total_visitas,
    COUNT(DISTINCT session_id) as total_sessoes_unicas,
    (SELECT COUNT(*) FROM chatbot_conversas WHERE DATE(created_at) = DATE(analytics_visitas.created_at)) as total_perguntas,
    AVG(duracao_segundos)::INTEGER as media_duracao,
    COUNT(*)::FLOAT / COUNT(DISTINCT session_id) as media_paginas
  FROM analytics_visitas
  WHERE DATE(created_at) = CURRENT_DATE - INTERVAL '1 day'
  GROUP BY DATE(created_at)
  ON CONFLICT (data) DO UPDATE SET
    total_visitas = EXCLUDED.total_visitas,
    total_sessoes_unicas = EXCLUDED.total_sessoes_unicas,
    total_perguntas_chatbot = EXCLUDED.total_perguntas_chatbot,
    media_duracao_segundos = EXCLUDED.media_duracao_segundos,
    media_paginas_por_sessao = EXCLUDED.media_paginas_por_sessao;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INSTRUÇÕES DE USO
-- ============================================

/*
1. Copie este script completo
2. Acesse seu projeto no Supabase (https://supabase.com)
3. Vá em "SQL Editor"
4. Cole o script e execute (Run)
5. Verifique se as tabelas foram criadas em "Table Editor"

6. Obtenha suas credenciais:
   - Project URL: Settings > API > Project URL
   - Anon/Public Key: Settings > API > Project API keys > anon/public

7. Configure no arquivo .env do projeto:
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
*/
