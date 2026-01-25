-- ============================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS DO SUPABASE
-- Portal LC 252/2016 - Sistema de Analytics
-- ============================================

-- TABELA 1: Analytics de Visitas
-- Registra cada acesso ao site
CREATE TABLE IF NOT EXISTS analytics_visitas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  pagina TEXT,
  secao TEXT,
  viewport_width INTEGER,
  viewport_height INTEGER,
  referrer TEXT,
  country TEXT,
  city TEXT,
  duracao_segundos INTEGER
);

-- TABELA 2: Conversas do ChatBot
-- Registra todas as interações com a IA
CREATE TABLE IF NOT EXISTS chatbot_conversas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT NOT NULL,
  pergunta TEXT NOT NULL,
  resposta TEXT NOT NULL,
  modelo TEXT DEFAULT 'gpt-4o-mini',
  tokens_usados INTEGER,
  tempo_resposta_ms INTEGER,
  feedback_positivo BOOLEAN,
  feedback_comentario TEXT
);

-- TABELA 3: Sessões Agregadas
-- Resume as sessões para analytics mais rápidos
CREATE TABLE IF NOT EXISTS analytics_sessoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT UNIQUE NOT NULL,
  primeira_visita TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultima_visita TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_paginas_vistas INTEGER DEFAULT 1,
  total_perguntas_chatbot INTEGER DEFAULT 0,
  duracao_total_segundos INTEGER DEFAULT 0
);

-- TABELA 4: Estatísticas Diárias (Agregação)
-- Pré-calcula estatísticas por dia para dashboards rápidos
CREATE TABLE IF NOT EXISTS analytics_diarias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data DATE UNIQUE NOT NULL,
  total_visitas INTEGER DEFAULT 0,
  total_sessoes_unicas INTEGER DEFAULT 0,
  total_perguntas_chatbot INTEGER DEFAULT 0,
  media_duracao_segundos INTEGER DEFAULT 0,
  media_paginas_por_sessao FLOAT DEFAULT 0,
  paginas_populares JSONB,
  perguntas_frequentes JSONB
);

-- ============================================
-- ÍNDICES PARA OTIMIZAÇÃO DE CONSULTAS
-- ============================================

-- Índices para analytics_visitas
CREATE INDEX IF NOT EXISTS idx_visitas_session ON analytics_visitas(session_id);
CREATE INDEX IF NOT EXISTS idx_visitas_created ON analytics_visitas(created_at);
CREATE INDEX IF NOT EXISTS idx_visitas_pagina ON analytics_visitas(pagina);

-- Índices para chatbot_conversas
CREATE INDEX IF NOT EXISTS idx_conversas_session ON chatbot_conversas(session_id);
CREATE INDEX IF NOT EXISTS idx_conversas_created ON chatbot_conversas(created_at);

-- Índices para analytics_sessoes
CREATE INDEX IF NOT EXISTS idx_sessoes_session ON analytics_sessoes(session_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_created ON analytics_sessoes(created_at);

-- Índices para analytics_diarias
CREATE INDEX IF NOT EXISTS idx_diarias_data ON analytics_diarias(data);

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- ============================================

-- Habilita RLS em todas as tabelas
ALTER TABLE analytics_visitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversas ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_diarias ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se existirem (para permitir re-execução do script)
DROP POLICY IF EXISTS "Permitir INSERT público visitas" ON analytics_visitas;
DROP POLICY IF EXISTS "Permitir INSERT público conversas" ON chatbot_conversas;
DROP POLICY IF EXISTS "Permitir INSERT público sessões" ON analytics_sessoes;
DROP POLICY IF EXISTS "Permitir UPDATE público sessões" ON analytics_sessoes;
DROP POLICY IF EXISTS "Permitir SELECT público visitas" ON analytics_visitas;
DROP POLICY IF EXISTS "Permitir SELECT público conversas" ON chatbot_conversas;
DROP POLICY IF EXISTS "Permitir SELECT público sessões" ON analytics_sessoes;
DROP POLICY IF EXISTS "Permitir SELECT público diárias" ON analytics_diarias;

-- Política: Permitir INSERT anônimo (para registrar visitas)
CREATE POLICY "Permitir INSERT público visitas" ON analytics_visitas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir INSERT público conversas" ON chatbot_conversas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir INSERT público sessões" ON analytics_sessoes
  FOR INSERT WITH CHECK (true);

-- Política: Permitir UPDATE em sessões (para atualizar contadores)
CREATE POLICY "Permitir UPDATE público sessões" ON analytics_sessoes
  FOR UPDATE USING (true);

-- Política: Permitir SELECT público (TEMPORÁRIO - para desenvolvimento)
-- IMPORTANTE: Em produção, remova essas políticas e use autenticação
CREATE POLICY "Permitir SELECT público visitas" ON analytics_visitas
  FOR SELECT USING (true);

CREATE POLICY "Permitir SELECT público conversas" ON chatbot_conversas
  FOR SELECT USING (true);

CREATE POLICY "Permitir SELECT público sessões" ON analytics_sessoes
  FOR SELECT USING (true);

CREATE POLICY "Permitir SELECT público diárias" ON analytics_diarias
  FOR SELECT USING (true);

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
✅ SCRIPT PRONTO PARA USAR!

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

8. Reinicie o servidor de desenvolvimento:
   npm run dev

OBSERVAÇÃO DE SEGURANÇA:
Por padrão, este script permite SELECT público (leitura) para facilitar o desenvolvimento.
Em produção, você pode remover as políticas "Permitir SELECT público" e implementar
autenticação adequada usando o Supabase Auth.
*/
