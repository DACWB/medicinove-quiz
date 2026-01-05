import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp, token } = await request.json();

    // Validar token
    if (token !== 'embarque10') {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Verificar se já existe estudante com este email
    let student = await prisma.student.findUnique({
      where: { email }
    });

    if (student) {
      // Atualizar dados
      student = await prisma.student.update({
        where: { email },
        data: { name, whatsapp, token }
      });
    } else {
      // Criar novo
      student = await prisma.student.create({
        data: {
          name,
          email,
          whatsapp,
          token
        }
      });
    }

    return NextResponse.json({ student });
  } catch (error: any) {
    console.error('Erro ao salvar estudante:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar dados' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email não fornecido' },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        answers: true,
        result: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Estudante não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ student });
  } catch (error: any) {
    console.error('Erro ao buscar estudante:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}
