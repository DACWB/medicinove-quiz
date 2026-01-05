import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { questions } from '@/lib/questions';

export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const studentId = params.studentId;

    // Buscar estudante e respostas
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        answers: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Estudante não encontrado' },
        { status: 404 }
      );
    }

    // Criar mapa de respostas
    const answersMap = new Map();
    student.answers.forEach(answer => {
      answersMap.set(answer.questionId, answer.answer);
    });

    // Gerar relatório em texto
    let report = '';
    report += '═══════════════════════════════════════════════════════════════\n';
    report += '           RELATÓRIO DE ONBOARDING SOAPIA - MEDICINOVE\n';
    report += '═══════════════════════════════════════════════════════════════\n\n';
    
    report += `DADOS DO ALUNO:\n`;
    report += `${'─'.repeat(65)}\n`;
    report += `Nome: ${student.name}\n`;
    report += `Email: ${student.email}\n`;
    report += `WhatsApp: ${student.whatsapp}\n`;
    report += `Data de cadastro: ${new Date(student.createdAt).toLocaleString('pt-BR')}\n`;
    report += `Status: ${student.completed ? 'Completo' : 'Em andamento'}\n`;
    if (student.completedAt) {
      report += `Data de conclusão: ${new Date(student.completedAt).toLocaleString('pt-BR')}\n`;
    }
    report += `\n\n`;

    // Filtrar perguntas baseado em condições
    const visibleQuestions = questions.filter(q => {
      if (!q.conditionalOn) return true;
      const parentAnswer = answersMap.get(q.conditionalOn.questionId);
      return parentAnswer === q.conditionalOn.value;
    });

    // Agrupar por seção
    let currentSection = '';
    visibleQuestions.forEach(question => {
      const answer = answersMap.get(question.id);
      
      // Mostrar cabeçalho da seção
      if (question.section !== currentSection) {
        currentSection = question.section;
        report += `\n${'═'.repeat(65)}\n`;
        report += `  ${currentSection.toUpperCase()}\n`;
        report += `${'═'.repeat(65)}\n\n`;
      }

      // Mostrar pergunta
      report += `${question.question}\n`;
      report += `${'-'.repeat(65)}\n`;

      // Mostrar resposta
      if (answer !== undefined && answer !== null && answer !== '') {
        if (Array.isArray(answer)) {
          // Múltipla escolha
          if (answer.length > 0) {
            answer.forEach(item => {
              report += `  • ${item}\n`;
            });
          } else {
            report += `  (Não respondido)\n`;
          }
        } else if (typeof answer === 'number') {
          // Slider
          report += `  ${answer}/10\n`;
        } else {
          // Texto ou escolha única
          report += `  ${answer}\n`;
        }
      } else {
        report += `  (Não respondido)\n`;
      }
      
      report += `\n`;
    });

    report += `\n${'═'.repeat(65)}\n`;
    report += `                    FIM DO RELATÓRIO\n`;
    report += `${'═'.repeat(65)}\n`;

    // Retornar como texto puro
    return new NextResponse(report, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="relatorio_${student.name.replace(/\s+/g, '_')}_${studentId}.txt"`
      }
    });
  } catch (error: any) {
    console.error('Erro ao gerar relatório:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar relatório' },
      { status: 500 }
    );
  }
}
