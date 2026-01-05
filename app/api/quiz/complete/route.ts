import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateResult } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const { studentId } = await request.json();

    // Buscar todas as respostas
    const answers = await prisma.answer.findMany({
      where: { studentId },
      orderBy: { questionId: 'asc' }
    });

    // Converter para formato esperado
    const answersMap = answers.reduce((acc, ans) => {
      acc[ans.questionId] = JSON.parse(ans.answer);
      return acc;
    }, {} as Record<number, any>);

    // Calcular resultado
    const result = calculateResult(answersMap);

    // Salvar resultado no banco
    const savedResult = await prisma.result.upsert({
      where: { studentId },
      update: {
        executorScore: result.scores.executorScore,
        analistaScore: result.scores.analistaScore,
        exploradorScore: result.scores.exploradorScore,
        metodicoScore: result.scores.metodicoScore,
        mainProfile: result.mainProfile,
        secondProfile: result.secondProfile,
        confortoTech: result.scores.confortoTech,
        maturidadeIA: result.scores.maturidadeIA,
        lgpdRisco: result.scores.lgpdRisco,
        trilha: result.trilha,
        trilhaName: result.trilhaName,
        flags: JSON.stringify(result.flags),
        primeiraMissao: result.primeiraMissao,
        resultadoCompleto: result.resultadoCompleto
      },
      create: {
        studentId,
        executorScore: result.scores.executorScore,
        analistaScore: result.scores.analistaScore,
        exploradorScore: result.scores.exploradorScore,
        metodicoScore: result.scores.metodicoScore,
        mainProfile: result.mainProfile,
        secondProfile: result.secondProfile,
        confortoTech: result.scores.confortoTech,
        maturidadeIA: result.scores.maturidadeIA,
        lgpdRisco: result.scores.lgpdRisco,
        trilha: result.trilha,
        trilhaName: result.trilhaName,
        flags: JSON.stringify(result.flags),
        primeiraMissao: result.primeiraMissao,
        resultadoCompleto: result.resultadoCompleto
      }
    });

    // Marcar estudante como completo
    await prisma.student.update({
      where: { id: studentId },
      data: { completed: true }
    });

    return NextResponse.json({ success: true, result: savedResult });
  } catch (error: any) {
    console.error('Erro ao finalizar quiz:', error);
    return NextResponse.json(
      { error: 'Erro ao processar resultado' },
      { status: 500 }
    );
  }
}
