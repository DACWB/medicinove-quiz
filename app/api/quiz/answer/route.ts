import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { studentId, questionId, answer } = await request.json();

    // Salvar ou atualizar resposta
    const savedAnswer = await prisma.answer.upsert({
      where: {
        studentId_questionId: {
          studentId,
          questionId
        }
      },
      update: {
        answer: JSON.stringify(answer)
      },
      create: {
        studentId,
        questionId,
        answer: JSON.stringify(answer)
      }
    });

    // Atualizar progresso do estudante
    await prisma.student.update({
      where: { id: studentId },
      data: { progress: questionId }
    });

    return NextResponse.json({ success: true, answer: savedAnswer });
  } catch (error: any) {
    console.error('Erro ao salvar resposta:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar resposta' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { error: 'StudentId não fornecido' },
        { status: 400 }
      );
    }

    const answers = await prisma.answer.findMany({
      where: { studentId },
      orderBy: { questionId: 'asc' }
    });

    // Converter respostas de JSON string para objeto
    const parsedAnswers = answers.reduce((acc, ans) => {
      acc[ans.questionId] = JSON.parse(ans.answer);
      return acc;
    }, {} as Record<number, any>);

    return NextResponse.json({ answers: parsedAnswers });
  } catch (error: any) {
    console.error('Erro ao buscar respostas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar respostas' },
      { status: 500 }
    );
  }
}
