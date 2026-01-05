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

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                      <div className="flex items-center space-x-3">
                        {student.hasResult && (
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="text-action hover:text-action-hover transition-colors"
                          >
                            Ver Resultado
                          </button>
                        )}
                        {student.answersCount > 0 && (
                          <a
                            href={`/api/admin/report/${student.id}`}
                            download
                            className="text-green-500 hover:text-green-400 transition-colors flex items-center space-x-1"
                            title="Baixar relatório completo"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>TXT</span>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Resultado */}
        {selectedStudent && selectedStudent.result && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-bg-card rounded-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-bg-card">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-text-muted hover:text-error transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Perfil */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-action">Perfil</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-bg-main p-4 rounded-lg border border-border">
                      <p className="text-sm text-text-muted mb-1">Principal</p>
                      <p className="text-xl font-bold">{selectedStudent.result.mainProfile}</p>
                    </div>
                    {selectedStudent.result.secondProfile && (
                      <div className="bg-bg-main p-4 rounded-lg border border-border">
                        <p className="text-sm text-text-muted mb-1">Secundário</p>
                        <p className="text-xl font-bold">{selectedStudent.result.secondProfile}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scores */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-action">Scores</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-bg-main p-4 rounded-lg border border-border">
                      <p className="text-sm text-text-muted mb-1">Conforto Tech</p>
                      <p className="text-2xl font-bold">{selectedStudent.result.confortoTech}/10</p>
                    </div>
                    <div className="bg-bg-main p-4 rounded-lg border border-border">
                      <p className="text-sm text-text-muted mb-1">Maturidade IA</p>
                      <p className="text-2xl font-bold">{selectedStudent.result.maturidadeIA}/10</p>
                    </div>
                    <div className="bg-bg-main p-4 rounded-lg border border-border">
                      <p className="text-sm text-text-muted mb-1">LGPD/Risco</p>
                      <p className="text-2xl font-bold">{selectedStudent.result.lgpdRisco}/10</p>
                    </div>
                  </div>
                </div>

                {/* Trilha */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-action">Trilha Recomendada</h3>
                  <div className="bg-bg-main p-4 rounded-lg border border-border">
                    <p className="text-xl font-bold">{selectedStudent.result.trilhaName}</p>
                  </div>
                </div>

                {/* Flags */}
                {selectedStudent.result.flags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-action">Flags de Alerta</h3>
                    <div className="bg-bg-main p-4 rounded-lg border border-border space-y-2">
                      {selectedStudent.result.flags.map((flag: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-error">⚠</span>
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primeira Missão */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-action">Primeira Missão (7 dias)</h3>
                  <div className="bg-bg-main p-4 rounded-lg border border-border">
                    <p className="text-text-secondary">{selectedStudent.result.primeiraMissao}</p>
                  </div>
                </div>

                {/* Resultado Completo */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-action">Resultado Completo</h3>
                  <div className="bg-bg-main p-4 rounded-lg border border-border">
                    <pre className="text-sm text-text-secondary whitespace-pre-wrap font-mono">
                      {selectedStudent.result.resultadoCompleto}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
