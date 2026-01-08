'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Student {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  progress: number;
  completed: boolean;
  createdAt: string;
  answersCount: number;
  answers?: Array<{
    questionId: number;
    answer: string;
  }>;
}

interface Question {
  id: number;
  text: string;
  section: string;
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  
  const [questions] = useState<Question[]>([
    // LGPD
    { id: 1, section: 'Termo de Privacidade e LGPD', text: 'Consentimento para uso dos seus dados na mentoria (obrigatório)' },
    { id: 2, section: 'Termo de Privacidade e LGPD', text: 'Canal preferido para comunicações essenciais da mentoria' },
    { id: 3, section: 'Termo de Privacidade e LGPD', text: 'Conteúdos e avisos extras da Medicinove (opcional)' },
    { id: 4, section: 'Termo de Privacidade e LGPD', text: 'Uso anonimizado para melhoria da mentoria (opcional)' },
    
    // Identificação
    { id: 5, section: 'Identificação', text: 'Cidade/Estado' },
    { id: 6, section: 'Identificação', text: 'Especialidade principal' },
    { id: 6.5, section: 'Identificação', text: 'Qual especialidade? (se Outra)' },
    { id: 7, section: 'Identificação', text: 'Seu cenário hoje' },
    
    // S - Subjetivo
    { id: 8, section: 'S — Subjetivo', text: 'Quando você pensa em IA na medicina, qual frase mais te representa hoje?' },
    { id: 9, section: 'S — Subjetivo', text: 'O que te fez entrar na mentoria agora?' },
    { id: 10, section: 'S — Subjetivo', text: 'Seu nível de conforto com computador/tecnologia no dia a dia' },
    { id: 11, section: 'S — Subjetivo', text: 'Quando surge ferramenta nova, você tende a…' },
    { id: 12, section: 'S — Subjetivo', text: 'Qual dessas situações mais acontece com você?' },
    { id: 13, section: 'S — Subjetivo', text: 'O que mais te trava em tecnologia? (escolha até 2)' },
    { id: 14, section: 'S — Subjetivo', text: 'Como você aprende melhor? (escolha até 2)' },
    { id: 15, section: 'S — Subjetivo', text: 'Perfil de execução: qual combina mais com você?' },
    { id: 16, section: 'S — Subjetivo', text: 'Suas 3 maiores dores HOJE (escolha até 3)' },
    { id: 17, section: 'S — Subjetivo', text: 'De 0 a 10, quão confiante você se sente usando IA HOJE?' },
    { id: 18, section: 'S — Subjetivo', text: 'Daqui 1 ano, o que te deixaria satisfeito em estar fazendo com IA após a mentoria?' },
    
    // O - Objetivo
    { id: 19, section: 'O — Objetivo', text: 'Em média, quantos pacientes você atende por dia?' },
    { id: 20, section: 'O — Objetivo', text: 'Quais tarefas mais consomem seu tempo? (escolha até 5)' },
    { id: 21, section: 'O — Objetivo', text: 'Qual prontuário/sistema você usa no dia a dia?' },
    { id: 22, section: 'O — Objetivo', text: 'Seu equipamento principal de trabalho' },
    { id: 23, section: 'O — Objetivo', text: 'Seu celular principal' },
    { id: 24, section: 'O — Objetivo', text: 'Você tem equipe/secretária hoje?' },
    { id: 25, section: 'O — Objetivo', text: 'Quais IAs você já usa hoje?' },
    { id: 26, section: 'O — Objetivo', text: 'Você paga alguma IA hoje?' },
    { id: 26.1, section: 'O — Objetivo', text: 'Qual IA você paga? (se sim)' },
    { id: 26.2, section: 'O — Objetivo', text: 'Por que você paga essa IA? (se sim)' },
    { id: 27, section: 'O — Objetivo', text: 'Você já tem biblioteca de templates (laudos/orientações/mensagens)?' },
    
    // A - Análise
    { id: 28, section: 'A — Análise', text: 'Seu nível prático com prompts hoje' },
    { id: 29, section: 'A — Análise', text: 'Você tem um fluxo de uso de IA no consultório?' },
    { id: 30, section: 'A — Análise', text: 'Qual prioridade ganha nos próximos 30 dias?' },
    { id: 31, section: 'A — Análise', text: 'Quanto tempo real por semana você consegue dedicar?' },
    { id: 32, section: 'A — Análise', text: 'LGPD e segurança: o que você topa fazer na prática?' },
    { id: 33, section: 'A — Análise', text: 'Apetite a risco com tecnologia no consultório' },
    
    // P - Plano
    { id: 34, section: 'P — Plano', text: 'Escolha 2 resultados concretos para atingir em 30 dias (escolha 2)' },
    { id: 35, section: 'P — Plano', text: 'Quais áreas da jornada você quer atacar primeiro? (escolha até 3)' },
    { id: 36, section: 'P — Plano', text: 'Formato de cobrança que mais funciona pra você' },
    { id: 37, section: 'P — Plano', text: 'Como você quer ser lembrado?' },
    
    // IA - Implementação
    { id: 38, section: 'IA — Implementação', text: 'Cenário: você precisa explicar doença/procedimento ao paciente de forma simples e humana. Qual prompt é melhor?' },
    { id: 39, section: 'IA — Implementação', text: 'Quando a IA te dá uma resposta muito confiante, o que você faz?' },
    { id: 40, section: 'IA — Implementação', text: 'Escreva 1 tarefa real que você faria amanhã se estivesse "expert" em IA' },
    
    // Fechamento
    { id: 41, section: 'Fechamento', text: 'O que faria você considerar a mentoria um fracasso?' },
    { id: 42, section: 'Fechamento', text: 'O que faria você considerar a mentoria um sucesso?' },
    
    // Trilha de IA
    { id: 43, section: 'Trilha de IA', text: 'Pense um pouco e lembre de algo que você fala ou repete repetidas vezes para a equipe ou para os pacientes? Escreva abaixo:' },
    { id: 44, section: 'Trilha de IA', text: 'Topa participar de um antes/depois (anonimizado) para medir resultado?' },
  ]);
  
  const router = useRouter();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/admin/students');
      
      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error('Erro ao carregar estudantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentAnswers = async (studentId: string) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
      return;
    }

    setLoadingAnswers(true);
    try {
      const response = await fetch(`/api/admin/students/${studentId}/answers`);
      const data = await response.json();
      
      setStudents(prev => prev.map(s => 
        s.id === studentId ? { ...s, answers: data.answers } : s
      ));
      setExpandedStudent(studentId);
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
      alert('Erro ao carregar respostas. Tente novamente.');
    } finally {
      setLoadingAnswers(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAnswer = (student: Student, questionId: number) => {
    const answer = student.answers?.find(a => a.questionId === questionId);
    return answer?.answer || '(não respondido)';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action mx-auto mb-4"></div>
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Image
              src="/images/logo.png"
              alt="MediciNove"
              width={200}
              height={67}
              className="h-16 w-auto"
            />
            <button
              onClick={() => {
                document.cookie = 'admin_session=; Max-Age=0';
                router.push('/admin');
              }}
              className="text-text-secondary hover:text-error transition-colors"
            >
              Sair
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-text-secondary">
            {students.length} mentorado{students.length !== 1 ? 's' : ''} cadastrado{students.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Lista de Mentorados */}
        <div className="space-y-4">
          {students.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-lg">
              <p className="text-text-secondary">Nenhum mentorado cadastrado ainda.</p>
            </div>
          ) : (
            students.map(student => (
              <div key={student.id} className="bg-surface rounded-lg p-6 shadow-sm">
                {/* Cabeçalho do Mentorado */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-text">{student.name}</h2>
                    <p className="text-text-secondary text-sm">{student.email} • {student.whatsapp}</p>
                    <p className="text-text-secondary text-sm">Cadastrado em: {formatDate(student.createdAt)}</p>
                    <p className="text-sm mt-1">
                      <span className={student.completed ? 'text-success font-medium' : 'text-warning font-medium'}>
                        {student.completed ? '✓ Completo' : `Em andamento (${student.progress}/44)`}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => loadStudentAnswers(student.id)}
                    disabled={loadingAnswers}
                    className="px-6 py-3 bg-action text-white rounded-lg hover:bg-action/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loadingAnswers && expandedStudent !== student.id ? (
                      'Carregando...'
                    ) : expandedStudent === student.id ? (
                      'Ocultar Respostas'
                    ) : (
                      'Ver Respostas'
                    )}
                  </button>
                </div>

                {/* Respostas Expandidas */}
                {expandedStudent === student.id && student.answers && (
                  <div className="mt-6 pt-6 border-t border-border space-y-6">
                    {['Termo de Privacidade e LGPD', 'Identificação', 'S — Subjetivo', 'O — Objetivo', 'A — Análise', 'P — Plano', 'IA — Implementação', 'Fechamento', 'Trilha de IA'].map(section => {
                      const sectionQuestions = questions.filter(q => q.section === section);
                      
                      return (
                        <div key={section} className="bg-background/50 rounded-lg p-4">
                          <h3 className="text-lg font-bold mb-4 text-action">{section}</h3>
                          <div className="space-y-4">
                            {sectionQuestions.map(question => {
                              const answer = getAnswer(student, question.id);
                              if (answer === '(não respondido)') return null;
                              
                              return (
                                <div key={question.id} className="text-sm">
                                  <p className="font-semibold text-text mb-1">{question.text}</p>
                                  <p className="text-text-secondary pl-4 whitespace-pre-wrap">
                                    {answer}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
