# Recreio Bar — Gestão Operacional

Checklists de fechamento, painel gerencial, relatório PDF automático e auditoria.
**Para publicar, siga o arquivo `GUIA-DE-PUBLICACAO.md`.**

## Tecnologia
- Next.js 14 (App Router) · PWA · Tailwind
- Supabase: Auth (usuário + senha), Postgres com RLS, Storage privado
- PDF gerado no servidor com `pdf-lib`, a partir do banco

## Estrutura
```
supabase/01_estrutura.sql      tabelas, regras de negócio (funções), RLS, auditoria, alertas
supabase/02_dados_iniciais.sql checklist de fechamento (12 tarefas) + módulos futuros inativos
supabase/03_agendamento.sql    alertas a cada 15 min (pg_cron)
app/(app)/checklist            execução pelo funcionário
app/(app)/painel               dashboard gerencial
app/(app)/historico            histórico, validação, regularização, auditoria, PDF
app/(app)/alertas              notificações internas
app/(app)/admin                rotinas e equipe
app/api/execucoes/[id]         finalização e PDF (servidor)
app/api/cron/alertas           alternativa ao pg_cron (Authorization: Bearer CRON_SECRET)
lib/report.ts                  layout do PDF
lib/demo.ts                    gerador dos dados de demonstração
```

## Segurança
Toda alteração de checklist passa por funções do banco (`start_execution`, `set_task_done`,
`finalize_execution`, `validate_execution`, ...) que conferem perfil e estado. Não há
política de UPDATE/DELETE direto nas tabelas operacionais; a tabela `audit_log` é imutável.

## Rodar localmente
```
cp .env.example .env.local   # preencha as chaves
npm install
npm run dev
```
