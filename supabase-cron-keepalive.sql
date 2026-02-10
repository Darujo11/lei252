-- Habilitar a extensão pg_cron (se ainda não estiver habilitada)
-- Vá em Database > Extensions e habilite pg_cron, ou rode:
create extension if not exists pg_cron;

-- Criar uma tabela simples apenas para registrar o keep-alive (opcional, mas bom para debug)
create table if not exists project_keep_alive (
    id serial primary key,
    last_ping timestamptz default now()
);

-- Habilitar RLS (opcional, para segurança, mas como é tabela interna tanto faz)
alter table project_keep_alive enable row level security;

-- Agendar um job para rodar a cada hora (ou dia)
-- "0 * * * *" = A cada hora cheia
-- Isso fará um INSERT simples, mantendo o banco "ativo".

select cron.schedule(
    'keep-alive-job', -- nome do job
    '0 * * * *',      -- cron expression (toda hora)
    $$
    insert into project_keep_alive (last_ping) values (now())
    -- Opcional: Limpar registros antigos para não encher o banco
    ; delete from project_keep_alive where last_ping < now() - interval '7 days';
    $$
);

-- Para verificar se o job foi criado:
-- select * from cron.job;

-- Para remover o job se necessário:
-- select cron.unschedule('keep-alive-job');
