# Guia de Deploy no Railway

## 📋 Pré-requisitos

- Conta no Railway (https://railway.app)
- Repositório no GitHub: https://github.com/DACWB/medicinove-quiz

## 🚀 Passo a Passo

### 1. Criar Novo Projeto no Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha o repositório: **DACWB/medicinove-quiz**

### 2. Adicionar Banco de Dados PostgreSQL

1. No projeto, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. O Railway vai criar automaticamente e configurar a variável `DATABASE_URL`

### 3. Configurar Variáveis de Ambiente

No serviço do Next.js, vá em **"Variables"** e adicione:

```
JWT_SECRET=medicinove-secret-key-2026
ADMIN_EMAIL=daniloaedo@gmail.com
ADMIN_PASSWORD=Med#1213#3369
QUIZ_TOKEN=embarque10
```

**Importante:** A variável `DATABASE_URL` já está configurada automaticamente pelo Railway!

### 4. Configurar Domínio

#### Opção A: Domínio do Railway (Temporário)

1. No serviço, vá em **"Settings"**
2. Role até **"Networking"**
3. Clique em **"Generate Domain"**
4. Copie a URL gerada (ex: `medicinove-quiz-production.up.railway.app`)

#### Opção B: Domínio Customizado (quiz.medicinove.com.br)

1. No serviço, vá em **"Settings" → "Networking"**
2. Clique em **"Custom Domain"**
3. Digite: `quiz.medicinove.com.br`
4. O Railway vai mostrar um IP ou CNAME
5. Vá no Hostgator e configure:
   - **Tipo:** A Record ou CNAME
   - **Nome:** quiz
   - **Aponta para:** [IP ou CNAME fornecido pelo Railway]
   - **TTL:** 3600

### 5. Aguardar Deploy

O Railway vai:
1. ✅ Detectar Next.js automaticamente
2. ✅ Instalar dependências (`npm install`)
3. ✅ Gerar cliente Prisma (`prisma generate`)
4. ✅ Fazer build (`npm run build`)
5. ✅ Criar tabelas no banco (`prisma db push`)
6. ✅ Iniciar servidor (`npm start`)

**Tempo estimado:** 3-5 minutos

### 6. Verificar Deploy

Quando terminar, você vai ver:
- ✅ Status: **Success** (verde)
- ✅ Logs mostrando: `✓ Ready in XXXms`

### 7. Testar o Sistema

#### Teste 1: Página Inicial
```
https://[seu-dominio].up.railway.app
```
Deve mostrar a página com logo e campo de token.

#### Teste 2: Entrar com Token
- Token: `embarque10`
- Deve redirecionar para identificação

#### Teste 3: Dashboard Admin
```
https://[seu-dominio].up.railway.app/admin
```
- Email: `daniloaedo@gmail.com`
- Senha: `Med#1213#3369`

## 🔧 Solução de Problemas

### Erro: "Cannot find module '@prisma/client'"

**Solução:** Adicione no `package.json`:
```json
"scripts": {
  "build": "prisma generate && next build"
}
```

### Erro: "Database connection failed"

**Solução:** 
1. Verifique se o PostgreSQL está rodando no Railway
2. Verifique se a variável `DATABASE_URL` está configurada
3. Tente fazer redeploy

### Erro 404 em todas as páginas

**Solução:**
1. Verifique se o build foi concluído com sucesso
2. Verifique os logs do Railway
3. Tente fazer redeploy

## 📊 Monitoramento

### Ver Logs
1. No Railway, clique no serviço
2. Vá em **"Deployments"**
3. Clique no deploy ativo
4. Veja os logs em tempo real

### Ver Banco de Dados
1. Clique no serviço PostgreSQL
2. Vá em **"Data"**
3. Ou use: `npx prisma studio` localmente

## 🔒 Segurança

### Alterar Senha do Admin

1. Vá em **"Variables"** no Railway
2. Altere `ADMIN_PASSWORD`
3. Faça redeploy

### Alterar Token de Acesso

1. Vá em **"Variables"** no Railway
2. Altere `QUIZ_TOKEN`
3. Faça redeploy

## 📱 Domínio Customizado

Depois que o DNS propagar (até 24h), você pode:
- Remover o domínio do Railway se quiser
- Manter os dois (Railway + customizado)

## 🎯 Próximos Passos

1. ✅ Testar o quiz completo
2. ✅ Verificar dashboard admin
3. ✅ Convidar mentorados para testar
4. ✅ Acompanhar respostas no dashboard

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Railway
2. Verifique as variáveis de ambiente
3. Tente fazer redeploy

---

**Repositório:** https://github.com/DACWB/medicinove-quiz
**Deploy:** Railway
**Domínio:** quiz.medicinove.com.br (após configuração DNS)
