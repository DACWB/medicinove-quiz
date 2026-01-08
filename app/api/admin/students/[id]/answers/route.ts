import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');
    
    if (!adminSession?.value) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const studentId = params.id;

    // Buscar respostas do estudante
    const answers = await prisma.answer.findMany({
      where: {
        studentId: studentId
      },
      orderBy: {
        questionId: 'asc'
      }
    });

    return NextResponse.json({
      answers: answers.map(a => ({
        questionId: a.questionId,
        answer: a.answer
      }))
    });

  } catch (error) {
    console.error('Erro ao buscar respostas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar respostas' },
      { status: 500 }
    );
  }
}
