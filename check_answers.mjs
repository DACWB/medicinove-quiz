import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany({
    include: {
      answers: {
        orderBy: { questionId: 'asc' },
        take: 5
      }
    }
  });
  
  console.log('Total de estudantes:', students.length);
  
  if (students.length > 0) {
    const student = students[0];
    console.log('\nPrimeiro estudante:', student.name);
    console.log('Total de respostas:', student.answers.length);
    
    if (student.answers.length > 0) {
      console.log('\nPrimeiras 5 respostas:');
      student.answers.forEach(a => {
        console.log(`\nPergunta ${a.questionId}:`);
        console.log('Resposta:', a.answer);
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
