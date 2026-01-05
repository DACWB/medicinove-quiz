# 🎯 Sistema de Quiz SOAPIA - MediciNove

## ✅ O Que Foi Criado

### 1. **Página Inicial com Token**
- Campo para inserir token de acesso
- Token: `embarque10`
- Logo MediciNove
- Design responsivo

### 2. **Página de Identificação**
- Nome completo
- Email
- WhatsApp
- Salvamento automático

### 3. **Quiz Completo (44 Perguntas)**
- Dividido em seções:
  - Termo de Privacidade e LGPD (4 perguntas)
  - Identificação (3 perguntas)
  - S — Subjetivo (11 perguntas)
  - O — Objetivo (9 perguntas)
  - A — Análise (6 perguntas)
  - P — Plano (4 perguntas)
  - IA — Implementação (3 perguntas)
  - Fechamento (2 perguntas)
  - Bônus opcional (2 perguntas)

- **Tipos de perguntas:**
  - Escolha única (radio)
  - Múltipla escolha (checkbox)
  - Texto curto
  - Texto longo (textarea)
  - Slider (0-10)

- **Funcionalidades:**
  - 4 perguntas por página
  - Barra de progresso
  - Salvamento automático
  - Continuar de onde parou
  - Validação de campos obrigatórios

### 4. **Sistema de Gabarito Automático**

Calcula automaticamente:

#### Perfis (pontuação):
- **Executor** - Ação rápida, gosta de decidir e tocar
- **Analista** - Analítico, gosta de validar antes
- **Explorador** - Comunicativo, aprende trocando ideias
- **Metódico** - Organizado, gosta de rotina/regras

#### Scores (0-10):
- **Conforto Tech** - Nível de conforto com tecnologia
- **Maturidade IA** - Experiência com ferramentas de IA
- **LGPD/Risco** - Consciência sobre segurança e privacidade

#### Trilhas Recomendadas:
1. **Produtividade Clínica** - Ganhar tempo
2. **Laudos & Qualidade** - Melhorar qualidade
3. **Automação de Processos** - Automatizar tarefas
4. **Conteúdo & Autoridade** - Criar conteúdo
5. **Projeto Avançado** - Projetos complexos

#### Flags de Alerta:
- Baixa alfabetização digital
- Paralisia por opção / perfeccionismo
- Explorador infinito (dispersão)
- Agressivo com risco e fraco em LGPD
- Precisa de ritmo externo

#### Primeira Missão (7 dias):
Personalizada baseada no perfil principal

### 5. **Dashboard Admin**

- **Login:**
  - Email: `daniloaedo@gmail.com`
  - Senha: `Med#1213#3369`

- **Funcionalidades:**
  - Lista de todos os mentorados
  - Estatísticas (total, completos, em andamento, não iniciados)
  - Progresso de cada mentorado
  - Ver todas as respostas
  - Ver resultado completo com:
    - Perfil principal e secundário
    - Scores detalhados
    - Trilha recomendada
    - Flags de alerta
    - Primeira missão
    - Resultado completo formatado

### 6. **Banco de Dados PostgreSQL**

Tabelas criadas:
- **Admin** - Administradores
- **Student** - Mentorados
- **Answer** - Respostas
- **Result** - Resultados calculados

### 7. **Design Profissional**

Cores MediciNove:
- Fundo: #0F1115 (preto grafite)
- Cards: #1C1F26 (cinza grafite)
- Bordas: #2A2E37 (cinza médio)
- Texto: #FFFFFF (branco)
- Ação: #3A7AFE (azul tecnológico)
- Hover: #5C8CFF
- Erro: #E5533D

Responsivo:
- ✅ Mobile
- ✅ Tablet
- ✅ Desktop

## 📦 Repositório GitHub

**URL:** https://github.com/DACWB/medicinove-quiz

**Conteúdo:**
- ✅ Código completo
- ✅ README.md com documentação
- ✅ DEPLOY.md com guia de deploy
- ✅ Configuração Prisma
- ✅ Logo MediciNove

## 🚀 Como Fazer Deploy

Siga o guia completo em: `DEPLOY.md`

**Resumo:**
1. Criar projeto no Railway
2. Conectar repositório GitHub
3. Adicionar PostgreSQL
4. Configurar variáveis de ambiente
5. Gerar domínio
6. Aguardar deploy (3-5 min)

## 🔑 Credenciais

### Token de Acesso (Mentorados)
```
embarque10
```

### Admin Dashboard
```
Email: daniloaedo@gmail.com
Senha: Med#1213#3369
```

## 📊 Fluxo Completo

1. **Mentorado acessa** → https://quiz.medicinove.com.br
2. **Insere token** → embarque10
3. **Preenche identificação** → Nome, email, WhatsApp
4. **Responde quiz** → 44 perguntas (4 por página)
5. **Sistema calcula** → Perfil, scores, trilha, flags
6. **Admin visualiza** → Dashboard com todos os resultados

## 🎨 Componentes Criados

- Página inicial com token
- Formulário de identificação
- Sistema de quiz com navegação
- Barra de progresso
- Campos de diferentes tipos
- Página de agradecimento
- Login admin
- Dashboard admin
- Modal de resultado
- Tabela de mentorados
- Estatísticas

## 🔧 Tecnologias Utilizadas

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco de Dados:** PostgreSQL + Prisma
- **Deploy:** Railway
- **Versionamento:** Git + GitHub

## 📈 Próximos Passos

1. ✅ Fazer deploy no Railway
2. ✅ Configurar domínio quiz.medicinove.com.br
3. ✅ Testar sistema completo
4. ✅ Convidar mentorados para testar
5. ✅ Acompanhar resultados no dashboard

## 🎯 Resultado Final

Um sistema completo, profissional e funcional para:
- ✅ Coletar respostas dos mentorados
- ✅ Calcular perfis automaticamente
- ✅ Recomendar trilhas personalizadas
- ✅ Visualizar todos os dados no dashboard
- ✅ Tomar decisões baseadas em dados

---

**Desenvolvido para MediciNove**
**© 2026 - Todos os direitos reservados**
