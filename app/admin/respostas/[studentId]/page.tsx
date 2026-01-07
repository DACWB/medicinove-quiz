'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

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

export default function RespostasPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;
  
  const [data, setData] = useState<AnswersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    try {
      const response = await fetch(`/api/admin/answers/${studentId}`);
      
      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      const answersData = await response.json();
      setData(answersData);
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
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
          <p className="text-text-secondary">Carregando respostas...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Erro ao carregar respostas</p>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-6 py-3 bg-action text-white rounded-lg hover:bg-action-hover transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Image
              src="/images/logo.png"
              alt="MediciNove"
              width={200}
              height={67}
              className="h-16 w-auto"
            />
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-bg-card border border-border text-text-primary rounded-lg hover:border-action transition-colors"
            >
              ← Voltar ao Dashboard
            </button>
          </div>

          {/* Informações do Aluno */}
          <div className="bg-bg-card p-6 rounded-xl border border-border">
            <h1 className="text-3xl font-bold mb-4 text-text-primary">{data.student.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-text-muted mb-1">Email</p>
                <p className="text-text-primary font-medium">{data.student.email}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1">WhatsApp</p>
                <p className="text-text-primary font-medium">{data.student.whatsapp}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1">Data de Cadastro</p>
                <p className="text-text-primary font-medium">{formatDate(data.student.createdAt)}</p>
              </div>
            </div>
            <div className="mt-4">
              {data.student.completed ? (
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                  ✓ Questionário Completo
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                  ⏳ Em Andamento
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Respostas por Seção */}
        <div className="space-y-8">
          {data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-bg-card p-6 rounded-xl border border-border">
              {/* Cabeçalho da Seção */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-action border-b-2 border-action pb-3">
                  {section.section}
                </h2>
              </div>

              {/* Perguntas e Respostas */}
              <div className="space-y-6">
                {section.questions.map((q, qIndex) => (
                  <div key={qIndex} className="bg-bg-main p-5 rounded-lg border border-border">
                    {/* Pergunta */}
                    <div className="mb-3">
                      <p className="font-semibold text-text-primary text-lg">
                        {q.question}
                        {q.required && <span className="text-error ml-1">*</span>}
                      </p>
                    </div>

                    {/* Resposta */}
                    <div className="pl-4 border-l-4 border-action/30 py-2">
                      {formatAnswer(q.answer, q.type)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-8 py-3 bg-action text-white rounded-lg hover:bg-action-hover transition-colors font-medium"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
