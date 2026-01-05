# Quiz SOAPIA - MediciNove

Sistema de questionário de onboarding para a Mentoria MediciNove.

## Funcionalidades

- ✅ Página inicial com token de acesso ("embarque10")
- ✅ Identificação do mentorado (nome, email, WhatsApp)
- ✅ Quiz com 44 perguntas divididas em seções (LGPD, Identificação, S, O, A, P, IA, Fechamento)
- ✅ Sistema de progressão (4 perguntas por página)
- ✅ Salvamento automático de progresso
- ✅ Dashboard admin com login
- ✅ Sistema de gabarito automático com cálculo de perfis
- ✅ Scores: Conforto Tech, Maturidade IA, LGPD/Risco
- ✅ Trilhas recomendadas (1-5) e flags de alerta
- ✅ Design responsivo (mobile + desktop)

## Tecnologias

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="daniloaedo@gmail.com"
ADMIN_PASSWORD="Med#1213#3369"
QUIZ_TOKEN="embarque10"
```

### 2. Instalação

```bash
npm install
```

### 3. Banco de Dados

```bash
# Criar tabelas
npx prisma db push

# Gerar cliente Prisma
npx prisma generate
```

### 4. Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### 5. Produção

```bash
npm run build
npm start
```

## Deploy no Railway

1. Conecte o repositório do GitHub ao Railway
2. Adicione as variáveis de ambiente
3. O Railway vai detectar automaticamente e fazer o deploy

## Acesso

### Mentorados
- URL: https://seu-dominio.com
- Token: embarque10

### Admin
- URL: https://seu-dominio.com/admin
- Email: daniloaedo@gmail.com
- Senha: Med#1213#3369

## Estrutura do Projeto

```
medicinove-quiz/
├── app/
│   ├── api/           # APIs do backend
│   ├── admin/         # Dashboard admin
│   ├── quiz/          # Páginas do quiz
│   ├── globals.css    # Estilos globais
│   ├── layout.tsx     # Layout raiz
│   └── page.tsx       # Página inicial
├── lib/
│   ├── prisma.ts      # Cliente Prisma
│   ├── questions.ts   # Perguntas do quiz
│   └── scoring.ts     # Sistema de gabarito
├── prisma/
│   └── schema.prisma  # Schema do banco
└── public/
    └── images/        # Imagens (logo)
```

## Cores do Design

- Fundo principal: #0F1115
- Cards: #1C1F26
- Bordas: #2A2E37
- Texto principal: #FFFFFF
- Texto secundário: #B0B4BC
- Ação: #3A7AFE
- Hover: #5C8CFF
- Erro: #E5533D

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe MediciNove.

---

© 2026 MediciNove. Todos os direitos reservados.
