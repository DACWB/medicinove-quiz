import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todos os estudantes com respostas e resultados
    const students = await prisma.student.findMany({
      include: {
        answers: {
          orderBy: { questionId: 'asc' }
        },
        result: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Formatar dados
    const formattedStudents = students.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      whatsapp: student.whatsapp,
      progress: student.progress,
      completed: student.completed,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      answersCount: student.answers.length,
      hasResult: !!student.result,
      result: student.result ? {
        mainProfile: student.result.mainProfile,
        secondProfile: student.result.secondProfile,
        trilhaName: student.result.trilhaName,
        confortoTech: student.result.confortoTech,
        maturidadeIA: student.result.maturidadeIA,
        lgpdRisco: student.result.lgpdRisco,
        flags: JSON.parse(student.result.flags),
        primeiraMissao: student.result.primeiraMissao,
        resultadoCompleto: student.result.resultadoCompleto
      } : null
    }));

    return NextResponse.json({ students: formattedStudents });
  } catch (error: any) {
    console.error('Erro ao buscar estudantes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}
