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
  const [questions] = useState<Question[]>([
    // LGPD
    { id: 1, section: 'LGPD', text: 'Consentimento para uso dos seus dados na mentoria (obrigatório)' },
    { id: 2, section: 'LGPD', text: 'Canal preferido para comunicações essenciais da mentoria' },
    
    // Identificação
    { id: 3, section: 'Identificação', text: 'Nome completo' },
    { id: 4, section: 'Identificação', text: 'E-mail' },
    { id: 5, section: 'Identificação', text: 'WhatsApp' },
    
    // S - Subjetivo
    { id: 6, section: 'S - Subjetivo', text: 'Especialidade principal' },
    { id: 7, section: 'S - Subjetivo', text: 'Especialidade secundária' },
    { id: 8, section: 'S - Subjetivo', text: 'Tipo de atendimento' },
    { id: 9, section: 'S - Subjetivo', text: 'Quantos atendimentos por dia?' },
    { id: 10, section: 'S - Subjetivo', text: 'Quantos atendimentos por semana?' },
    { id: 11, section: 'S - Subjetivo', text: 'Quantos atendimentos por mês?' },
    { id: 12, section: 'S - Subjetivo', text: 'Tempo médio de consulta' },
    { id: 13, section: 'S - Subjetivo', text: 'Tempo médio de retorno' },
    { id: 14, section: 'S - Subjetivo', text: 'Quantas pessoas na equipe?' },
    { id: 15, section: 'S - Subjetivo', text: 'Quem são essas pessoas?' },
    { id: 16, section: 'S - Subjetivo', text: 'Maior dificuldade com a equipe' },
    { id: 17, section: 'S - Subjetivo', text: 'Maior dificuldade com pacientes' },
    { id: 18, section: 'S - Subjetivo', text: 'Maior dificuldade com gestão' },
    
    // O - Objetivo
    { id: 19, section: 'O - Objetivo', text: 'Faturamento mensal atual' },
    { id: 20, section: 'O - Objetivo', text: 'Faturamento mensal desejado' },
    { id: 21, section: 'O - Objetivo', text: 'Prazo para atingir faturamento desejado' },
    { id: 22, section: 'O - Objetivo', text: 'Maior obstáculo para crescer' },
    
    // A - Avaliação
    { id: 23, section: 'A - Avaliação', text: 'Conforto com tecnologia (0-10)' },
    { id: 24, section: 'A - Avaliação', text: 'Maturidade em IA (0-10)' },
    { id: 25, section: 'A - Avaliação', text: 'LGPD/Risco (0-10)' },
    { id: 26, section: 'A - Avaliação', text: 'Já usa IA paga?' },
    { id: 27, section: 'A - Avaliação', text: 'Principais IAs que usa' },
    { id: 28, section: 'A - Avaliação', text: 'Maior preocupação com IA' },
    { id: 29, section: 'A - Avaliação', text: 'Maior expectativa com IA' },
    
    // P - Plano
    { id: 30, section: 'P - Plano', text: 'Frequência de lembretes' },
    { id: 31, section: 'P - Plano', text: 'Melhor horário para lembretes' },
    { id: 32, section: 'P - Plano', text: 'Formato preferido de conteúdo' },
    { id: 33, section: 'P - Plano', text: 'Gatilho da mentoria' },
    { id: 34, section: 'P - Plano', text: 'Primeira missão (7 dias)' },
    
    // IA
    { id: 35, section: 'IA', text: 'Trilha recomendada' },
    { id: 36, section: 'IA', text: 'Flags de alerta' },
    { id: 37, section: 'IA', text: 'Observações adicionais' },
    
    // Trilha de IA
    { id: 38, section: 'Trilha de IA', text: 'Frase que repete para equipe/pacientes' },
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

    try {
      const response = await fetch(`/api/admin/students/${studentId}/answers`);
      const data = await response.json();
      
      setStudents(prev => prev.map(s => 
        s.id === studentId ? { ...s, answers: data.answers } : s
      ));
      setExpandedStudent(studentId);
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action mx-auto mb-4"></div>
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
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
              <div key={student.id} className="bg-surface rounded-lg p-6">
                {/* Cabeçalho do Mentorado */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{student.name}</h2>
                    <p className="text-text-secondary text-sm">{student.email} • {student.whatsapp}</p>
                    <p className="text-text-secondary text-sm">Cadastrado em: {formatDate(student.createdAt)}</p>
                    <p className="text-sm">
                      <span className={student.completed ? 'text-success' : 'text-warning'}>
                        {student.completed ? '✓ Completo' : `Em andamento (${student.progress}/44)`}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => loadStudentAnswers(student.id)}
                    className="px-4 py-2 bg-action text-white rounded-lg hover:bg-action/90 transition-colors"
                  >
                    {expandedStudent === student.id ? 'Ocultar Respostas' : 'Ver Respostas'}
                  </button>
                </div>

                {/* Respostas Expandidas */}
                {expandedStudent === student.id && student.answers && (
                  <div className="mt-6 pt-6 border-t border-border space-y-6">
                    {['LGPD', 'Identificação', 'S - Subjetivo', 'O - Objetivo', 'A - Avaliação', 'P - Plano', 'IA', 'Trilha de IA'].map(section => {
                      const sectionQuestions = questions.filter(q => q.section === section);
                      
                      return (
                        <div key={section}>
                          <h3 className="text-lg font-bold mb-3 text-action">{section}</h3>
                          <div className="space-y-3">
                            {sectionQuestions.map(question => (
                              <div key={question.id} className="text-sm">
                                <p className="font-semibold mb-1">{question.text}</p>
                                <p className="text-text-secondary pl-4">
                                  {getAnswer(student, question.id)}
                                </p>
                              </div>
                            ))}
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
