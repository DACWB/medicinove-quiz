export interface Question {
  id: number;
  section: string;
  question: string;
  type: 'single' | 'multiple' | 'text' | 'textarea' | 'slider';
  options?: string[];
  maxSelections?: number;
  required: boolean;
}

export const questions: Question[] = [
  // LGPD e Termo de Privacidade
  {
    id: 1,
    section: 'Termo de Privacidade e LGPD',
    question: 'Consentimento para uso dos seus dados na mentoria (obrigatório)',
    type: 'single',
    options: [
      'Sim, autorizo o tratamento dos meus dados (nome, contato e respostas) para gestão da mentoria',
      'Não autorizo (sem isso não consigo seguir com a mentoria)'
    ],
    required: true
  },
  {
    id: 2,
    section: 'Termo de Privacidade e LGPD',
    question: 'Canal preferido para comunicações essenciais da mentoria (obrigatório)',
    type: 'single',
    options: ['WhatsApp', 'E-mail'],
    required: true
  },
  {
    id: 3,
    section: 'Termo de Privacidade e LGPD',
    question: 'Conteúdos e avisos extras da Medicinove (opcional)',
    type: 'single',
    options: [
      'Sim, quero receber conteúdos, avisos e convites (aulas, lives, materiais)',
      'Não, apenas comunicações essenciais da mentoria'
    ],
    required: false
  },
  {
    id: 4,
    section: 'Termo de Privacidade e LGPD',
    question: 'Uso anonimizado para melhoria da mentoria (opcional)',
    type: 'single',
    options: [
      'Sim, você pode usar minhas respostas sem identificação para melhorar materiais',
      'Não'
    ],
    required: false
  },

  // Identificação
  {
    id: 5,
    section: 'Identificação',
    question: 'Cidade/Estado',
    type: 'text',
    required: true
  },
  {
    id: 6,
    section: 'Identificação',
    question: 'Especialidade principal',
    type: 'single',
    options: [
      'Clínica Médica',
      'Cardiologia',
      'Ortopedia',
      'Ginecologia/Obstetrícia',
      'Dermatologia',
      'Oftalmologia',
      'Psiquiatria',
      'Pediatria',
      'Cirurgia',
      'Radiologia',
      'Outra'
    ],
    required: true
  },
  {
    id: 7,
    section: 'Identificação',
    question: 'Seu cenário hoje',
    type: 'single',
    options: [
      'Consultório próprio',
      'Clínica/hospital (sem consultório próprio)',
      'Consultório + clínica/hospital',
      'Plantões/urgência',
      'Misto'
    ],
    required: true
  },

  // S — Subjetivo
  {
    id: 8,
    section: 'S — Subjetivo',
    question: 'Quando você pensa em IA na medicina, qual frase mais te representa hoje?',
    type: 'single',
    options: [
      'Se eu não aprender agora, vou ficar pra trás',
      'Eu sei que é importante, mas parece confuso',
      'Já uso um pouco, mas sinto que estou "brincando" e não implementando',
      'Quero automatizar meu consultório de verdade',
      'Quero levar isso para um projeto maior (produto, pesquisa, ensino)'
    ],
    required: true
  },
  {
    id: 9,
    section: 'S — Subjetivo',
    question: 'O que te fez entrar na mentoria agora (gatilho real)?',
    type: 'single',
    options: [
      'Falta de tempo/sobrecarga',
      'Quero padronizar consultório e equipe',
      'Quero produzir conteúdo com consistência',
      'Quero criar um projeto/app/agente',
      'Quero melhorar qualidade e segurança de decisões',
      'Vi colegas usando e fiquei para trás',
      'Outro'
    ],
    required: true
  },
  {
    id: 10,
    section: 'S — Subjetivo',
    question: 'Seu nível de conforto com computador/tecnologia no dia a dia',
    type: 'single',
    options: [
      'Bem confortável (atalhos, organização, aprendo rápido)',
      'Ok (uso bem, mas não gosto de "configurar")',
      'Básico (uso o necessário, travo com novidade)',
      'Baixo (me estresso e evito tecnologia quando posso)'
    ],
    required: true
  },
  {
    id: 11,
    section: 'S — Subjetivo',
    question: 'Quando surge ferramenta nova, você tende a…',
    type: 'single',
    options: [
      'Testar na hora',
      'Esperar alguém filtrar e indicar',
      'Evitar até "ser obrigatório"',
      'Ficar ansioso/culpado por não acompanhar'
    ],
    required: true
  },
  {
    id: 12,
    section: 'S — Subjetivo',
    question: 'Qual dessas situações mais acontece com você?',
    type: 'single',
    options: [
      'Eu fuço até dar certo',
      'Eu preciso de passo a passo e checklist',
      'Eu desanimo se dá erro técnico',
      'Eu começo empolgado e pulo para outra ferramenta',
      'Eu aprendo rápido, mas não mantenho rotina'
    ],
    required: true
  },
  {
    id: 13,
    section: 'S — Subjetivo',
    question: 'O que mais te trava em tecnologia? (escolha até 2)',
    type: 'multiple',
    options: [
      'Medo de errar e perder tempo',
      'Medo de bagunçar arquivos/configurações',
      'Falta de organização (arquivos, senhas, links)',
      'Dificuldade em manter consistência',
      'Excesso de opções (paralisia)',
      'Inglês/termos técnicos',
      'Outro'
    ],
    maxSelections: 2,
    required: true
  },
  {
    id: 14,
    section: 'S — Subjetivo',
    question: 'Como você aprende melhor? (escolha até 2)',
    type: 'multiple',
    options: [
      'Exemplo pronto + eu copio e adapto',
      'Passo a passo (receita)',
      'Ao vivo "faz comigo"',
      'Teoria primeiro, depois prática',
      'Desafio prático + correção (feedback)'
    ],
    maxSelections: 2,
    required: true
  },
  {
    id: 15,
    section: 'S — Subjetivo',
    question: 'Perfil de execução: qual combina mais com você?',
    type: 'single',
    options: [
      'Ação rápida, gosto de decidir e tocar',
      'Analítico, gosto de validar antes',
      'Comunicativo, aprendo em grupo/trocando ideias',
      'Organizado, gosto de rotina/regras',
      'Um pouco de cada'
    ],
    required: true
  },
  {
    id: 16,
    section: 'S — Subjetivo',
    question: 'Suas 3 maiores dores HOJE (escolha até 3)',
    type: 'multiple',
    options: [
      'Falta de tempo/sobrecarga',
      'Tarefas repetitivas (textos, laudos, orientações)',
      'Documentação/prontuário toma tempo demais',
      'Dificuldade em organizar rotina e equipe',
      'Medo de errar com IA / segurança clínica',
      'Dúvida sobre LGPD/privacidade',
      'Não sei por onde começar',
      'Já comecei, mas não mantenho consistência',
      'Outro'
    ],
    maxSelections: 3,
    required: true
  },
  {
    id: 17,
    section: 'S — Subjetivo',
    question: 'De 0 a 10, quão confiante você se sente usando IA HOJE?',
    type: 'slider',
    required: true
  },
  {
    id: 18,
    section: 'S — Subjetivo',
    question: 'Daqui 1 ano, o que te deixaria satisfeito em estar fazendo com IA após a mentoria?',
    type: 'textarea',
    required: true
  },

  // O — Objetivo
  {
    id: 19,
    section: 'O — Objetivo',
    question: 'Em média, quantos pacientes você atende por dia?',
    type: 'single',
    options: ['0–10', '11–20', '21–30', '31+'],
    required: true
  },
  {
    id: 20,
    section: 'O — Objetivo',
    question: 'Quais tarefas mais consomem seu tempo? (escolha até 5)',
    type: 'multiple',
    options: [
      'Anamnese/documentação/prontuário',
      'Laudos (exames, imagens, procedimentos)',
      'Orientações pré/pós-procedimento',
      'Encaminhamentos/cartas/relatórios',
      'Mensagens repetidas no WhatsApp (pacientes/equipe)',
      'Agenda/faltas/confirmações',
      'Marketing/produção de conteúdo',
      'Treinar equipe/processos',
      'Financeiro/administrativo',
      'Outro'
    ],
    maxSelections: 5,
    required: true
  },
  {
    id: 21,
    section: 'O — Objetivo',
    question: 'Qual prontuário/sistema você usa no dia a dia?',
    type: 'single',
    options: [
      'iClinic',
      'Feegow',
      'MV / Tasy / hospitalar',
      'Sistema próprio/Outro',
      'Papel/Word/"me viro"',
      'Prefiro não dizer',
      'Clinicorp',
      'Stenci'
    ],
    required: true
  },
  {
    id: 22,
    section: 'O — Objetivo',
    question: 'Seu equipamento principal de trabalho',
    type: 'single',
    options: ['Windows', 'Mac', 'Ambos', 'Tablet principal', 'Celular principal'],
    required: true
  },
  {
    id: 23,
    section: 'O — Objetivo',
    question: 'Seu celular principal',
    type: 'single',
    options: ['Android', 'Apple', 'Ambos'],
    required: true
  },
  {
    id: 24,
    section: 'O — Objetivo',
    question: 'Você tem equipe/secretária hoje?',
    type: 'single',
    options: ['Sim (1 pessoa)', 'Sim (2+)', 'Não'],
    required: true
  },
  {
    id: 25,
    section: 'O — Objetivo',
    question: 'Quais IAs você já usa hoje?',
    type: 'multiple',
    options: [
      'ChatGPT',
      'Claude',
      'Gemini',
      'Perplexity',
      'Copilot',
      'Voz (Whisper/Dragon)',
      'Imagem (DALL·E/Midjourney)',
      'Nenhuma',
      'Outras'
    ],
    required: true
  },
  {
    id: 26,
    section: 'O — Objetivo',
    question: 'Você paga alguma IA hoje?',
    type: 'single',
    options: ['Sim (qual e por quê?)', 'Não', 'Já paguei e parei'],
    required: true
  },
  {
    id: 27,
    section: 'O — Objetivo',
    question: 'Você já tem biblioteca de templates (laudos/orientações/mensagens)?',
    type: 'single',
    options: ['Sim, bem organizada', 'Sim, mas bagunçada', 'Não'],
    required: true
  },

  // A — Análise
  {
    id: 28,
    section: 'A — Análise',
    question: 'Seu nível prático com prompts hoje',
    type: 'single',
    options: [
      'Iniciante (perguntas simples)',
      'Intermediário (estrutura, sem método fixo)',
      'Intermediário+ (refino iterativo / prompt reverso)',
      'Avançado (frameworks e consistência)',
      'Nem sei o que é prompt direito'
    ],
    required: true
  },
  {
    id: 29,
    section: 'A — Análise',
    question: 'Você tem um fluxo de uso de IA no consultório?',
    type: 'single',
    options: [
      'Não, uso quando lembro',
      'Tenho 1–2 usos fixos',
      'Tenho fluxo claro (pré/consulta/pós)',
      'Quero desenhar do zero'
    ],
    required: true
  },
  {
    id: 30,
    section: 'A — Análise',
    question: 'Qual prioridade ganha nos próximos 30 dias?',
    type: 'single',
    options: [
      'Ganhar tempo (produtividade)',
      'Melhorar qualidade de laudos/relatórios',
      'Melhorar comunicação com paciente',
      'Automatizar processos (agenda/triagem/mensagens)',
      'Criar conteúdo médico com menos esforço',
      'Montar projeto avançado (agente/base de conhecimento/etc.)'
    ],
    required: true
  },
  {
    id: 31,
    section: 'A — Análise',
    question: 'Quanto tempo real por semana você consegue dedicar?',
    type: 'single',
    options: ['30–60 min', '1–2 h', '2–4 h', '4+ h', 'Depende'],
    required: true
  },
  {
    id: 32,
    section: 'A — Análise',
    question: 'LGPD e segurança: o que você topa fazer na prática?',
    type: 'single',
    options: [
      'Só usar IA com dados 100% anonimizados',
      'Dados sensíveis apenas em ferramentas aprovadas/ambiente controlado',
      'Ainda não sei — preciso de regras claras',
      'Prefiro não mexer com isso (por enquanto)'
    ],
    required: true
  },
  {
    id: 33,
    section: 'A — Análise',
    question: 'Apetite a risco com tecnologia no consultório',
    type: 'single',
    options: [
      'Conservador (básico, super seguro)',
      'Moderado (testo com cautela)',
      'Agressivo (implementar rápido)'
    ],
    required: true
  },

  // P — Plano
  {
    id: 34,
    section: 'P — Plano',
    question: 'Escolha 2 resultados concretos para atingir em 30 dias (escolha 2)',
    type: 'multiple',
    options: [
      'Kit de prompts da minha especialidade',
      'Modelo de laudo/orientação padronizado com IA',
      'Fluxo pré-consulta + resumo automático',
      'SOP de mensagens para secretária/WhatsApp',
      'Checklist de consulta com IA',
      'Mini-bot de triagem/orientação (sem riscos)',
      'Rotina semanal de conteúdo (1 post/semana)',
      'Outra meta'
    ],
    maxSelections: 2,
    required: true
  },
  {
    id: 35,
    section: 'P — Plano',
    question: 'Quais áreas da jornada você quer atacar primeiro? (escolha até 3)',
    type: 'multiple',
    options: [
      'Pré-consulta',
      'Consulta',
      'Exames-laudos',
      'Procedimentos',
      'Pós-consulta',
      'Gestão-equipe',
      'Marketing ético'
    ],
    maxSelections: 3,
    required: true
  },
  {
    id: 36,
    section: 'P — Plano',
    question: 'Formato de cobrança que mais funciona pra você',
    type: 'single',
    options: [
      'Microtarefas semanais (15–30 min)',
      '1 tarefa maior por semana',
      'Sprint quinzenal',
      'Só ando com encontro ao vivo me puxando',
      'Autonomia total + suporte quando pedir'
    ],
    required: true
  },
  {
    id: 37,
    section: 'P — Plano',
    question: 'Como você quer ser lembrado/cobrado?',
    type: 'single',
    options: ['WhatsApp', 'Grupo', 'E-mail', 'Checklist Notion', '"Não me cobre"'],
    required: true
  },

  // IA — Implementação
  {
    id: 38,
    section: 'IA — Implementação',
    question: 'Cenário: você precisa explicar doença/procedimento ao paciente de forma simples e humana. Qual prompt é melhor?',
    type: 'single',
    options: [
      'A) Não sei o que é prompt',
      'B) Explique doença/procedimento de forma simples',
      'C) Você é um médico. Explique doença/procedimento',
      'D) Você é meu assistente médico. Explique para paciente de 62 anos, ansioso, baixa escolaridade. Use analogias, evite termos técnicos, liste 3 sinais de alerta e finalize com próximos passos',
      'E) Texto curto para Instagram',
      'F) Explique considerando contexto cultural/local'
    ],
    required: true
  },
  {
    id: 39,
    section: 'IA — Implementação',
    question: 'Quando a IA te dá uma resposta muito confiante, o que você faz?',
    type: 'single',
    options: [
      'Copio e uso',
      'Reviso por cima e uso',
      'Peço limites/fontes e comparo com diretriz',
      'Testo consistência com outro cenário',
      'Evito usar em área clínica'
    ],
    required: true
  },
  {
    id: 40,
    section: 'IA — Implementação',
    question: 'Escreva 1 tarefa real que você faria amanhã se estivesse "expert" em IA',
    type: 'textarea',
    required: true
  },

  // Fechamento
  {
    id: 41,
    section: 'Fechamento',
    question: 'O que faria você considerar a mentoria um fracasso?',
    type: 'textarea',
    required: true
  },
  {
    id: 42,
    section: 'Fechamento',
    question: 'O que faria você considerar a mentoria um sucesso?',
    type: 'textarea',
    required: true
  },

  // Bônus opcional
  {
    id: 43,
    section: 'Bônus opcional',
    question: 'Cole 1–2 exemplos (anonimizados) de algo repetitivo que você escreve/fala',
    type: 'textarea',
    required: false
  },
  {
    id: 44,
    section: 'Bônus opcional',
    question: 'Topa participar de um antes/depois (anonimizado) para medir resultado?',
    type: 'single',
    options: ['Sim', 'Talvez', 'Não'],
    required: false
  }
];
