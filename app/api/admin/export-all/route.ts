import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

const ADMIN_EMAIL = 'daniloaedo@gmail.com';
const ADMIN_PASSWORD = 'Med#1213#3369';

const questions = [
  // LGPD
  { id: 1, section: "TERMO DE PRIVACIDADE E LGPD", question: "Consentimento para uso dos seus dados na mentoria (obrigatório)", type: "radio" },
  { id: 2, section: "TERMO DE PRIVACIDADE E LGPD", question: "Canal preferido para comunicações essenciais da mentoria", type: "checkbox" },
  
  // IDENTIFICAÇÃO
  { id: 3, section: "IDENTIFICAÇÃO", question: "Nome completo", type: "text" },
  { id: 4, section: "IDENTIFICAÇÃO", question: "E-mail principal", type: "email" },
  { id: 5, section: "IDENTIFICAÇÃO", question: "WhatsApp (com DDD)", type: "tel" },
  { id: 6, section: "IDENTIFICAÇÃO", question: "Especialidade principal", type: "select" },
  { id: 7, section: "IDENTIFICAÇÃO", question: "Qual especialidade?", type: "text", conditionalOn: { questionId: 6, value: "Outra" } },
  { id: 8, section: "IDENTIFICAÇÃO", question: "Cidade/Estado onde atende", type: "text" },
  { id: 9, section: "IDENTIFICAÇÃO", question: "Quantos pacientes você atende por mês (média)?", type: "select" },
  { id: 10, section: "IDENTIFICAÇÃO", question: "Tamanho da equipe (incluindo você)", type: "select" },
  
  // S - SUBJETIVO
  { id: 11, section: "S — SUBJETIVO", question: "O que te fez entrar na mentoria agora?", type: "checkbox" },
  { id: 12, section: "S — SUBJETIVO", question: "Qual é o seu maior desafio hoje na gestão da clínica/consultório?", type: "textarea" },
  { id: 13, section: "S — SUBJETIVO", question: "Se pudesse resolver um problema com IA amanhã, qual seria?", type: "textarea" },
  
  // O - OBJETIVO
  { id: 14, section: "O — OBJETIVO", question: "Você já usa alguma ferramenta de IA no dia a dia?", type: "radio" },
  { id: 15, section: "O — OBJETIVO", question: "Você paga por alguma IA?", type: "radio" },
  { id: 16, section: "O — OBJETIVO", question: "Qual IA você paga?", type: "text", conditionalOn: { questionId: 15, value: "Sim" } },
  { id: 17, section: "O — OBJETIVO", question: "Por que você paga essa IA?", type: "textarea", conditionalOn: { questionId: 15, value: "Sim" } },
  { id: 18, section: "O — OBJETIVO", question: "Você tem um sistema de gestão (prontuário, agenda, financeiro)?", type: "radio" },
  { id: 19, section: "O — OBJETIVO", question: "Qual sistema você usa?", type: "text" },
  { id: 20, section: "O — OBJETIVO", question: "Você coleta dados dos pacientes de forma estruturada (formulários, anamnese digital, etc.)?", type: "radio" },
  
  // A - AVALIAÇÃO
  { id: 21, section: "A — AVALIAÇÃO", question: "Conforto com tecnologia (0 = travado, 10 = fluente)", type: "slider" },
  { id: 22, section: "A — AVALIAÇÃO", question: "Maturidade com IA (0 = nunca usei, 10 = uso todo dia)", type: "slider" },
  { id: 23, section: "A — AVALIAÇÃO", question: "Você já leu ou assinou algum termo de consentimento para uso de IA com dados de pacientes?", type: "radio" },
  { id: 24, section: "A — AVALIAÇÃO", question: "Você sabe o que é a LGPD e como ela se aplica ao uso de IA na saúde?", type: "radio" },
  { id: 25, section: "A — AVALIAÇÃO", question: "Marque as frases que fazem sentido para você", type: "checkbox" },
  
  // P - PLANO
  { id: 26, section: "P — PLANO", question: "Qual é a sua meta principal com IA nos próximos 90 dias?", type: "textarea" },
  { id: 27, section: "P — PLANO", question: "Quanto tempo por semana você consegue dedicar para aprender e implementar IA?", type: "select" },
  { id: 28, section: "P — PLANO", question: "Como você quer ser lembrado?", type: "select" },
  { id: 29, section: "P — PLANO", question: "Você prefere aprender:", type: "checkbox" },
  { id: 30, section: "P — PLANO", question: "Você tem alguém na equipe que poderia te ajudar a implementar IA?", type: "radio" },
  
  // IA - INTELIGÊNCIA ARTIFICIAL
  { id: 31, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "Você já tentou usar IA antes e não deu certo?", type: "radio" },
  { id: 32, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "O que aconteceu?", type: "textarea" },
  { id: 33, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "Você tem medo ou receio de usar IA na medicina?", type: "radio" },
  { id: 34, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "Qual é o seu maior medo?", type: "textarea" },
  { id: 35, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "Você acredita que IA pode te ajudar a:", type: "checkbox" },
  { id: 36, section: "IA — INTELIGÊNCIA ARTIFICIAL", question: "Se você pudesse pedir uma coisa para a mentoria, o que seria?", type: "textarea" },
  
  // TRILHA DE IA
  { id: 37, section: "TRILHA DE IA", question: "Pense um pouco e lembre de algo que você fala ou repete repetidas vezes para a equipe ou para os pacientes? Escreva abaixo:", type: "textarea" }
];

export async function GET(request: Request) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== `${ADMIN_EMAIL}:${ADMIN_PASSWORD}`) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    // Buscar todos os alunos com respostas
    const students = await prisma.student.findMany({
      include: {
        answers: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    let fullReport = '';
    fullReport += '═══════════════════════════════════════════════════════════════\n';
    fullReport += '     RELATÓRIO COMPLETO DE RESPOSTAS - MEDICINOVE SOAPIA\n';
    fullReport += '═══════════════════════════════════════════════════════════════\n\n';
    fullReport += `Total de mentorados: ${students.length}\n`;
    fullReport += `Data de exportação: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n`;

    for (const student of students) {
      fullReport += '\n\n';
      fullReport += '═══════════════════════════════════════════════════════════════\n';
      fullReport += `  MENTORADO: ${student.name.toUpperCase()}\n`;
      fullReport += '═══════════════════════════════════════════════════════════════\n\n';
      
      fullReport += 'DADOS DO ALUNO:\n';
      fullReport += '─────────────────────────────────────────────────────────────\n';
      fullReport += `Nome: ${student.name}\n`;
      fullReport += `Email: ${student.email}\n`;
      fullReport += `WhatsApp: ${student.whatsapp}\n`;
      fullReport += `Data de cadastro: ${new Date(student.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n`;
      fullReport += `Status: ${student.completed ? 'Completo' : 'Em andamento'}\n`;
      fullReport += `Respostas: ${student.answers.length}/44\n\n`;

      // Criar mapa de respostas
      const answersMap = new Map();
      student.answers.forEach(answer => {
        answersMap.set(answer.questionId, answer.answer);
      });

      // Agrupar por seção
      const sections: Record<string, any[]> = {};
      questions.forEach(q => {
        if (!sections[q.section]) {
          sections[q.section] = [];
        }
        
        // Verificar condição
        if ('conditionalOn' in q && q.conditionalOn) {
          const parentAnswer = answersMap.get(q.conditionalOn.questionId);
          if (parentAnswer !== q.conditionalOn.value) {
            return; // Pula pergunta condicional
          }
        }
        
        sections[q.section].push({
          question: q.question,
          answer: answersMap.get(q.id),
          type: q.type
        });
      });

      // Escrever seções
      for (const [sectionName, sectionQuestions] of Object.entries(sections)) {
        fullReport += '═══════════════════════════════════════════════════════════════\n';
        fullReport += `  ${sectionName}\n`;
        fullReport += '═══════════════════════════════════════════════════════════════\n\n';

        for (const item of sectionQuestions) {
          fullReport += `${item.question}\n`;
          fullReport += '─────────────────────────────────────────────────────────────\n';
          
          let answer = item.answer;
          
          if (answer === undefined || answer === null || answer === '') {
            fullReport += '  (Não respondido)\n\n';
            continue;
          }

          // Tentar parsear JSON
          try {
            const parsed = JSON.parse(answer);
            if (Array.isArray(parsed)) {
              if (parsed.length === 0) {
                fullReport += '  (Não respondido)\n\n';
              } else {
                parsed.forEach(item => {
                  fullReport += `  • ${item}\n`;
                });
                fullReport += '\n';
              }
              continue;
            }
          } catch (e) {
            // Não é JSON, continua como string
          }

          fullReport += `  ${answer}\n\n`;
        }
      }
    }

    fullReport += '\n\n';
    fullReport += '═══════════════════════════════════════════════════════════════\n';
    fullReport += '                    FIM DO RELATÓRIO\n';
    fullReport += '═══════════════════════════════════════════════════════════════\n';

    // Retornar como download
    return new NextResponse(fullReport, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="relatorio-completo-${Date.now()}.txt"`,
      },
    });
  } catch (error) {
    console.error('Erro ao exportar respostas:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar respostas' },
      { status: 500 }
    );
  }
}
