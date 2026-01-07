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

    // Filtrar perguntas baseado em condições
    const visibleQuestions = questions.filter(q => {
      if (!q.conditionalOn) return true;
      const parentAnswer = answersMap.get(q.conditionalOn.questionId);
      return parentAnswer === q.conditionalOn.value;
    });

    // Formatar respostas por seção
    const sections: any[] = [];
    let currentSection = '';
    let currentQuestions: any[] = [];

    visibleQuestions.forEach(question => {
      const answer = answersMap.get(question.id);
      
      // Nova seção
      if (question.section !== currentSection) {
        if (currentSection !== '') {
          sections.push({
            section: currentSection,
            questions: currentQuestions
          });
        }
        currentSection = question.section;
        currentQuestions = [];
      }

      // Adicionar pergunta e resposta
      currentQuestions.push({
        id: question.id,
        question: question.question,
        type: question.type,
        answer: answer,
        required: question.required
      });
    });

    // Adicionar última seção
    if (currentQuestions.length > 0) {
      sections.push({
        section: currentSection,
        questions: currentQuestions
      });
    }

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        whatsapp: student.whatsapp,
        createdAt: student.createdAt,
        completed: student.completed
      },
      sections
    });
  } catch (error: any) {
    console.error('Erro ao buscar respostas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar respostas' },
      { status: 500 }
    );
  }
}
