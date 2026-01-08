import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        answers: true
      }
    });

    let txt = `RELATÓRIO COMPLETO - ${new Date().toLocaleString('pt-BR')}\n\n`;
    txt += `Total de alunos: ${students.length}\n\n`;
    txt += '='.repeat(80) + '\n\n';

    for (const student of students) {
      txt += `ALUNO: ${student.name}\n`;
      txt += `Email: ${student.email}\n`;
      txt += `WhatsApp: ${student.whatsapp}\n`;
      txt += `Respostas: ${student.answers.length}\n\n`;
      
      student.answers.forEach((answer, i) => {
        txt += `${i + 1}. Pergunta ID ${answer.questionId}:\n`;
        txt += `   ${answer.answer}\n\n`;
      });
      
      txt += '='.repeat(80) + '\n\n';
    }

    return new NextResponse(txt, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename=respostas.txt'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
