# Recreio Bar — Gestão Operacional
## Guia de publicação (sem programação)

Tempo estimado: **40 a 60 minutos**, uma única vez. Você vai criar 3 contas gratuitas:

| Serviço | Para quê |
|---|---|
| **Supabase** | Banco de dados, login dos funcionários, fotos e PDFs |
| **GitHub** | Guardar o código do sistema |
| **Vercel** | Colocar o sistema no ar (gera o endereço/URL) |

> Use o mesmo e-mail nas três. Anote todas as senhas num lugar seguro.

---

### PASSO 1 — Criar o banco no Supabase

1. Acesse **supabase.com** → *Start your project* → entre com o GitHub ou e-mail.
2. Clique em **New project**.
   - **Name:** `recreio-bar`
   - **Database Password:** crie uma senha forte e **anote**.
   - **Region:** *South America (São Paulo)*.
3. Clique em **Create new project** e aguarde uns 2 minutos.

### PASSO 2 — Criar as tabelas (copiar e colar)

1. No menu lateral do Supabase, abra **SQL Editor** → **New query**.
2. Abra o arquivo `supabase/01_estrutura.sql` (está na pasta do projeto) num editor de texto (Bloco de Notas / TextEdit), **copie tudo** e cole no Supabase.
3. Clique em **Run**. Deve aparecer *Success. No rows returned*.
4. Clique em **New query** de novo, faça o mesmo com `supabase/02_dados_iniciais.sql` e **Run**.

> Se aparecer erro dizendo que algo "already exists", você já tinha rodado aquele arquivo — tudo bem, siga em frente.

**Alertas automáticos a cada 15 minutos (recomendado):**
1. Menu **Database** → **Extensions** → procure `pg_cron` → ative.
2. Volte ao **SQL Editor** → **New query** → cole o conteúdo de `supabase/03_agendamento.sql` → **Run**.

### PASSO 3 — Fechar o cadastro público

Só a gerência cria usuários. Para ninguém se cadastrar sozinho:

1. Menu **Authentication** → **Sign In / Providers** (ou *Providers*).
2. Desligue **Allow new users to sign up** → **Save**.

### PASSO 4 — Copiar as 3 chaves

Menu **Project Settings** (engrenagem) → **API** (ou **API Keys**). Copie para um bloco de notas:

| Nome no Supabase | Vai virar |
|---|---|
| **Project URL** (`https://xxxx.supabase.co`) | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon** / **public** key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role** / **secret** key | `SUPABASE_SERVICE_ROLE_KEY` |

> Se a tela mostrar "Publishable" e "Secret" keys, abra a aba **Legacy API keys** e use **anon** e **service_role**.
>
> ⚠️ A chave **service_role** dá acesso total. Nunca mande por WhatsApp nem coloque em lugar público.

Invente também uma quarta "senha" longa (ex.: `recreio-instala-2026-xyz789`). Ela será o **CRON_SECRET**, que também serve de **código de instalação** no Passo 7.

### PASSO 5 — Enviar o código para o GitHub

1. Acesse **github.com** → crie uma conta (se não tiver).
2. Canto superior direito **+** → **New repository**.
   - **Repository name:** `recreio-bar`
   - Marque **Private**.
   - Clique **Create repository**.
3. Na página seguinte, clique no link **uploading an existing file**.
4. Descompacte o arquivo `recreio-bar.zip` no seu computador. Abra a pasta `recreio-bar`, **selecione tudo que está dentro dela** e arraste para a página do GitHub.
   - Confira que aparecem `app`, `components`, `lib`, `supabase`, `package.json` etc. na lista.
5. Clique **Commit changes**.

### PASSO 6 — Colocar no ar com a Vercel

1. Acesse **vercel.com** → **Sign Up** → **Continue with GitHub**.
2. **Add New…** → **Project** → ao lado de `recreio-bar` clique **Import**.
3. Abra **Environment Variables** e cadastre as 4 (nome à esquerda, valor à direita):

```
NEXT_PUBLIC_SUPABASE_URL        = (Project URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY   = (anon key)
SUPABASE_SERVICE_ROLE_KEY       = (service_role key)
CRON_SECRET                     = (a senha longa que você inventou)
```

4. Clique **Deploy** e aguarde uns 2 minutos.
5. Ao terminar, clique na imagem do site. O endereço será algo como `https://recreio-bar.vercel.app`. **Esse é o link do sistema.**

> Se esquecer alguma variável: Vercel → projeto → **Settings** → **Environment Variables** → adicione → **Deployments** → nos três pontinhos do último → **Redeploy**.

### PASSO 7 — Criar o seu usuário de administrador

1. Abra `https://SEU-ENDERECO.vercel.app/primeiro-acesso`.
2. **Código de instalação:** o mesmo valor do `CRON_SECRET`.
3. Preencha seu nome, um usuário (ex.: `avener`) e uma senha com pelo menos 8 caracteres.
4. Clique **Criar administrador** → **Entrar**.

> Essa página só funciona uma vez. Depois que existe um administrador, ela fica bloqueada.

### PASSO 8 — Testar com dados de demonstração (opcional)

1. Menu **Rotinas** → **Carregar demonstração**.
2. São criados 60 dias de fechamentos fictícios (marcados **DEMO**) e 4 usuários de teste (`demo.gestor`, `demo.joao`, `demo.ana`, `demo.lucas`). **A senha aparece só uma vez — anote.**
3. Explore o **Painel**, o **Histórico**, baixe um PDF, entre como `demo.joao` no celular e faça um fechamento de teste.
4. **Antes de começar a operação real:** **Rotinas** → **Remover demonstração**. Tudo marcado como DEMO é apagado e os usuários de teste são desativados (fica registrado na auditoria).

### PASSO 9 — Cadastrar a equipe

Menu **Equipe** → **Novo colaborador**: nome, usuário (sem espaços e acentos, ex.: `joao.silva`), senha inicial, perfil e turno.

| Perfil | Pode |
|---|---|
| **Administrador** | Tudo: rotinas, equipe, exclusões |
| **Gestor** (chefe de bar / gerência) | Painel, validar, regularizar, registrar não conformidade, corrigir com justificativa, PDFs |
| **Operacional** | Executar o checklist do dia e ver o próprio histórico |

Para desligar alguém: **Editar** → desmarque **Acesso ativo**. O histórico da pessoa é mantido.

### PASSO 10 — Levar para o bar

1. Menu **QR Code** → **Imprimir** → cole perto da Bar Station.
2. No celular, abra o link e use **Adicionar à tela de início** (iPhone: botão Compartilhar; Android: menu ⋮). O sistema abre como um aplicativo.

---

## Como funciona no dia a dia

**Funcionário:** entra → **Iniciar checklist** → toca no quadrado de cada tarefa ao concluir (nome e horário ficam gravados) → pode abrir a tarefa para escrever observação ou tirar foto → se algo não puder ser feito, **Não foi possível executar** e descreve → ao terminar, **Finalizar fechamento**. O sistema gera o protocolo e o PDF.

**Regras que o sistema garante (no servidor, não só na tela):**
- Não finaliza com tarefa pendente.
- Tarefa com ocorrência → o fechamento fica **COM PENDÊNCIA** até o gestor **regularizar** ou **validar em caráter excepcional** (com justificativa obrigatória).
- Depois de finalizado, o funcionário não altera mais nada.
- Não existe fechamento duplicado: se duas pessoas tocarem em "Iniciar" ao mesmo tempo, ambas caem no mesmo checklist.
- Toda alteração fica na **auditoria**, com quem, quando e por quê. A auditoria não pode ser apagada.
- O "dia operacional" vira às 06h (horário de Brasília). Um fechamento feito à 01h40 conta para o dia anterior.

**Gestor:** abre o fechamento no **Histórico** → **Validar fechamento** (seu nome e horário vão para o PDF). Pode **Registrar não conformidade** se encontrar algo fora do padrão na conferência, e **Corrigir** um registro informando o motivo.

**Alertas** (menu Alertas e painel):
- Checklist não iniciado até o horário + tolerância
- Checklist iniciado e não finalizado no prazo
- Fechamento com pendência
- Pendência sem regularização após 12h
- Fechamento concluído
- Ocorrência registrada
- Falha reincidente (mesma tarefa com 3+ ocorrências em 14 dias)

**Compartilhar o PDF:** botão **Compartilhar** → no celular abre direto o WhatsApp/e-mail com o arquivo; no computador, gera um link válido por 7 dias.

**Novas rotinas** (abertura, limpezas, inventário de copos, gelo, rupturas, produções, perdas): já estão cadastradas como **Inativas** em **Rotinas**. Para usar, ajuste tarefas, horários, frequência e responsáveis e marque **Rotina ativa**. Tarefas podem exigir foto (📷) ou pedir quantidade (#) — ideal para inventários e contagens.

---

## Envio automático por WhatsApp ou e-mail (próxima etapa)

Hoje o sistema avisa **dentro do app** e permite **compartilhar manualmente** o PDF. Para envio automático é preciso um serviço externo:

| Canal | O que é necessário |
|---|---|
| **E-mail** | Conta num serviço de envio (ex.: Resend, SendGrid) e um domínio próprio verificado. Custo baixo ou zero no volume de um bar. |
| **WhatsApp** | WhatsApp Business API, via Meta direto ou por um provedor (ex.: Twilio, Z-API, Gupshup). Exige número dedicado, aprovação de modelos de mensagem e tem custo por conversa. |

Com a conta criada, a ligação é feita nas notificações que o sistema já gera (tabela `notifications`).

---

## Custos e cuidados

- **Para começar**, os planos gratuitos do Supabase e da Vercel atendem.
- **Vercel:** o plano gratuito (Hobby) é para uso não comercial. Para uso no negócio, o correto é o plano **Pro**.
- **Supabase:** projetos gratuitos **pausam após 7 dias sem uso** e não têm backup diário. Com uso diário não pausa, mas para dados de operação recomendo o plano **Pro**, que inclui backups.
- Confira os preços atuais nos sites antes de contratar.

## Se algo der errado

| Sintoma | Causa provável |
|---|---|
| Tela de login diz "usuário ou senha incorretos" para todos | Variáveis da Vercel erradas ou com espaço sobrando. Confira e faça **Redeploy**. |
| `/primeiro-acesso` diz "Banco não configurado" | Os arquivos SQL do Passo 2 não foram executados, ou a `SUPABASE_SERVICE_ROLE_KEY` está errada. |
| "Código de instalação incorreto" | O código digitado é diferente do `CRON_SECRET` cadastrado na Vercel. |
| Funcionário entra e volta para o login | O usuário está **inativo** em Equipe. |
| PDF não baixa | Confira se o Passo 2 criou os armazenamentos `fotos` e `relatorios` (Supabase → **Storage**). |
