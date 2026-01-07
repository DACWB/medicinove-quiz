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
  hasResult: boolean;
  result: any;
}

interface AnswersData {
  student: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    createdAt: string;
    completed: boolean;
  };
  sections: {
    section: string;
    questions: {
      id: number;
      question: string;
      type: string;
      answer: any;
      required: boolean;
    }[];
  }[];
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswersData | null>(null);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
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

  const loadAnswers = async (studentId: string) => {
    setLoadingAnswers(true);
    try {
      const response = await fetch(`/api/admin/answers/${studentId}`);
      const data = await response.json();
      setSelectedAnswers(data);
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleViewAnswers = async (student: Student) => {
    setSelectedStudent(student);
    await loadAnswers(student.id);
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

  const formatAnswer = (answer: any, type: string) => {
    if (answer === undefined || answer === null || answer === '') {
      return <span className="text-text-muted italic">(Não respondido)</span>;
    }

    if (Array.isArray(answer)) {
      if (answer.length === 0) {
        return <span className="text-text-muted italic">(Não respondido)</span>;
      }
      return (
        <ul className="list-disc list-inside space-y-1">
          {answer.map((item, index) => (
            <li key={index} className="text-text-primary">{item}</li>
          ))}
        </ul>
      );
    }

    if (typeof answer === 'number' && type === 'slider') {
      return <span className="text-text-primary font-semibold text-xl">{answer}/10</span>;
    }

    return <p className="text-text-primary whitespace-pre-wrap">{answer}</p>;
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-bg-card p-6 rounded-xl border border-border">
            <p className="text-text-muted text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-action">{students.length}</p>
          </div>
          <div className="bg-bg-card p-6 rounded-xl border border-border">
            <p className="text-text-muted text-sm mb-1">Completos</p>
            <p className="text-3xl font-bold text-green-500">
              {students.filter(s => s.completed).length}
            </p>
          </div>
          <div className="bg-bg-card p-6 rounded-xl border border-border">
            <p className="text-text-muted text-sm mb-1">Em Andamento</p>
            <p className="text-3xl font-bold text-yellow-500">
              {students.filter(s => !s.completed && s.answersCount > 0).length}
            </p>
          </div>
          <div className="bg-bg-card p-6 rounded-xl border border-border">
            <p className="text-text-muted text-sm mb-1">Não Iniciados</p>
            <p className="text-3xl font-bold text-text-muted">
              {students.filter(s => s.answersCount === 0).length}
            </p>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-main border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    WhatsApp
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Progresso
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Data
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-bg-main transition-colors">
                    <td className="px-6 py-4 text-sm text-text-primary">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {student.whatsapp}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-border rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-action h-2 rounded-full"
                            style={{ width: `${(student.answersCount / 44) * 100}%` }}
                          />
                        </div>
                        <span className="text-text-muted text-xs">
                          {student.answersCount}/44
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {student.completed ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">
                          Completo
                        </span>
                      ) : student.answersCount > 0 ? (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                          Em andamento
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs">
                          Não iniciado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {formatDate(student.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {student.answersCount > 0 && (
                        <button
                          onClick={() => handleViewAnswers(student)}
                          className="text-action hover:text-action-hover transition-colors font-medium"
                        >
                          Ver Respostas
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Respostas Completas */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-bg-card rounded-2xl border border-border max-w-5xl w-full my-8">
              {/* Header do Modal */}
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-bg-card z-10">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{selectedStudent.name}</h2>
                  <p className="text-sm text-text-muted mt-1">
                    {selectedStudent.email} • {selectedStudent.whatsapp}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setSelectedAnswers(null);
                  }}
                  className="text-text-muted hover:text-error transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {/* Conteúdo do Modal */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {loadingAnswers ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action mx-auto mb-4"></div>
                    <p className="text-text-secondary">Carregando respostas...</p>
                  </div>
                ) : selectedAnswers ? (
                  <div className="space-y-8">
                    {selectedAnswers.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        {/* Cabeçalho da Seção */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-action border-b-2 border-action pb-2">
                            {section.section}
                          </h3>
                        </div>

                        {/* Perguntas e Respostas */}
                        <div className="space-y-6">
                          {section.questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-bg-main p-5 rounded-lg border border-border">
                              {/* Pergunta */}
                              <div className="mb-3">
                                <p className="font-semibold text-text-primary">
                                  {q.question}
                                  {q.required && <span className="text-error ml-1">*</span>}
                                </p>
                              </div>

                              {/* Resposta */}
                              <div className="pl-4 border-l-4 border-action/30">
                                {formatAnswer(q.answer, q.type)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-text-muted">Erro ao carregar respostas</p>
                  </div>
                )}
              </div>

              {/* Footer do Modal */}
              <div className="p-6 border-t border-border flex justify-end">
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setSelectedAnswers(null);
                  }}
                  className="px-6 py-3 bg-bg-main border border-border text-text-primary rounded-lg hover:border-action transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
