interface Answers {
  [key: number]: any;
}

interface Scores {
  executorScore: number;
  analistaScore: number;
  exploradorScore: number;
  metodicoScore: number;
  confortoTech: number;
  maturidadeIA: number;
  lgpdRisco: number;
}

interface Result {
  mainProfile: string;
  secondProfile: string | null;
  scores: Scores;
  trilha: number;
  trilhaName: string;
  flags: string[];
  primeiraMissao: string;
  resultadoCompleto: string;
}

export function calculateResult(answers: Answers): Result {
  const scores: Scores = {
    executorScore: 0,
    analistaScore: 0,
    exploradorScore: 0,
    metodicoScore: 0,
    confortoTech: 0,
    maturidadeIA: 0,
    lgpdRisco: 0
  };

  const flags: string[] = [];

  // Q11 (id 11) - Quando surge ferramenta nova
  if (answers[11] === 'Testar na hora') {
    scores.exploradorScore += 2;
  } else if (answers[11] === 'Esperar alguém filtrar e indicar') {
    scores.analistaScore += 1;
    scores.metodicoScore += 1;
  } else if (answers[11] === 'Evitar até "ser obrigatório"') {
    scores.metodicoScore += 2;
  } else if (answers[11] === 'Ficar ansioso/culpado por não acompanhar') {
    flags.push('Pressão por acompanhamento');
  }

  // Q12 (id 12) - Situação comum
  if (answers[12] === 'Eu fuço até dar certo') {
    scores.exploradorScore += 2;
  } else if (answers[12] === 'Eu preciso de passo a passo e checklist') {
    scores.metodicoScore += 2;
  } else if (answers[12] === 'Eu desanimo se dá erro técnico') {
    scores.metodicoScore += 1;
    scores.analistaScore += 1;
    flags.push('Baixa alfabetização digital');
  } else if (answers[12] === 'Eu começo empolgado e pulo para outra ferramenta') {
    scores.exploradorScore += 2;
    flags.push('Explorador infinito (dispersão)');
  } else if (answers[12] === 'Eu aprendo rápido, mas não mantenho rotina') {
    scores.executorScore += 1;
    scores.exploradorScore += 1;
    flags.push('Precisa de ritmo externo');
  }

  // Q14 (id 14) - Como aprende (múltipla)
  const aprendizagem = Array.isArray(answers[14]) ? answers[14] : [answers[14]];
  if (aprendizagem.includes('Exemplo pronto + eu copio e adapto')) {
    scores.executorScore += 2;
  }
  if (aprendizagem.includes('Passo a passo (receita)')) {
    scores.metodicoScore += 2;
  }
  if (aprendizagem.includes('Ao vivo "faz comigo"')) {
    scores.executorScore += 1;
    scores.exploradorScore += 1;
  }
  if (aprendizagem.includes('Teoria primeiro, depois prática')) {
    scores.analistaScore += 2;
  }
  if (aprendizagem.includes('Desafio prático + correção (feedback)')) {
    scores.analistaScore += 1;
    scores.executorScore += 1;
  }

  // Q15 (id 15) - Perfil de execução
  if (answers[15] === 'Ação rápida, gosto de decidir e tocar') {
    scores.executorScore += 2;
  } else if (answers[15] === 'Analítico, gosto de validar antes') {
    scores.analistaScore += 2;
  } else if (answers[15] === 'Comunicativo, aprendo em grupo/trocando ideias') {
    scores.exploradorScore += 1;
  } else if (answers[15] === 'Organizado, gosto de rotina/regras') {
    scores.metodicoScore += 2;
  }

  // Q36 (id 36) - Formato de cobrança
  if (answers[36]?.includes('Microtarefas semanais')) {
    scores.executorScore += 1;
    scores.metodicoScore += 1;
  } else if (answers[36]?.includes('1 tarefa maior por semana')) {
    scores.analistaScore += 1;
    scores.metodicoScore += 1;
  } else if (answers[36]?.includes('Sprint quinzenal')) {
    scores.analistaScore += 1;
    scores.exploradorScore += 1;
  } else if (answers[36]?.includes('Só ando com encontro ao vivo')) {
    scores.executorScore += 1;
    flags.push('Precisa de ritmo externo');
  } else if (answers[36]?.includes('Autonomia total')) {
    scores.analistaScore += 1;
  }

  // Calcular Conforto Tech (Q10)
  if (answers[10] === 'Bem confortável (atalhos, organização, aprendo rápido)') {
    scores.confortoTech = 10;
  } else if (answers[10] === 'Ok (uso bem, mas não gosto de "configurar")') {
    scores.confortoTech = 7;
  } else if (answers[10] === 'Básico (uso o necessário, travo com novidade)') {
    scores.confortoTech = 4;
    flags.push('Baixa alfabetização digital');
  } else if (answers[10] === 'Baixo (me estresso e evito tecnologia quando posso)') {
    scores.confortoTech = 1;
    flags.push('Baixa alfabetização digital');
  }

  // Q13 - Travas (cada uma diminui)
  const travas = Array.isArray(answers[13]) ? answers[13] : [answers[13]];
  scores.confortoTech -= travas.length;

  // Calcular Maturidade IA (Q25, Q26, Q28, Q29)
  const iasUsadas = Array.isArray(answers[25]) ? answers[25] : [answers[25]];
  if (iasUsadas.includes('Nenhuma')) {
    scores.maturidadeIA = 1;
  } else if (iasUsadas.length <= 2) {
    scores.maturidadeIA = 4;
  } else if (iasUsadas.length <= 4) {
    scores.maturidadeIA = 6;
  } else {
    scores.maturidadeIA = 8;
  }

  // Q26 - Paga IA
  if (answers[26]?.includes('Sim')) {
    scores.maturidadeIA += 2;
  }

  // Q28 - Nível de prompt
  if (answers[28] === 'Iniciante (perguntas simples)') {
    scores.maturidadeIA += 2;
  } else if (answers[28]?.includes('Intermediário')) {
    scores.maturidadeIA += 5;
  } else if (answers[28]?.includes('Avançado')) {
    scores.maturidadeIA += 9;
  } else if (answers[28]?.includes('Nem sei')) {
    scores.maturidadeIA = 0;
  }

  // Q29 - Fluxo
  if (answers[29] === 'Não, uso quando lembro') {
    scores.maturidadeIA += 0;
  } else if (answers[29]?.includes('1–2 usos fixos')) {
    scores.maturidadeIA += 3;
  } else if (answers[29]?.includes('fluxo claro')) {
    scores.maturidadeIA += 7;
  } else if (answers[29]?.includes('desenhar do zero')) {
    scores.maturidadeIA += 4;
  }

  // Limitar entre 0-10
  scores.maturidadeIA = Math.min(10, Math.max(0, scores.maturidadeIA));
  scores.confortoTech = Math.min(10, Math.max(0, scores.confortoTech));

  // Calcular LGPD/Risco (Q32, Q33)
  if (answers[32]?.includes('100% anonimizados')) {
    scores.lgpdRisco = 9;
  } else if (answers[32]?.includes('ambiente controlado')) {
    scores.lgpdRisco = 8;
  } else if (answers[32]?.includes('não sei')) {
    scores.lgpdRisco = 5;
  } else if (answers[32]?.includes('não mexer')) {
    scores.lgpdRisco = 3;
  }

  // Q33 - Apetite a risco
  if (answers[33] === 'Conservador (básico, super seguro)') {
    scores.lgpdRisco += 1;
  } else if (answers[33] === 'Agressivo (implementar rápido)') {
    if (scores.lgpdRisco < 6) {
      flags.push('Agressivo com risco e fraco em LGPD');
    }
  }

  // Determinar perfil principal
  const profileScores = [
    { name: 'Executor', score: scores.executorScore },
    { name: 'Analista', score: scores.analistaScore },
    { name: 'Explorador', score: scores.exploradorScore },
    { name: 'Metódico', score: scores.metodicoScore }
  ].sort((a, b) => b.score - a.score);

  const mainProfile = profileScores[0].name;
  const secondProfile = profileScores[1].score > 0 ? profileScores[1].name : null;

  // Determinar trilha (Q30)
  let trilha = 1;
  let trilhaName = 'Produtividade Clínica';

  if (answers[30]?.includes('Ganhar tempo')) {
    trilha = 1;
    trilhaName = 'Produtividade Clínica';
  } else if (answers[30]?.includes('qualidade de laudos')) {
    trilha = 2;
    trilhaName = 'Laudos & Qualidade';
  } else if (answers[30]?.includes('Automatizar processos')) {
    trilha = 3;
    trilhaName = 'Automação de Processos';
  } else if (answers[30]?.includes('conteúdo médico')) {
    trilha = 4;
    trilhaName = 'Conteúdo & Autoridade';
  } else if (answers[30]?.includes('projeto avançado')) {
    trilha = 5;
    trilhaName = 'Projeto Avançado';
  }

  // Gerar primeira missão baseada no perfil
  let primeiraMissao = '';
  if (mainProfile === 'Executor') {
    primeiraMissao = 'Nos próximos 7 dias: criar 3 templates prontos para copiar/colar (orientação, laudo, mensagem). Tempo estimado: 20 min cada.';
  } else if (mainProfile === 'Analista') {
    primeiraMissao = 'Nos próximos 7 dias: validar 1 template de laudo com checklist de segurança e limites. Documentar o processo.';
  } else if (mainProfile === 'Explorador') {
    primeiraMissao = 'Nos próximos 7 dias: escolher 1 ferramenta de IA e transformar em artefato útil (template ou SOP). Não pular para outra ferramenta.';
  } else {
    primeiraMissao = 'Nos próximos 7 dias: organizar biblioteca de templates com nomenclatura clara e criar SOP de uso.';
  }

  // Gerar resultado completo
  const resultadoCompleto = `
PERFIL PRINCIPAL: ${mainProfile}
PERFIL SECUNDÁRIO: ${secondProfile || 'Não identificado'}

SCORES:
- Conforto Tech: ${scores.confortoTech}/10
- Maturidade IA: ${scores.maturidadeIA}/10
- LGPD/Risco: ${scores.lgpdRisco}/10

TRILHA RECOMENDADA: ${trilhaName}

FLAGS DE ALERTA:
${flags.length > 0 ? flags.map(f => `- ${f}`).join('\n') : '- Nenhuma flag crítica'}

PRIMEIRA MISSÃO (7 DIAS):
${primeiraMissao}

PONTUAÇÃO DOS PERFIS:
- Executor: ${scores.executorScore}
- Analista: ${scores.analistaScore}
- Explorador: ${scores.exploradorScore}
- Metódico: ${scores.metodicoScore}
  `.trim();

  return {
    mainProfile,
    secondProfile,
    scores,
    trilha,
    trilhaName,
    flags,
    primeiraMissao,
    resultadoCompleto
  };
}
